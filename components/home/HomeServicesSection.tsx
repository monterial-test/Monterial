"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { SectionHeader } from "./SectionHeader";

export default function HomeServicesSection() {
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
