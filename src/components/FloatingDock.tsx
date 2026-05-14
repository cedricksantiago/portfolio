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
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"bottom" | "top" | "left" | "right">("bottom");
  let mousePosition = useMotionValue(0);

  const isVertical = position === "left" || position === "right";

  const containerClasses = {
    bottom: "bottom-8 left-1/2 -translate-x-1/2 flex-col",
    top: "top-8 left-1/2 -translate-x-1/2 flex-col-reverse",
    left: "left-8 top-1/2 -translate-y-1/2 flex-row",
    right: "right-8 top-1/2 -translate-y-1/2 flex-row-reverse",
  }[position];

  const dockClasses = {
    bottom: "flex-row h-16 items-end pb-3",
    top: "flex-row h-16 items-start pt-3",
    left: "flex-col w-16 items-start pl-3",
    right: "flex-col w-16 items-end pr-3",
  }[position];

  const handleDragEnd = (_: any, info: any) => {
    // Get the final drop point relative to the viewport
    const x = info.point.x;
    const y = info.point.y;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Calculate proximity to each edge
    const dists = [
      { side: "top", val: y },
      { side: "bottom", val: h - y },
      { side: "left", val: x },
      { side: "right", val: w - x },
    ];

    // Find the absolute closest edge
    const closest = dists.sort((a, b) => a.val - b.val)[0];
    setPosition(closest.side as any);
  };

  return (
    <div className={`fixed z-[100] flex items-center gap-4 ${containerClasses}`}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 -z-10 cursor-default"
            />

            <motion.div
              initial={isVertical
                ? { x: position === "left" ? -20 : 20, opacity: 0 }
                : { y: position === "bottom" ? 20 : -20, opacity: 0 }
              }
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={isVertical
                ? { x: position === "left" ? -20 : 20, opacity: 0 }
                : { y: position === "bottom" ? 20 : -20, opacity: 0 }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => mousePosition.set(isVertical ? e.clientY : e.clientX)}
              onMouseLeave={() => mousePosition.set(0)}
              className={`flex gap-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 px-4 shadow-2xl backdrop-blur-xl pointer-events-auto ${dockClasses}`}
            >
              {links.map((link) => (
                <IconContainer
                  mousePosition={mousePosition}
                  key={link.title}
                  isVertical={isVertical}
                  position={position}
                  {...link}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Access Handle */}
      <motion.button
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95, cursor: "grabbing" }}
        className={`group relative flex items-center gap-2 cursor-grab active:cursor-grabbing ${isVertical ? "flex-col py-4" : "flex-col px-4"}`}
      >
        <div className={`${isVertical ? "w-1.5 h-12" : "w-12 h-1.5"} bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50 group-hover:border-zinc-500 transition-colors`}>
          <motion.div
            animate={isOpen ? (isVertical ? { y: 0 } : { x: 0 }) : (isVertical ? { y: "-100%" } : { x: "-100%" })}
            className="w-full h-full bg-white/20"
          />
        </div>
        <span className={`text-[7px] font-mono text-zinc-600 group-hover:text-zinc-400 uppercase tracking-[0.4em] transition-colors ${isVertical ? "[writing-mode:vertical-lr] rotate-180" : ""}`}>
          {isOpen ? "CLOSE.SYS" : "ACCESS.SYS"}
        </span>
      </motion.button>
    </div>
  );
}

function IconContainer({ mousePosition, title, icon: Icon, href, isVertical, position }: any) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  let distance = useTransform(mousePosition, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    if (isVertical) {
      return val - bounds.y - bounds.height / 2;
    }
    return val - bounds.x - bounds.width / 2;
  });

  let sizeSync = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  let size = useSpring(sizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  let iconSizeSync = useTransform(distance, [-150, 0, 150], [20, 32, 20]);
  let iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const tooltipClasses = {
    bottom: "bottom-full mb-4 left-1/2 -translate-x-1/2",
    top: "top-full mt-4 left-1/2 -translate-x-1/2",
    left: "left-full ml-4 top-1/2 -translate-y-1/2",
    right: "right-full mr-4 top-1/2 -translate-y-1/2",
  }[position as string];

  const arrowClasses = {
    bottom: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45",
    top: "-top-1 left-1/2 -translate-x-1/2 rotate-45",
    left: "-left-1 top-1/2 -translate-y-1/2 rotate-45",
    right: "-right-1 top-1/2 -translate-y-1/2 rotate-45",
  }[position as string];

  return (
    <a href={href} onClick={(e) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href === "#" ? "body" : href)?.scrollIntoView({ behavior: "smooth" });
      }
    }}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 hover:border-white transition-colors cursor-pointer group"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute px-3 py-1 bg-white text-black font-mono text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap rounded-sm pointer-events-none ${tooltipClasses}`}
            >
              <div className={`absolute w-2 h-2 bg-white ${arrowClasses}`} />
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
