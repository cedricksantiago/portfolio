"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, RotateCw, Lock, Layout } from "lucide-react";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiNodedotjs, 
  SiSupabase, 
  SiPrisma, 
  SiGithub, 
  SiGit, 
  SiVercel
} from "react-icons/si";

const leftColumn = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Supabase", icon: SiSupabase },
  { name: "OWASP ZAP", icon: ShieldCheck },
];

const rightColumn = [
  { name: "Prisma", icon: SiPrisma },
  { name: "SWR", icon: RotateCw },
  { name: "Zero Threat", icon: Lock },
  { name: "Secret Scanning", icon: SiGithub },
  { name: "Git", icon: SiGit },
  { name: "Vercel", icon: SiVercel },
  { name: "Microsoft 365", icon: Layout },
];

const TechCard = ({ name, icon: Icon }: { name: string; icon: any }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        scale: 1.1,
        // Ultra Violet Glow
        filter: "drop-shadow(0 0 20px rgba(138, 43, 226, 0.8))"
      }}
      className="flex flex-col items-center justify-center gap-3 py-6 transition-colors duration-300 min-w-[160px] text-zinc-500 hover:text-white cursor-pointer group"
    >
      <Icon className="w-14 h-14 opacity-70 group-hover:opacity-100 group-hover:text-violet-500 transition-all duration-300" strokeWidth={1.5} />
      <span className="font-medium text-sm tracking-wide text-center">{name}</span>
    </motion.div>
  );
};

export default function TechStack() {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  return (
    <section className="w-full py-24 px-6 relative">
      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .scrolling-down {
          animation: scroll-down 25s linear infinite;
        }
        .scrolling-up {
          animation: scroll-up 25s linear infinite;
        }
      `}</style>

      {/* Adding a subtle ultra violet glowing orb behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto overflow-hidden bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(138,43,226,0.1)] hover:border-violet-500/30">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-500 tracking-tight leading-tight">
              Tech Stack
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              A curated selection of modern technologies and tools I use to build robust, scalable, and secure applications.
            </p>
          </div>

          <div className="relative h-[500px] flex gap-4 sm:gap-12 justify-center overflow-hidden">
            
            {/* Left Column - Downward */}
            <div 
              className="flex flex-col w-1/2 items-center relative z-20"
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
            >
              <div 
                className="flex flex-col gap-4 scrolling-down w-full"
                style={{ animationPlayState: isLeftHovered ? "paused" : "running" }}
              >
                {[...leftColumn, ...leftColumn].map((item, idx) => (
                  <TechCard key={`left-${idx}`} {...item} />
                ))}
              </div>
            </div>

            {/* Right Column - Upward */}
            <div 
              className="flex flex-col w-1/2 items-center relative z-20"
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
            >
              <div 
                className="flex flex-col gap-4 scrolling-up w-full"
                style={{ animationPlayState: isRightHovered ? "paused" : "running" }}
              >
                {[...rightColumn, ...rightColumn].map((item, idx) => (
                  <TechCard key={`right-${idx}`} {...item} />
                ))}
              </div>
            </div>

            {/* Vertical Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent z-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent z-30 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
