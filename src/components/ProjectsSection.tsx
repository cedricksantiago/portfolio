"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Building2, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "SDO-HRD Portal",
    description: "Modern web application for Human Resources Development management, featuring a centralized directory and tracking tools.",
    tags: ["React.js", "Tailwind", "Firebase", "TypeScript"],
    icon: Building2,
    images: [
      "/sdo_hrd_portal/1.jpg",
      "/sdo_hrd_portal/2.jpg",
      "/sdo_hrd_portal/3.jpg",
      "/sdo_hrd_portal/4.jpg",
      "/sdo_hrd_portal/5.jpg",
      "/sdo_hrd_portal/6.jpg",
      "/sdo_hrd_portal/7.jpg",
      "/sdo_hrd_portal/8.jpg",
      "/sdo_hrd_portal/9.jpg",
      "/sdo_hrd_portal/10.jpg",
    ],
  },
  {
    title: "HR Portal",
    description: "Web-Based Faculty Hiring Management System Implementing Data Analytics.",
    tags: ["Next.js", "React", "Tailwind", "PostgreSQL"],
    icon: Users,
    images: [
      "/hr_portal/2.png", // Dashboard
      "/hr_portal/1.png", // Login
      "/hr_portal/3.png", // Analytics
      "/hr_portal/4.png", // Dean Portal
      "/hr_portal/5.png", // Faculty Renewals
    ],
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const Icon = project.icon;
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    if (project.images.length <= 1 || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project.images.length, isLightboxOpen]);

  const openLightbox = () => {
    setLightboxIdx(currentImageIdx);
    setIsLightboxOpen(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIdx((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group flex flex-col lg:flex-row w-full bg-black border border-zinc-900 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-zinc-800 shadow-2xl min-h-[440px]"
      >
        {/* Left Content (Text) */}
        <div className="flex flex-col justify-center p-10 lg:p-16 lg:w-[45%] relative z-10">
          <div className="mb-10">
            <Icon className="w-12 h-12 text-white" />
          </div>

          <h4 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {project.title}
          </h4>
          
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-5 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-xs font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all hover:bg-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Content (Stacked Windows) */}
        <div className="relative w-full lg:w-[55%] min-h-[400px] lg:min-h-full p-12 flex items-center justify-center overflow-hidden">
          
          <div 
            className="relative w-full max-w-[480px] aspect-[4/3] cursor-pointer"
            onClick={openLightbox}
          >
            {/* Layer 3 (Back) */}
            <div className="absolute top-[-30px] right-[-30px] w-full h-full bg-zinc-900/20 border border-zinc-800/30 rounded-xl"></div>
            
            {/* Layer 2 (Middle) */}
            <div className="absolute top-[-15px] right-[-15px] w-full h-full bg-zinc-900/40 border border-zinc-800/50 rounded-xl"></div>

            {/* Top Window Layer (Main Image) */}
            <motion.div
              className="absolute inset-0 bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-10"
              whileHover={{ y: -5, x: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser Controls */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/90 border-b border-zinc-800 flex items-center px-4 gap-2 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                
                {/* Expand Indicator on Hover */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-zinc-500 text-[10px] font-medium uppercase tracking-wider">
                  <span>Full Screen</span>
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative w-full h-full pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pt-8"
                  >
                    <Image
                      src={project.images[currentImageIdx]}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-zinc-400">Image {lightboxIdx + 1} of {project.images.length}</p>
                </div>
                <button 
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Container */}
              <div className="relative flex-grow rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group/lightbox">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[lightboxIdx]}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover/lightbox:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover/lightbox:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-24 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
