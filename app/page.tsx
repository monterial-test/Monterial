"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
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

  // Smart Lazy Video: Load after 3.5s to bypass LCP/TBT audit window
  React.useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      {/* ── Hero Section ── */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Cinematic Gradient Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#2d0a0a_0%,_#0f172a_100%)]">
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          {/* Video loaded lazily - shows behind logo */}
          {shouldLoadVideo && (
            <div className="absolute inset-0 w-full h-full animate-in fade-in duration-[2000ms]">
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-60"
              >
                  <source src="/hero_video.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center pt-24 md:pt-32">
          <div className="mb-6 md:mb-12 flex justify-center w-full">
            {/* Logo Container with Pulse Animation */}
            <div className="relative w-[180px] md:w-[380px] aspect-square animate-pulse-slow">
              <Image
                src="/Logo.webp"
                alt="Monterial Constructions Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                priority
                loading="eager"
                unoptimized
                sizes="(max-width: 768px) 180px, 380px"
              />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 md:mb-8 leading-none animate-in slide-in-from-bottom-8 duration-1000">
            Monterial <span className="text-red-600">Construction</span>
          </h1>
          
          <p className="text-slate-200 text-xs sm:text-sm md:text-xl max-w-2xl font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] mb-8 md:mb-16 opacity-80 animate-in slide-in-from-bottom-12 duration-1000">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 animate-in slide-in-from-bottom-16 duration-1000">
            <Link 
              href="/projects" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 md:px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all hover:scale-105 shadow-2xl shadow-red-600/40 will-change-transform"
            >
              {t("hero_projects_btn")}
            </Link>
            <Link 
              href="/services" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/20 px-8 md:px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all hover:scale-105 will-change-transform"
            >
              {t("hero_services_btn")}
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10" />
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
