/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Activity, Beaker, ClipboardCheck, Waves, HeartPulse, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "أمراض الكلى المزمنة",
    desc: "تشخيص ومتابعة حالات قصور الكلى وتوفير الحلول العلاجية المناسبة.",
    icon: <ClipboardCheck size={24} />,
  },
  {
    title: "ضغط الدم المرتفع",
    desc: "تنظيم وعلاج ضغط الدم الناتج عن مسببات مختلفة لضمان سلامة الكلى.",
    icon: <Activity size={24} />,
  },
  {
    title: "الباطنة العامة",
    desc: "فحص شامل للأمراض الباطنية المزمنة وتقديم بروتوكولات علاجية حديثة.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "اضطرابات الأملاح",
    desc: "ضبط نسب الأملاح والمعادن في الجسم وتجنب مضاعفات خللها.",
    icon: <Beaker size={24} />,
  },
  {
    title: "فحص ما قبل التدخلات",
    desc: "تقييم كامل وظائف الكلى قبل العمليات الجراحية الكبرى.",
    icon: <HeartPulse size={24} />,
  },
  {
    title: "متابعة غسيل الكلى",
    desc: "الإشراف الطبي الدقيق على جلسات الغسيل الكلوي ومتابعة الحالة الصحية.",
    icon: <Waves size={24} />,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-8 text-right bg-white/40">
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <span className="text-blue-500 text-sm font-bold tracking-widest block mb-4 uppercase">تخصصاتنا</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">الخدمات الطبية النوعية</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 transition-transform group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
