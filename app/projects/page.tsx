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
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 md:pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <ScrollReveal>
                    <header className="mb-10 md:mb-16">
                        <h1 className="text-3xl sm:text-4xl md:text-8xl font-black dark:text-white uppercase italic tracking-tighter mb-4 leading-tight md:leading-none">
                            {t("projects_title_prefix")} <span className="text-red-600">{t("projects_title_span")}</span>
                        </h1>
                        <p className="text-slate-500 max-w-xl text-base md:text-lg font-light leading-relaxed px-1">
                            {t("projects_desc")}
                        </p>
                    </header>
                </ScrollReveal>

                {/* Filter Bar */}
                {!loading && projects.length > 0 && (
                    <ScrollReveal delay={0.2}>
                        <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-widest transition-all ${
                                        activeCategory === cat 
                                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30" 
                                        : "bg-white dark:bg-slate-900 text-slate-400 hover:text-red-600 border border-slate-200 dark:border-white/5"
                                    }`}
                                >
                                    {cat === "All" ? (language === "ar" ? "الكل" : "All") : cat}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-[400px] md:h-[500px] bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg md:text-xl">No projects found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-slate-900">
                        {filteredProjects.map((project, i) => (
                            <ScrollReveal key={project.id} delay={i * 0.1}>
                                <Link href={`/projects/${project.slug}`} className="group relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-all hover:shadow-2xl hover:-translate-y-2 card">
                                    <div className="relative h-64 md:h-80 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={urlFor(project.image).width(800).quality(90).url() || "/project1.png"}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            priority={i < 2}
                                        />
                                        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 rounded-full shadow-lg">
                                            {language === 'ar' && project.categoryAr ? project.categoryAr : project.category}
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-10 flex-grow flex flex-col">
                                        <div className="text-[9px] md:text-[10px] text-red-600 dark:text-red-600 font-black uppercase tracking-[0.2em] mb-2">{language === 'ar' && project.locationAr ? project.locationAr : project.location}</div>
                                        <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 dark:text-white tracking-tight leading-tight group-hover:text-red-600 transition-colors">{language === 'ar' && project.titleAr ? project.titleAr : project.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light text-sm md:text-base line-clamp-3">
                                            {language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description}
                                        </p>
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
