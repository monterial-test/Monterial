"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { SectionHeader } from "./SectionHeader";

import ScrollReveal from "../ScrollReveal";

export default function HomeAboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-100 dark:bg-slate-950 py-16 md:py-32 px-4 md:px-6 relative overflow-hidden transition-colors duration-500">
      {/* Texture Overlay (CSS-based noise) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title={t("home_about_title")} light />

        {/* Balanced Three-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          {/* Left Image */}
          <div className="w-full lg:w-64">
            <ScrollReveal direction="right">
              <div className="relative h-48 sm:h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/5 group">
                <Image
                  src="/construction_hero.png"
                  alt="Construction work"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Center Text */}
          <div className="flex-1 text-center flex flex-col items-center px-2">
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-12 md:w-16 h-1 bg-red-600 rounded-full mb-6 md:mb-8" />
                <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg md:text-2xl leading-relaxed font-light mb-8 md:mb-12 italic">
                  "{t("home_about_text")}"
                </p>
                <Link
                  href="/about"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-black uppercase tracking-widest px-10 md:px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40 flex items-center gap-3"
                >
                  <span className="text-base md:text-lg">›</span> {t("home_about_btn")}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image */}
          <div className="hidden sm:block w-full lg:w-64">
            <ScrollReveal direction="left" delay={0.4}>
              <div className="relative h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/5 group">
                <Image
                  src="/project2.png"
                  alt="Building project"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
