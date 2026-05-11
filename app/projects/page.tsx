"use client";

import { useProjects, Project } from "../../context/ProjectContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { urlFor } from "../../lib/sanity";

export default function ProjectsPage() {
    const { projects, loading } = useProjects();
    const { language, t } = useLanguage();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 md:pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <header className="mb-10 md:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-8xl font-black dark:text-white uppercase italic tracking-tighter mb-4 leading-tight md:leading-none">
                        {t("projects_title_prefix")} <span className="text-red-600">{t("projects_title_span")}</span>
                    </h1>
                    <p className="text-slate-500 max-w-xl text-base md:text-lg font-light leading-relaxed px-1">
                        {t("projects_desc")}
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-[400px] md:h-[500px] bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg md:text-xl">No projects found. Add some in Sanity Studio!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-slate-900">
                        {projects.map((project, i) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="group relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-all hover:shadow-2xl hover:-translate-y-2 card">
                                <div className="relative h-64 md:h-72 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <Image
                                        src={urlFor(project.image).width(800).fit('max').url() || "/project1.png"}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-4 transition-transform duration-500"
                                        priority={i < 3}
                                    />
                                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 rounded-full shadow-lg">
                                        {language === 'ar' && project.categoryAr ? project.categoryAr : project.category}
                                    </div>
                                </div>

                                <div className="p-6 md:p-10 flex-grow flex flex-col">
                                    <div className="text-[9px] md:text-[10px] text-red-600 dark:text-red-600 font-black uppercase tracking-[0.2em] mb-2">{language === 'ar' && project.locationAr ? project.locationAr : project.location}</div>
                                    <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 dark:text-white tracking-tight leading-tight">{language === 'ar' && project.titleAr ? project.titleAr : project.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light text-sm md:text-base">
                                        {language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}