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
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Supabase", icon: SiSupabase },
  { name: "Prisma", icon: SiPrisma },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "OWASP ZAP", icon: ShieldCheck },
  { name: "GitHub", icon: SiGithub },
];

const TechCard = ({ item, index }: { item: typeof techItems[0]; index: number }) => {
  const Icon = item.icon;

  return (
    <div 
      className="wave-animation inline-block mx-4 md:mx-8"
      style={{ animationDelay: `${index * -0.5}s` } as React.CSSProperties}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col items-center justify-center p-4 cursor-pointer"
      >
        <Icon className="w-12 h-12 md:w-16 md:h-16 text-zinc-500 group-hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300" strokeWidth={1.5} />
        <span className="mt-4 font-medium text-xs md:text-sm text-zinc-500 group-hover:text-zinc-200 transition-colors tracking-wide text-center">
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
    <section className="w-full py-32 overflow-hidden relative">
      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 40s linear infinite;
        }
        .wave-animation {
          animation: wave 4s ease-in-out infinite;
        }
        /* Pure CSS Pause for absolute smoothness */
        .tech-stack-container:hover .animate-scroll-horizontal,
        .tech-stack-container:hover .wave-animation {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 mb-16 text-center relative z-10">
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Tech Stack
        </h3>
        <p className="text-zinc-400 text-lg">
          The tools and technologies I use to build premium digital experiences.
        </p>
      </div>

      {/* Horizontal Scroll Container with CSS Mask */}
      <div 
        className="relative w-full overflow-hidden flex items-center h-[200px] tech-stack-container"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div className="animate-scroll-horizontal flex w-max items-center">
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
