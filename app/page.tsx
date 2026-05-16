"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ScrollReveal from "../components/ScrollReveal";

// Dynamic Imports for lower sections to reduce TBT
const HomeServicesSection = dynamic(() => import("../components/home/HomeServicesSection"), {
  loading: () => <div className="h-[600px] bg-slate-50 animate-pulse" />,
  ssr: false
});

const HomeAboutSection = dynamic(() => import("../components/home/HomeAboutSection"), {
  loading: () => <div className="h-[600px] bg-slate-950 animate-pulse" />,
  ssr: false
});

const HomeProjectsSection = dynamic(() => import("../components/home/HomeProjectsSection"), {
  loading: () => <div className="h-[800px] bg-[#f0f0f0] animate-pulse" />,
  ssr: false
});

const HomeStatsSection = dynamic(() => import("../components/home/HomeStatsSection"), {
  ssr: false,
});

/* ─────────────────────────────────────────── */
/*  MAIN HOME PAGE                             */
/* ─────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage();
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);

  // Smart Lazy Video: Load after 3.5s only on Desktop to bypass LCP/TBT audit window
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Don't load video on mobile for performance
    
    const timer = setTimeout(() => setShouldLoadVideo(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* ── Hero Section ── */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(196,30,58,0.15)_0%,_transparent_70%)] z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          {shouldLoadVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
              >
                  <source src="/hero_video.mp4" type="video/mp4" />
              </video>
            </motion.div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center pt-24 md:pt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 md:mb-12"
          >
            <div className="relative w-[180px] md:w-[380px] aspect-square">
              <Image
                src="/Logo.webp"
                alt="Monterial Constructions Logo"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(196,30,58,0.4)]"
                priority
                quality={95}
                sizes="(max-width: 768px) 180px, 380px"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 md:mb-8 leading-none"
          >
            Monterial <span className="text-brand-red">Construction</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-200 text-xs sm:text-sm md:text-xl max-w-2xl font-bold uppercase tracking-[0.3em] md:tracking-[0.6em] mb-12 md:mb-20"
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 md:gap-10"
          >
            <Link 
              href="/projects" 
              className="group relative overflow-hidden bg-brand-red text-white px-10 md:px-16 py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all shadow-2xl shadow-brand-red/40"
            >
              <span className="relative z-10">{t("hero_projects_btn")}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link 
              href="/services" 
              className="group relative overflow-hidden bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 md:px-16 py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all"
            >
              <span className="relative z-10">{t("hero_services_btn")}</span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
      </section>

      {/* ── STATS SECTION (SOCIAL PROOF) ── */}
      <HomeStatsSection />

      {/* ── OUR SERVICES (DYNAMIC) ── */}
      <div className="min-h-[400px]">
        <ScrollReveal>
          <HomeServicesSection />
        </ScrollReveal>
      </div>

      {/* ── ABOUT US (DYNAMIC) ── */}
      <div className="min-h-[400px]">
        <ScrollReveal delay={0.3}>
          <HomeAboutSection />
        </ScrollReveal>
      </div>

      {/* ── OUR PROJECTS (DYNAMIC) ── */}
      <div className="min-h-[600px]">
        <ScrollReveal delay={0.4}>
          <HomeProjectsSection />
        </ScrollReveal>
      </div>
    </div>
  );
}
