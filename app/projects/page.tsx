"use client";

import { useProjects, Project } from "../../context/ProjectContext";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { urlFor } from "../../lib/sanity";
import ScrollReveal from "../../components/ScrollReveal";

export default function ProjectsPage() {
    const { projects, loading } = useProjects();
    const { language, t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const cats = new Set(["All"]);
        projects.forEach(p => {
            const cat = language === 'ar' && p.categoryAr ? p.categoryAr : p.category;
            if (cat) cats.add(cat);
        });
        return Array.from(cats);
    }, [projects, language]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter(p => {
            const cat = language === 'ar' && p.categoryAr ? p.categoryAr : p.category;
            return cat === activeCategory;
        });
    }, [projects, activeCategory, language]);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 md:pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <ScrollReveal direction="down">
                    <header className="mb-12 md:mb-24">
                        <h1 className="text-4xl sm:text-5xl md:text-9xl font-black dark:text-white uppercase italic tracking-tighter mb-6 leading-none font-premium">
                            {t("projects_title_prefix")} <span className="text-brand-red">{t("projects_title_span")}</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed px-1 italic">
                            {t("projects_desc")}
                        </p>
                        <div className="w-24 h-2 bg-brand-red rounded-full mt-8" />
                    </header>
                </ScrollReveal>

                {/* Filter Bar */}
                {!loading && projects.length > 0 && (
                    <ScrollReveal delay={0.2} direction="none">
                        <div className="flex flex-wrap gap-3 md:gap-6 mb-16 md:mb-24">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-500 border ${
                                        activeCategory === cat 
                                        ? "bg-brand-red border-brand-red text-white shadow-2xl shadow-brand-red/40 scale-105" 
                                        : "bg-white dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 hover:text-brand-red border-slate-200 dark:border-white/10 hover:border-brand-red/50"
                                    }`}
                                >
                                    {cat === "All" ? (language === "ar" ? "الكل" : "All") : cat}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-[450px] md:h-[600px] bg-white dark:bg-slate-900 rounded-[3rem] animate-pulse" />
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl italic font-light">No projects found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {filteredProjects.map((project, i) => (
                            <ScrollReveal key={project.id} delay={i * 0.1} direction="up" distance={30}>
                                <Link href={`/projects/${project.slug}`} className="group relative block bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-700 hover:shadow-2xl hover:-translate-y-4">
                                    <div className="relative h-72 md:h-[450px] overflow-hidden">
                                        <Image
                                            src={urlFor(project.image).width(800).quality(95).url() || "/project1.png"}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            priority={i < 3}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                        
                                        <div className="absolute top-6 left-6 md:top-8 md:left-8 glass px-4 md:px-6 py-2 rounded-full shadow-xl">
                                            <span className="text-slate-900 dark:text-white text-[10px] md:text-xs font-black uppercase tracking-widest">
                                                {language === 'ar' && project.categoryAr ? project.categoryAr : project.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 flex flex-col">
                                        <div className="text-[10px] md:text-xs text-brand-red font-black uppercase tracking-[0.3em] mb-3">
                                            {language === 'ar' && project.locationAr ? project.locationAr : project.location}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black mb-4 dark:text-white tracking-tight leading-tight group-hover:text-brand-red transition-colors duration-500 font-premium">
                                            {language === 'ar' && project.titleAr ? project.titleAr : project.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light text-base md:text-lg line-clamp-2">
                                            {language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description}
                                        </p>
                                        
                                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-brand-red transition-colors">
                                                {language === 'ar' ? "عرض المشروع" : "View Project"}
                                            </span>
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={language === 'ar' ? 'rotate-180' : ''}>
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
