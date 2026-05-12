"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useProjects } from "../context/ProjectContext";
import { urlFor } from "../lib/sanity";

/* ─────────────────────────────────────────── */
/*  MAIN HOME PAGE                             */
/* ─────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = React.useState(false);

  // Delay video loading to boost LCP scores
  React.useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      {/* ── Hero Section ── */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          
          {/* Priority Image shown immediately */}
          <div className="absolute inset-0 w-full h-full">
             <Image 
                src="/construction_hero.png" 
                alt="Construction" 
                fill 
                priority 
                className={`object-cover transition-opacity duration-1000 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
                sizes="100vw"
             />
          </div>

          {/* Video loaded with delay */}
          {showVideo && (
            <div className="absolute inset-0 w-full h-full animate-in fade-in duration-1000">
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
              >
                  <source src="/hero_video.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center pt-24 md:pt-32">
          <div className="mb-6 md:mb-12 animate-in fade-in zoom-in-75 duration-1000 flex justify-center w-full">
            <div className="relative w-[200px] md:w-[450px] aspect-square">
              <Image
                src="/Logo.png"
                alt="Monterial Logo"
                fill
                className="object-contain"
                priority
                loading="eager"
                sizes="(max-width: 768px) 200px, 450px"
              />
            </div>
          </div>

          <div className="relative inline-block mb-4 md:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none">
              {t("company_name")}
            </h1>
            <svg className="absolute -bottom-4 md:-bottom-6 left-0 w-full h-6 md:h-10 overflow-visible" viewBox="0 0 500 40" preserveAspectRatio="none">
              <path
                d="M10,20 Q250,40 490,20"
                fill="none"
                stroke="#c41e3a"
                strokeWidth="8"
                strokeLinecap="round"
                className="animate-draw-line"
              />
            </svg>
          </div>

          <p className="text-base sm:text-lg md:text-3xl font-black text-white uppercase tracking-[0.1em] md:tracking-[0.2em] mb-8 md:mb-12 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            {t("hero_slogan")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/projects" className="bg-red-600 hover:bg-red-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40 text-sm md:text-base">
              {t("hero_btn_projects")}
            </Link>
            <Link href="/services" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest transition-all text-sm md:text-base">
              {t("hero_btn_services")}
            </Link>
          </div>
        </div>
      </section>



      {/* ── OUR SERVICES ── */}
      <HomeServicesSection />

      {/* ── ABOUT US ── */}
      <HomeAboutSection />
      {/* ── OUR PROJECTS ── */}
      <HomeProjectsSection />
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  SECTION HEADER HELPER                      */
/* ─────────────────────────────────────────── */
function SectionHeader({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className="text-center mb-10 md:mb-16 group">
      <div className="flex justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 duration-500">
        <svg width="40" height="30" className="md:w-12 md:h-9" viewBox="0 0 36 28" fill="none">
          <rect x="0" y="4" width="10" height="20" rx="3" transform="rotate(-10 0 4)" fill={light ? "#fff" : "#222"} />
          <rect x="14" y="4" width="10" height="20" rx="3" transform="rotate(-10 14 4)" fill={light ? "#fff" : "#222"} />
        </svg>
      </div>
      <div className="relative inline-block px-4">
        <h2 className={`text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-4 ${light ? "text-white" : "text-slate-900"}`}>
          {title}
        </h2>
        <div className="w-1/2 md:w-full h-1 bg-red-600 rounded-full transition-all duration-700 group-hover:w-3/4 mx-auto" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  OUR SERVICES SECTION                       */
/* ─────────────────────────────────────────── */
function HomeServicesSection() {
  const { t } = useLanguage();

  const services = [
    { id: "01", key: "service1_title" },
    { id: "02", key: "service2_title" },
    { id: "03", key: "service3_title" },
    { id: "04", key: "service4_title" },
  ];

  return (
    <section
      className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f0f0 0%, #f0f0f0 40%, #c41e3a 100%)" }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader title={t("home_services_title")} />

        {/* 2×2 Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-row items-center md:items-start gap-4 md:gap-8 shadow-xl border-2 border-slate-900/5 dark:border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
            >
              {/* Number Badge */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-red-600/40 group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-black text-lg md:text-2xl">{svc.id}</span>
              </div>
              {/* Text */}
              <div className="pt-0 md:pt-2">
                <p className="text-base md:text-xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-red-600 transition-colors">
                  {t(svc.key)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 md:mt-20">
          <Link
            href="/services"
            className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-black uppercase tracking-widest px-8 md:px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/30 flex items-center gap-3"
          >
            <span className="text-base md:text-lg">›</span> {t("home_services_btn")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/*  ABOUT US SECTION                           */
/* ─────────────────────────────────────────── */
function HomeAboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-950 py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Texture Overlay (CSS-based noise) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title={t("home_about_title")} light />

        {/* Balanced Three-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          {/* Left Image - Hidden on mobile for cleaner look or kept small */}
          <div className="relative w-full lg:w-64 h-48 sm:h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden shrink-0 shadow-2xl border-2 border-white/5 group">
            <Image
              src="/construction_hero.png"
              alt="Construction work"
              fill
              loading="lazy"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
          </div>

          {/* Center Text */}
          <div className="flex-1 text-center flex flex-col items-center px-2">
            <div className="w-12 md:w-16 h-1 bg-red-600 rounded-full mb-6 md:mb-8" />
            <p className="text-slate-300 text-base sm:text-lg md:text-2xl leading-relaxed font-light mb-8 md:mb-12 italic">
              "{t("home_about_text")}"
            </p>
            <Link
              href="/about"
              className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-black uppercase tracking-widest px-10 md:px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40 flex items-center gap-3"
            >
              <span className="text-base md:text-lg">›</span> {t("home_about_btn")}
            </Link>
          </div>

          {/* Right Image - Hidden on very small screens to avoid clutter */}
          <div className="hidden sm:block relative w-full lg:w-64 h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden shrink-0 shadow-2xl border-2 border-white/5 group">
            <Image
              src="/project2.png"
              alt="Building project"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/*  OUR PROJECTS SECTION                       */
/* ─────────────────────────────────────────── */
function HomeProjectsSection() {
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
                    transition={{ duration: 0.4 }}
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
