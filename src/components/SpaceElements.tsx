"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SpaceElements() {
  const [meteors, setMeteors] = useState<number[]>([]);

  useEffect(() => {
    let timeoutId: any;

    const spawnMeteor = () => {
      if (Math.random() > 0.6) {
        const id = Math.random();
        setMeteors((prev) => [...prev, id]);
        setTimeout(() => {
          setMeteors((prev) => prev.filter(m => m !== id));
        }, 1500);
      }
      
      const nextSpawn = Math.random() * 5000 + 2000;
      timeoutId = setTimeout(spawnMeteor, nextSpawn);
    };

    timeoutId = setTimeout(spawnMeteor, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Floating Astronaut 1 */}
      <motion.div
        animate={{
          x: ["-10vw", "110vw"],
          y: ["20vh", "35vh", "20vh"],
          rotate: [0, 360],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-20 h-20 opacity-20"
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
          <rect x="22" y="20" width="20" height="10" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
          <path d="M20 36C20 36 14 44 14 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 36C44 36 50 44 50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 36V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <rect x="24" y="36" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Floating Astronaut 2 (Coming from other side, slower) */}
      <motion.div
        animate={{
          x: ["110vw", "-10vw"],
          y: ["70vh", "60vh", "75vh"],
          rotate: [360, 0],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-12 h-12 opacity-10"
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
          <path d="M32 36V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <rect x="24" y="36" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Meteors */}
      <AnimatePresence>
        {meteors.map((id) => {
          const startTop = Math.random() * 40;
          const startLeft = -10;
          const angle = 25 + Math.random() * 20;
          return (
            <motion.div
              key={id}
              initial={{ 
                top: `${startTop}%`, 
                left: `${startLeft}%`,
                opacity: 0,
                width: 0 
              }}
              animate={{ 
                left: "110%",
                top: `${startTop + 60}%`,
                opacity: [0, 1, 1, 0],
                width: ["0px", "200px", "200px", "0px"]
              }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
