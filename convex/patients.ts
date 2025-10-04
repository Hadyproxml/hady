import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    // Filter for waiting patients (including those without status field - legacy data)
    const waitingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
    
    // Sort by queue position
    const sortedPatients = waitingPatients.sort((a, b) => a.queuePosition - b.queuePosition);
    
    return sortedPatients.map((patient, index) => ({
      ...patient,
      actualPosition: index + 1,
      patientsAhead: index,
    }));
  },
});

export const listCompleted = query({
  args: {},
  handler: async (ctx) => {
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    // Filter for completed patients
    const completedPatients = allPatients.filter(p => p.status === "completed");
    
    // Sort by completion time (most recent first)
    return completedPatients.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    examination: v.string(),
  },
  handler: async (ctx, args) => {
    // Get all patients and filter for waiting ones
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    const waitingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
    
    const maxPosition = waitingPatients.length > 0 
      ? Math.max(...waitingPatients.map(p => p.queuePosition))
      : 0;
    
    await ctx.db.insert("patients", {
      name: args.name,
      examination: args.examination,
      queuePosition: maxPosition + 1,
      createdAt: Date.now(),
      status: "waiting",
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("patients"),
    name: v.string(),
    examination: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      examination: args.examination,
    });
  },
});

export const markCompleted = mutation({
  args: {
    id: v.id("patients"),
  },
  handler: async (ctx, args) => {
    const patient = await ctx.db.get(args.id);
    if (!patient || patient.status === "completed") return;
    
    await ctx.db.patch(args.id, {
      status: "completed",
      completedAt: Date.now(),
    });
    
    // Reorder remaining waiting patients
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    const remainingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
    const sortedPatients = remainingPatients.sort((a, b) => a.queuePosition - b.queuePosition);
    
    for (let i = 0; i < sortedPatients.length; i++) {
      await ctx.db.patch(sortedPatients[i]._id, {
        queuePosition: i + 1,
      });
    }
    
    return patient;
  },
});

export const restorePatient = mutation({
  args: {
    id: v.id("patients"),
  },
  handler: async (ctx, args) => {
    const patient = await ctx.db.get(args.id);
    if (!patient || patient.status !== "completed") return;
    
    // Get all waiting patients to determine the new position
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    const waitingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
    
    const maxPosition = waitingPatients.length > 0 
      ? Math.max(...waitingPatients.map(p => p.queuePosition))
      : 0;
    
    // Restore patient to waiting status and add to end of queue
    await ctx.db.patch(args.id, {
      status: "waiting",
      queuePosition: maxPosition + 1,
      completedAt: undefined,
    });
    
    return patient;
  },
});

export const remove = mutation({
  args: {
    id: v.id("patients"),
  },
  handler: async (ctx, args) => {
    const patient = await ctx.db.get(args.id);
    if (!patient) return;
    
    await ctx.db.delete(args.id);
    
    // Only reorder if it was a waiting patient
    if (!patient.status || patient.status === "waiting") {
      const allPatients = await ctx.db
        .query("patients")
        .collect();
      
      const remainingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
      const sortedPatients = remainingPatients.sort((a, b) => a.queuePosition - b.queuePosition);
      
      for (let i = 0; i < sortedPatients.length; i++) {
        await ctx.db.patch(sortedPatients[i]._id, {
          queuePosition: i + 1,
        });
      }
    }
  },
});

export const reorder = mutation({
  args: {
    patientId: v.id("patients"),
    newPosition: v.number(),
  },
  handler: async (ctx, args) => {
    const patient = await ctx.db.get(args.patientId);
    if (!patient || (patient.status && patient.status !== "waiting")) return;
    
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    const allWaitingPatients = allPatients.filter(p => !p.status || p.status === "waiting");
    const sortedPatients = allWaitingPatients.sort((a, b) => a.queuePosition - b.queuePosition);
    
    const oldPosition = patient.queuePosition;
    const newPosition = Math.max(1, Math.min(args.newPosition, sortedPatients.length));
    
    if (oldPosition === newPosition) return;
    
    // Update positions
    for (const p of sortedPatients) {
      if (p._id === args.patientId) {
        await ctx.db.patch(p._id, { queuePosition: newPosition });
      } else if (oldPosition < newPosition && p.queuePosition > oldPosition && p.queuePosition <= newPosition) {
        await ctx.db.patch(p._id, { queuePosition: p.queuePosition - 1 });
      } else if (oldPosition > newPosition && p.queuePosition >= newPosition && p.queuePosition < oldPosition) {
        await ctx.db.patch(p._id, { queuePosition: p.queuePosition + 1 });
      }
    }
  },
});

export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const patients = await ctx.db.query("patients").collect();
    for (const patient of patients) {
      await ctx.db.delete(patient._id);
    }
  },
});

export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const allPatients = await ctx.db
      .query("patients")
      .collect();
    
    const completedPatients = allPatients.filter(p => p.status === "completed");
    
    for (const patient of completedPatients) {
      await ctx.db.delete(patient._id);
    }
  },
});
