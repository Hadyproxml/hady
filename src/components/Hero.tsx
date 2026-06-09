/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CalendarPlus, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-32 px-8 text-right overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        <div className="w-full text-center space-y-8">
          <div className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-xs md:text-sm font-bold tracking-widest border border-blue-100 uppercase">
            عيادة الدكتور محمد عفاره التخصصية
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.1]">
            <span className="text-slate-400 block text-2xl md:text-3xl font-light mb-4 text-right md:text-center">الدكتور</span>
            <span className="text-gradient">محمد عفاره</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            نقدم رعاية طبية متخصصة ومبنية على أحدث الأسس العلمية في أمراض الكلى والباطنة العامة، لضمان سلامتكم وراحتكم التامة.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/201031711145"
              className="px-12 py-6 rounded-3xl bg-blue-600 text-white font-extrabold flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 transition-all text-lg"
            >
              <CalendarPlus size={24} />
              حجز موعد الآن
            </motion.a>
            
            <a
              href="tel:035868772"
              className="px-12 py-6 rounded-3xl bg-white border border-slate-200 text-slate-700 font-extrabold flex items-center justify-center gap-3 shadow-sm hover:border-blue-200 transition-all font-mono text-lg"
            >
              03-5868772
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
