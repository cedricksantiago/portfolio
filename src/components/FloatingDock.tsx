"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FiHome, FiCpu, FiLayers, FiMail } from "react-icons/fi";

const links = [
  { title: "HOME.SYS", icon: FiHome, href: "#" },
  { title: "STACK.SYS", icon: FiCpu, href: "#tech" },
  { title: "WORK.SYS", icon: FiLayers, href: "#projects" },
  { title: "MAIL.SYS", icon: FiMail, href: "#contact" },
];

export default function FloatingDock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl bg-zinc-900/80 border-t border-zinc-800 px-4 pb-3 backdrop-blur-md pointer-events-auto shadow-2xl"
      >
        {links.map((link) => (
          <IconContainer mouseX={mouseX} key={link.title} {...link} />
        ))}
      </motion.div>
    </div>
  );
}

function IconContainer({ mouseX, title, icon: Icon, href }: any) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  let heightSync = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  // Mechanical spring settings
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });
  let height = useSpring(heightSync, { mass: 0.1, stiffness: 200, damping: 15 });

  let iconSizeSync = useTransform(distance, [-150, 0, 150], [20, 32, 20]);
  let iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <a href={href} onClick={(e) => {
      if(href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href === "#" ? "body" : href)?.scrollIntoView({ behavior: "smooth" });
      }
    }}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 hover:border-white transition-colors cursor-pointer group"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: -45, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute left-1/2 px-3 py-1 bg-white text-black font-mono text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap rounded-sm pointer-events-none"
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          <Icon className="w-full h-full" />
        </motion.div>
      </motion.div>
    </a>
  );
}
