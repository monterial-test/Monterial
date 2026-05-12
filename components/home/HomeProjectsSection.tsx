"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useProjects } from "../../context/ProjectContext";
import { urlFor } from "../../lib/sanity";
import { SectionHeader } from "./SectionHeader";

export default function HomeProjectsSection() {
  const { t, language } = useLanguage();
  const { projects, loading } = useProjects();
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Cycle projects every 5 seconds
  React.useEffect(() => {
    if (loading || projects.length <= 3 || isPaused) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loading, projects.length, isPaused]);

  // Determine the 3 projects to show
  const getVisibleProjects = () => {
    if (projects.length <= 3) return projects;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(projects[(index + i) % projects.length]);
    }
    return result;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section className="bg-[#f0f0f0] dark:bg-slate-900/50 py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t("home_projects_title")} />

        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border-2 md:border-4 border-slate-900 dark:border-white/10 p-6 md:p-12 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] md:shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)] md:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)] relative"
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[420px] bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 md:py-20">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-base">No projects found in the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="wait">
                {visibleProjects.map((project: any, i) => (
                  <motion.div
                    key={project.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col h-[420px] ${i >= 1 ? 'hidden sm:flex' : ''} ${i >= 2 ? 'hidden md:flex' : ''}`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={urlFor(project.image).width(600).format('webp').quality(80).url() || "/project1.png"}
                          alt={language === "ar" && project.titleAr ? project.titleAr : project.title}
                          fill
                          priority={i === 0}
                          loading={i === 0 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <h3 className="text-base md:text-lg font-black text-slate-800 dark:text-white leading-tight mb-4 line-clamp-2 min-h-[3rem]">
                          {language === "ar" && project.titleAr ? project.titleAr : project.title}
                        </h3>
                        <div className="mt-auto">
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-red-600 transition-colors flex items-center gap-2">
                            {language === "ar" ? "اقرأ المزيد" : "READ MORE"} <span className="text-lg">»</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Autoplay Progress Bar */}
          {projects.length > 3 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
               <div className="h-1 w-24 md:w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-red-600"
                  />
               </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12 md:mt-20">
          <Link
            href="/projects"
            className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-black uppercase tracking-widest px-8 md:px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/30 flex items-center gap-3"
          >
            <span className="text-base md:text-lg">›</span> {t("home_projects_btn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
