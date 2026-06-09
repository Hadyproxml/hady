/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Schedule from "./components/Schedule";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Activity, Dna, Stethoscope, Heart } from "lucide-react";

export default function App() {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-blue-50 selection:text-blue-600 overflow-x-hidden relative">
      {/* Subtle Medical Parallax Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fafbfc]">
        <motion.div style={{ y: y1, rotate }} className="absolute top-[5%] left-[2%] text-blue-500/5">
          <Dna size={400} />
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="absolute top-[30%] right-[3%] text-blue-600/5">
          <Heart size={350} />
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[10%] left-[5%] text-blue-500/5">
          <Activity size={300} />
        </motion.div>

        <motion.div style={{ y: y2, rotate: -rotate }} className="absolute top-[60%] right-[5%] text-blue-600/5">
          <Stethoscope size={250} />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/60 backdrop-blur-[2px] shadow-[0_0_100px_rgba(0,0,0,0.03)] border-x border-slate-100 min-h-screen">
        <AnimatePresence>
          <main className="flex flex-col">
            <Hero />
            <Services />
            <About />
            <Schedule />
            <Contact />
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
