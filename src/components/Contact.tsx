/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPinned, MessageSquare, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-right mb-16 px-4">
          <span className="text-blue-500 text-sm font-bold tracking-widest block mb-4 uppercase">اتصل بنا</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">تواصل مع العيادة</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center gap-8 text-right flex-row-reverse hover:border-blue-100 transition-all">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                <MapPinned size={32} />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-2">مقر العيادة</h3>
                <p className="text-slate-500 text-base leading-relaxed font-light">
                  ٥٠٥ طريق الحريه ـ الوزارة<br />
                  برج بورتو الصفوة ـ أعلى صيدلية بلبع
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-green-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center gap-8 text-right flex-row-reverse border-green-100 hover:bg-green-50/10 transition-all">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 border border-green-100 shrink-0">
                <MessageSquare size={32} />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-800 mb-2">الحجز (واتساب)</h3>
                <p className="text-green-600 font-extrabold tracking-widest text-2xl font-mono">01031711145</p>
              </div>
            </div>

            <a 
              href="https://www.facebook.com/share/1GEvF1WqdY/"
              className="p-8 rounded-[2rem] bg-white border border-blue-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center gap-8 text-right flex-row-reverse border-blue-100 hover:bg-blue-50/10 transition-all active:scale-95"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                <Facebook size={32} />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-800 mb-2">فيسبوك</h3>
                <p className="text-slate-500 text-base font-light">متابعة آخر النصائح الطبية</p>
              </div>
            </a>
          </div>

          <div className="h-[400px] lg:h-auto min-h-[400px] relative rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl order-1 lg:order-2 group">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13645.123456789012!2d29.96!3d31.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEzJzQ4LjAiTiAyOcKwNTcnMzYuMCJF!5e0!3m2!1sen!2seg!4v1623245678901!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              className="transition-all duration-1000"
            ></iframe>
            <div className="absolute inset-0 bg-blue-600/5 pointer-events-none group-hover:bg-transparent transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
