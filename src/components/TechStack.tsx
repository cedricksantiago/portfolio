"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiNodedotjs, 
  SiSupabase, 
  SiPrisma, 
  SiPostgresql,
  SiGithub 
} from "react-icons/si";

const techItems = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Framer Motion", icon: SiFramer, color: "text-[#0055FF]" },
  { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
  { name: "Prisma", icon: SiPrisma, color: "text-[#2D3748]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "OWASP ZAP", icon: ShieldCheck, color: "text-[#E31E24]" },
  { name: "GitHub", icon: SiGithub, color: "text-white" },
];

const TechCard = ({ item, index }: { item: typeof techItems[0]; index: number }) => {
  const Icon = item.icon;

  return (
    <div 
      className="wave-animation inline-block mx-6 md:mx-10 relative z-10 hover:z-50"
      style={{ animationDelay: `${index * -0.5}s` } as React.CSSProperties}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative flex flex-col items-center justify-center p-6 cursor-pointer border border-transparent hover:border-zinc-700 hover:bg-white/5 transition-all duration-500"
      >
        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${item.color} opacity-60 group-hover:opacity-100 transition-all duration-300`} />
        <span className="mt-6 font-mono text-[10px] uppercase text-zinc-400 group-hover:text-white transition-colors tracking-[0.2em] text-center">
          {item.name}
        </span>
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  // Duplicate the array to create a seamless infinite scroll
  const repeatedItems = [...techItems, ...techItems, ...techItems, ...techItems];

  return (
    <section className="w-full py-40 overflow-hidden relative">
      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 60s linear infinite;
        }
        .wave-animation {
          animation: wave 5s ease-in-out infinite;
        }
        .animate-scroll-horizontal:hover,
        .animate-scroll-horizontal:hover .wave-animation {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-zinc-900 pb-16">
          <div>
            <div className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Module.02 // Technologies</div>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
              Tech Stack
            </h3>
          </div>
          <p className="text-zinc-500 text-xl max-w-sm leading-snug font-light">
            The specialized tools and frameworks powering my digital engineering pipeline.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container with CSS Mask */}
      <div 
        className="relative w-full overflow-visible flex items-center h-[220px]"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div className="animate-scroll-horizontal flex w-max items-center py-10">
          <div className="flex w-max">
             {repeatedItems.map((item, idx) => (
                <div key={idx} className="inline-block">
                  <TechCard item={item} index={idx} />
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
