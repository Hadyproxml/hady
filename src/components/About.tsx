import { motion } from "motion/react";
import { GraduationCap, Award, Stethoscope, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 bg-slate-50/30 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Decorative Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-[12px] border-white aspect-[4/5] bg-slate-100">
              <img
                src="/src/assets/images/doctor.png"
                alt="د. محمد عفاره"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Design Accents */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-600/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Structured Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 text-right space-y-10"
          >
            <div>
              <div className="flex items-center justify-end gap-3 mb-4">
                <span className="h-[2px] w-12 bg-blue-600/20" />
                <span className="text-blue-600 text-sm font-bold tracking-widest uppercase">السيرة المهنية</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                د. محمد عفاره
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
                استشاري أمراض الباطنة والكلى، ورئيس قسم الباطنة بمستشفيات أندلسية بالإسكندرية. حاصل على دكتوراه الأمراض الباطنة، ويتمتع بخبرة واسعة في تشخيص ومتابعة وعلاج أمراض الكلى والأمراض الباطنية المختلفة.
              </p>
            </div>

            {/* Qualifications Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "دكتوراه الباطنة العامة",
                  desc: "أعلى الدرجات العلمية في التخصص",
                  icon: <GraduationCap className="text-blue-600" size={24} />
                },
                {
                  title: "رئيس قسم الباطنة",
                  desc: "بمستشفيات أندلسية بالإسكندرية",
                  icon: <Award className="text-blue-600" size={24} />
                },
                {
                  title: "علاج أمراض الكلى",
                  desc: "خبرة في كافة أنواع اعتلال الكلى",
                  icon: <Stethoscope className="text-blue-600" size={24} />
                },
                {
                  title: "الرعاية المتكاملة",
                  desc: "متابعة السكري وضغط الدم بدقة",
                  icon: <CheckCircle2 className="text-blue-600" size={24} />
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 flex-row-reverse">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vision Statement */}
            <div className="p-8 rounded-3xl bg-blue-600/5 border-r-4 border-blue-600">
              <p className="text-slate-700 text-lg font-medium leading-relaxed italic">
                "نهدف إلى تقديم رعاية طبية متكاملة تعتمد على أحدث الأساليب العالمية، لنضمن لرضانا حياة أكثر صحة واستقراراً."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
