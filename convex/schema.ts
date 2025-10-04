import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  patients: defineTable({
    name: v.string(),
    examination: v.string(),
    queuePosition: v.number(),
    createdAt: v.number(),
    status: v.optional(v.union(v.literal("waiting"), v.literal("completed"))),
    completedAt: v.optional(v.number()),
  })
    .index("by_queue_position", ["queuePosition"])
    .index("by_status", ["status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
