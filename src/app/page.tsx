"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TechStack from "@/components/TechStack";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

const getImagePath = (path: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? `/portfolio${path}` : path;
};

export default function Home() {
  useEffect(() => {
    // Force default cursor
    document.body.style.cursor = 'auto';

    // Scroll to top on page load/reload
    window.scrollTo(0, 0);
    // Prevent browser from trying to restore previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <div className="bg-noise" />
      <main className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 relative z-10">



        {/* Hero Section */}
        <section className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center w-full mb-20 sm:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            {/* Identity Header Card */}
            <div className="relative p-6 sm:p-12 border border-zinc-800 bg-white/[0.02] backdrop-blur-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[100px] pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start justify-between">
                <div className="space-y-8 sm:space-y-12 flex-grow w-full">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-zinc-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.4em]">Status // Online</span>
                    <div className="h-[1px] w-6 sm:w-8 bg-zinc-700 ml-2 sm:ml-4" />
                    <span className="text-zinc-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.4em]">ID: CST.0727</span>
                  </div>

                  <h1 className="text-[clamp(2.5rem,12vw,5.5rem)] font-black tracking-tighter text-white leading-[0.85] uppercase max-w-[10ch] lg:max-w-none text-center lg:text-left mx-auto lg:mx-0">
                    Cedrick<br />
                    Santiago
                  </h1>

                  <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                    <div className="text-lg sm:text-2xl text-zinc-400 leading-tight font-light">
                      <TypeAnimation
                        sequence={['Full Stack Web Developer', 2000, 'Data Scientist', 2000, 'UI/UX Enthusiast', 2000]}
                        wrapper="span" speed={50} repeat={Infinity}
                      />
                    </div>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md font-light mx-auto lg:mx-0">
                      Architecting high-performance digital systems with technical precision and minimalist aesthetics.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 items-center justify-center lg:justify-start">
                    <Link href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:invert transition-all text-center">
                      Get in Touch
                    </Link>
                    <a href={getImagePath("/cv/cv-cedricksantiago.pdf")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all text-center">
                      View CV
                    </a>
                  </div>
                </div>

                <div className="relative shrink-0 mt-8 lg:mt-0 group">
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-zinc-700" />
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-zinc-700" />
                  
                  <div className="relative w-48 h-64 sm:w-64 sm:h-80 overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
                    <Image 
                      src={getImagePath("/main/hero.jpg")}
                      alt="Cedrick Santiago"
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 origin-center hidden xl:block">
                    <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.5em] whitespace-nowrap">
                      Identity_Core.v727
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <div id="tech" className="scroll-mt-24 sm:scroll-mt-32">
          <TechStack />
        </div>

        {/* Projects Section */}
        <div id="projects" className="scroll-mt-24 sm:scroll-mt-32">
          <ProjectsSection />
        </div>

        {/* Contact Section */}
        <div id="contact" className="scroll-mt-24 sm:scroll-mt-32">
          <section className="py-20 sm:py-32 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Contact Info Side */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="h-[1px] w-12 bg-zinc-800" />
                       <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">Module.04 // Contact</span>
                    </div>
                    <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-white uppercase tracking-tighter leading-[0.9]">
                      Get In<br />Touch
                    </h2>
                    <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-md leading-relaxed pt-4">
                      Have a project in mind? Or just want to talk about data and web engineering? Send a transmission.
                    </p>
                  </div>

                  <div className="space-y-10 pt-12 border-t border-zinc-900">
                    <div className="flex flex-col gap-2">
                      <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em]">E-Mail_Address</span>
                      <Link href="mailto:cedricksantiago07@gmail.com" className="text-zinc-300 text-xl hover:text-white transition-colors underline-offset-8 hover:underline decoration-zinc-700">
                        cedricksantiago07@gmail.com
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em]">Geographic_Location</span>
                      <span className="text-zinc-300 text-xl">Manila, Philippines</span>
                    </div>
                  </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="w-full flex flex-col sm:flex-row justify-between items-center py-12 border-t border-zinc-900 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] gap-6 text-center sm:text-left px-6"
        >
          <p>© {new Date().getFullYear()} Cedrick P. Santiago.</p>
          <p>Built with Next.js & Tailwind 4.0</p>
        </motion.footer>
      </main>
    </>
  );
}
