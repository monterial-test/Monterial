"use client";

import Image from 'next/image';
import { urlFor } from '../../../lib/sanity';
import ProjectGallery from '../../../components/ProjectGallery';
import { useLanguage } from '../../../context/LanguageContext';
import { useProjects } from '../../../context/ProjectContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import ScrollReveal from '../../../components/ScrollReveal';

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
            <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-slate-900">
                <Image
                    src={project.image ? urlFor(project.image).width(1600).format('webp').quality(85).url() : '/project1.png'}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <ScrollReveal>
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    {category}
                                </span>
                                <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                    {location}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                                {title}
                            </h1>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-32 px-6 md:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 md:gap-20">
                    <div className="lg:col-span-2 space-y-16">
                        <ScrollReveal>
                            <div>
                                <h2 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em] mb-6 md:mb-8">
                                    {t('project_overview')}
                                </h2>
                                <p className="text-lg md:text-3xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <ScrollReveal delay={0.2}>
                                <div className="space-y-12">
                                    <h2 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em]">
                                        {t('visual_gallery')}
                                    </h2>
                                    <ProjectGallery images={project.gallery} title={title} />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-1">
                        <ScrollReveal delay={0.3}>
                            <div className="sticky top-32 bg-slate-50 dark:bg-slate-900 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 border border-slate-100 dark:border-white/5 shadow-xl">
                                <h3 className="text-xl md:text-2xl font-black mb-8 dark:text-white uppercase tracking-tighter">
                                    {t('project_details')}
                                </h3>
                                <div className="space-y-8">
                                    <div className="border-b border-slate-200 dark:border-white/5 pb-6">
                                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 block mb-2 tracking-widest">
                                            {t('location') || (language === 'ar' ? 'الموقع' : 'Location')}
                                        </label>
                                        <p className="text-base md:text-xl font-bold dark:text-white">{location}</p>
                                    </div>
                                    <div className="border-b border-slate-200 dark:border-white/5 pb-6">
                                        <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 block mb-2 tracking-widest">
                                            {t('category') || (language === 'ar' ? 'الفئة' : 'Category')}
                                        </label>
                                        <p className="text-base md:text-xl font-bold dark:text-white">{category}</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="pb-24 md:pb-40 px-6">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-red-600 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-center text-white shadow-2xl shadow-red-600/30 relative overflow-hidden group">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-1000 group-hover:scale-150" />
                            
                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 relative z-10">
                                {t('project_cta_title')}
                            </h2>
                            <p className="text-white/80 text-sm md:text-xl font-medium mb-10 md:mb-14 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                {t('project_cta_desc')}
                            </p>
                            <Link 
                                href="/contact"
                                className="inline-block bg-white text-red-600 px-10 md:px-16 py-4 md:py-6 rounded-full font-black uppercase tracking-widest text-xs md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl relative z-10"
                            >
                                {t('project_cta_btn')}
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
