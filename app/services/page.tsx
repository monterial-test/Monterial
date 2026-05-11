"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ServicesPage() {
    const { t } = useLanguage();

    const services = [
        { id: "01", key: "service1_title" },
        { id: "02", key: "service2_title" },
        { id: "03", key: "service3_title" },
        { id: "04", key: "service4_title" },
        { id: "05", key: "service5_title" },
        { id: "06", key: "service6_title" },
        { id: "07", key: "service7_title" },
        { id: "08", key: "service8_title" },
        { id: "09", key: "service9_title" },
        { id: "10", key: "service10_title" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <h3 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">{t("services_subtitle")}</h3>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic leading-tight">
                        {t("services_title")}
                    </h1>
                    <div className="w-24 h-2 bg-red-600 mx-auto mt-8 rounded-full"></div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {services.map((service, i) => (
                        <div 
                            key={i} 
                            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-900/5 dark:border-white/5 flex flex-row items-center gap-8 group hover:scale-[1.03] transition-all duration-500 hover:border-red-600/30"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl shadow-red-600/40 order-1 group-hover:rotate-6 transition-transform">
                                <span className="text-white font-black text-3xl">{service.id}</span>
                            </div>
                            <div className="flex-grow text-start order-2">
                                <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-red-600 transition-colors">
                                    {t(service.key)}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-32 bg-slate-900 dark:bg-red-600 rounded-[3rem] p-12 text-center text-white shadow-2xl overflow-hidden relative group">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-6 uppercase italic">{t("hero_btn_services")}</h2>
                        <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t("hero_desc")}
                        </p>
                        <a href="/contact" className="inline-block bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-transform shadow-xl">
                            {t("footer_contact_btn")}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
