"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Building2, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getImagePath = (path: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? `/portfolio${path}` : path;
};

const projects = [
  {
    title: "SDO-HRD PORTAL",
    description: "A comprehensive Human Resource Development system designed for optimized personnel management and training tracking. Built with modern web standards for high performance and scalability.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    icon: Building2,
    images: [
      "/sdo_hrd_portal/1.jpg",
      "/sdo_hrd_portal/2.jpg",
      "/sdo_hrd_portal/3.jpg",
      "/sdo_hrd_portal/4.jpg",
      "/sdo_hrd_portal/5.jpg",
    ],
    link: "https://hrd-project-blond.vercel.app"
  },
  {
    title: "HR PORTAL",
    description: "A sophisticated management dashboard for streamlining HR operations, from recruitment to performance monitoring. Features a technical, minimalist interface optimized for data clarity.",
    tags: ["React", "Node.js", "PostgreSQL", "Supabase", "Framer Motion"],
    icon: Users,
    images: [
      "/hr_portal/1.png",
      "/hr_portal/2.png",
      "/hr_portal/3.png",
      "/hr_portal/4.png",
      "/hr_portal/5.png",
    ],
    link: "https://udm-talenthub-next-eight.vercel.app/login"
  }
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative flex flex-col lg:flex-row w-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 hover:border-zinc-100 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.1)] min-h-[400px]"
      >
        {/* Left Content (60% width) */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:w-[60%] relative z-10 space-y-4">
          <div className="w-fit p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
            <Icon className="w-8 h-8 text-zinc-100" />
          </div>

          <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
            {project.title}
          </h4>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs font-medium text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Site Button */}
          <Link 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors mt-8 w-fit"
          >
            VIEW SITE
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-[5px]" />
          </Link>
        </div>

        {/* Right Content (40% width - Stacked Windows) */}
        <div
          className="relative w-full lg:w-[40%] min-h-[350px] p-8 md:p-12 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={openLightbox}
        >
          <div className="relative w-full max-w-[400px] aspect-[4/3] perspective-[2000px] drop-shadow-2xl">
            <motion.div
              className="relative w-full h-full transform-style-preserve-3d"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Ghost 2 */}
              <div className="absolute top-[20px] left-[20px] w-full h-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-5 opacity-20 backdrop-blur-sm"></div>

              {/* Ghost 1 */}
              <div className="absolute top-[10px] left-[10px] w-full h-full bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl z-10 opacity-40 backdrop-blur-md"></div>

              {/* Top Window Layer (Main Image) */}
              <div className="absolute inset-0 bg-[#121212] border border-zinc-700 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
                {/* Browser Controls */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/90 border-b border-zinc-800 flex items-center px-4 gap-2 z-40 backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/90"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/90"></div>

                  {/* Expand Indicator on Hover */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    <span>Expand</span>
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
                        src={getImagePath(project.images[currentImageIdx])}
                        alt={project.title}
                        fill
                        className="object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
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
                      src={getImagePath(project.images[lightboxIdx])}
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
    <section id="projects" className="w-full py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-zinc-900 pb-16 mb-24">
          <div>
            <div className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Module.03 // Featured_Projects</div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Featured Projects</h2>
          </div>
          <p className="text-zinc-300 text-xl max-w-sm leading-snug font-light">
            A selection of my recent works and technical experiments.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
