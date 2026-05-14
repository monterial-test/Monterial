"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../ScrollReveal";

export default function HomeStatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: "15+", label: t("stats_years") },
    { value: "120+", label: t("stats_projects") },
    { value: "500+", label: t("stats_workers") },
    { value: "25+", label: t("stats_awards") },
  ];

  return (
    <section className="bg-slate-900 py-12 md:py-20 border-y border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center group">
                <span className="text-4xl md:text-6xl font-black text-white mb-2 md:mb-4 group-hover:text-red-600 transition-colors duration-500">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
