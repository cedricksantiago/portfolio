"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import TechStack from "@/components/TechStack";
import ProjectsSection from "@/components/ProjectsSection";
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="bg-noise" />
      <main className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 relative z-10 overflow-hidden">



      {/* Hero Section */}
      <section className="min-h-[75vh] flex flex-col justify-center w-full mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl"
        >
          <h2 className="text-zinc-400 font-medium mb-4 tracking-widest uppercase text-sm">Hello World</h2>
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter mb-6 text-white">
            Cedrick Santiago
          </h1>
          <p className="text-2xl text-white/60 mb-10 leading-relaxed font-light h-8">
            <TypeAnimation
              sequence={[
                'Full Stack Web Developer',
                2000,
                'Data Scientist',
                2000,
                'UI/UX Enthusiast',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <div className="flex gap-6 items-center">
            <Magnetic>
              <button className="interactive px-8 py-4 bg-white text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow flex items-center gap-2">
                View CV
              </button>
            </Magnetic>
            <Magnetic>
              <Link href="https://github.com/Garou0727" target="_blank" className="interactive p-4 bg-white/5 border border-white/10 hover:border-zinc-500/50 hover:bg-zinc-800/50 rounded-full transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <TechStack />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 mb-20 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-16 sm:p-24 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent"></div>
          <h3 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-500 tracking-tight">Let's build something.</h3>
          <p className="text-xl text-zinc-400 max-w-md mb-12">
            Whether it's a sleek web app, data analysis, or a quick chat about tech—I'm always open to new opportunities.
          </p>
          <Magnetic>
            <Link
              href="mailto:cedricksantiago07@gmail.com"
              className="interactive group px-10 py-5 bg-white text-black font-bold text-lg rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Say Hello
            </Link>
          </Magnetic>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full flex justify-between items-center py-8 border-t border-white/10 text-sm text-white/40"
      >
        <p>© {new Date().getFullYear()} Cedrick P. Santiago.</p>
        <p>Built with Next.js & Tailwind</p>
      </motion.footer>

    </main>
    </>
  );
}
