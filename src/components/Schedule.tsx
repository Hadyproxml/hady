/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Clock, ChevronLeft } from "lucide-react";

const schedule = [
  { day: "السبت", time: "3:00 ظ - 6:00 م", id: "SAT" },
  { day: "الاثنين", time: "2:00 ظ - 5:00 م", id: "MON" },
  { day: "الأربعاء", time: "2:00 ظ - 5:00 م", id: "WED" },
  { day: "الخميس", time: "2:00 ظ - 5:00 م", id: "THU" },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-8 bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-right mb-16 px-4">
          <span className="text-blue-500 text-sm font-bold tracking-widest block mb-4 uppercase">المواعيد</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">جدول العمل الأسبوعي</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {schedule.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-100">
                  <Clock size={20} />
                </div>
                <span className="font-bold text-sm md:text-base text-blue-600 bg-blue-50/50 px-4 py-1.5 rounded-full">
                  {item.time}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-800">{item.day}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 px-2">
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/201031711145"
            className="w-full p-8 rounded-[2.5rem] bg-white border border-blue-100 flex items-center justify-between group shadow-sm transition-all hover:bg-blue-50/10"
          >
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-100">
              <ChevronLeft size={28} />
            </div>
            <div className="text-right">
              <span className="text-slate-900 font-extrabold text-xl md:text-2xl block mb-1">احجز دورك الآن</span>
              <span className="text-blue-500 text-sm font-bold opacity-80">ننسق المواعيد لضمان راحتكم التامة</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
