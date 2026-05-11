"use client";

import Image from 'next/image';
import { urlFor } from '../../../lib/sanity';
import ProjectGallery from '../../../components/ProjectGallery';
import { useLanguage } from '../../../context/LanguageContext';
import { useProjects } from '../../../context/ProjectContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ProjectClient({ initialProject, slug, jsonLd }: { initialProject: any, slug: string, jsonLd: any }) {
    const { language, t } = useLanguage();
    const { projects } = useProjects();

    // Fallback to client-side data if server fetch failed
    const project = initialProject || projects.find((p: any) => p.slug?.current === slug);

    if (!project) {
        return (
            <div className="pt-40 text-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                <h1 className="text-4xl font-bold">Project Not Found</h1>
                <p className="mt-4">We could not find the project you are looking for.</p>
                <Link href="/projects" className="text-red-600 mt-8 block hover:underline">Back to Projects</Link>
            </div>
        );
    }

    const title = language === 'ar' && project.titleAr ? project.titleAr : project.title;
    const description = language === 'ar' && project.descriptionAr ? project.descriptionAr : project.description;
    const category = language === 'ar' && project.categoryAr ? project.categoryAr : project.category;
    const location = language === 'ar' && project.locationAr ? project.locationAr : project.location;

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden bg-slate-900">
                <Image
                    src={project.image ? urlFor(project.image).width(1920).fit('max').url() : '/project1.png'}
                    alt={title}
                    fill
                    className="object-contain p-10"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                {category}
                            </span>
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                                {location}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                            {title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-20">
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em] mb-6">
                                {t('project_overview') || "Project Overview"}
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="space-y-12">
                                <h2 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em]">
                                    {t('visual_gallery') || "Visual Gallery"}
                                </h2>
                                <ProjectGallery images={project.gallery} title={title} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-2xl font-black mb-8 dark:text-white">
                                {t('project_details') || "Project Details"}
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                                        {t('location') || "Location"}
                                    </label>
                                    <p className="font-bold dark:text-white">{location}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                                        {t('category') || "Category"}
                                    </label>
                                    <p className="font-bold dark:text-white">{category}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
