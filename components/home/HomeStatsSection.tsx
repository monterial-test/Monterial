"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ScrollReveal from "../ScrollReveal";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });
  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, count, numericValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix || value.replace(/[0-9]/g, "")}
    </span>
  );
}

export default function HomeStatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: "15+", label: t("stats_years") },
    { value: "120+", label: t("stats_projects") },
    { value: "500+", label: t("stats_workers") },
    { value: "25+", label: t("stats_awards") },
  ];

  return (
    <section className="bg-slate-900 dark:bg-slate-950 py-16 md:py-24 border-y border-white/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="none">
              <div className="flex flex-col items-center group">
                <span className="text-5xl md:text-7xl font-black text-white mb-3 md:mb-6 group-hover:text-brand-red transition-colors duration-700">
                  <CountUp value={stat.value} />
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-slate-200 transition-colors duration-700">
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
