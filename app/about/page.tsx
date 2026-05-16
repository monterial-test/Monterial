"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useFooter } from "../../context/FooterContext";

export default function AboutPage() {
    const { t, language } = useLanguage();
    const { footerData } = useFooter();
    const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const isAr = language === "ar";
    const pdfUrl = footerData.profilePdfUrl || "#";

    const handleCancel = () => {
        if (xhrRef.current) {
            xhrRef.current.abort();
            xhrRef.current = null;
            setDownloadProgress(null);
        }
    };

    const handleDownload = async (e: React.MouseEvent) => {
        if (!footerData.profilePdfUrl || footerData.profilePdfUrl === "#") return;
        
        e.preventDefault();

        // If already downloading, this click acts as a toggle or we can show a separate cancel button
        // For better UX, if it's already downloading and they click the main button again, we'll keep it downloading
        // but we'll add a cancel icon.
        if (downloadProgress !== null) return;

        setDownloadProgress(0);
        setIsSuccess(false);
        
        try {
            const xhr = new XMLHttpRequest();
            xhrRef.current = xhr;
            xhr.open("GET", footerData.profilePdfUrl, true);
            xhr.responseType = "blob";
            
            xhr.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setDownloadProgress(percent);
                }
            };
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    // Create a download URL with ?dl= for Sanity to force attachment
                    try {
                        const downloadUrl = new URL(footerData.profilePdfUrl!);
                        downloadUrl.searchParams.set("dl", "Monterial-Constructions-Profile.pdf");
                        
                        // Create hidden link and click it
                        const a = document.createElement("a");
                        a.href = downloadUrl.toString();
                        a.style.display = "none";
                        document.body.appendChild(a);
                        a.click();
                        
                        setTimeout(() => {
                            document.body.removeChild(a);
                        }, 1000);
                    } catch (err) {
                        // Fallback to basic window.open
                        window.open(footerData.profilePdfUrl!, "_blank");
                    }
                    
                    setIsSuccess(true);
                    xhrRef.current = null;
                    setTimeout(() => {
                        setDownloadProgress(null);
                        setIsSuccess(false);
                    }, 2000);
                } else {
                    setDownloadProgress(null);
                    xhrRef.current = null;
                }
            };
            
            xhr.onerror = () => {
                if (xhr.statusText !== "abort") {
                    window.open(footerData.profilePdfUrl, "_blank");
                }
                setDownloadProgress(null);
                xhrRef.current = null;
            };

            xhr.onabort = () => {
                setDownloadProgress(null);
                xhrRef.current = null;
            };
            
            xhr.send();
        } catch (error) {
            window.open(footerData.profilePdfUrl, "_blank");
            setDownloadProgress(null);
            xhrRef.current = null;
        }
    };

    return (
        <main className="pt-32 pb-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Prefetch PDF if URL is available */}
            {footerData.profilePdfUrl && (
                <link rel="prefetch" href={footerData.profilePdfUrl} />
            )}
            <div className="max-w-6xl mx-auto">
                
                {/* ── COMPANY PROFILE HEADER ── */}
                <ScrollReveal direction="down">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 md:mb-24 border-b border-slate-100 dark:border-slate-800 pb-12 md:pb-16 relative">
                        <div className="relative w-full md:w-auto">
                            <div className="flex items-center gap-3 mb-4">
                                 <svg width="28" height="24" viewBox="0 0 36 28" fill="none">
                                    <rect x="0" y="4" width="10" height="20" rx="3" transform="rotate(-10 0 4)" fill="#222" className="dark:fill-white" />
                                    <rect x="14" y="4" width="10" height="20" rx="3" transform="rotate(-10 14 4)" fill="#222" className="dark:fill-white" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-2">
                                {t("about_profile_title")}
                            </h1>
                            <div className="w-24 h-2 bg-brand-red rounded-full mt-4" />
                            
                            <button 
                                onClick={downloadProgress !== null ? handleCancel : handleDownload}
                                className="inline-flex items-center gap-3 mt-10 text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-red transition-all border-b-2 border-transparent hover:border-brand-red pb-1 group"
                            >
                                {downloadProgress !== null ? (
                                    <span className="flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                                        </span>
                                        {isAr ? "جاري التحميل" : "Downloading"} {downloadProgress}%
                                        <span className="ml-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] hover:bg-brand-red hover:text-white transition-all">
                                            {isAr ? "إلغاء" : "CANCEL"}
                                        </span>
                                    </span>
                                ) : (
                                    <>
                                        {t("about_download")}
                                        <span className="group-hover:translate-y-1 transition-transform">↓</span>
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {/* PDF ICON WITH INTEGRATED PROGRESS & CANCEL */}
                        <div className="flex flex-col items-end gap-4">
                            <button 
                                onClick={downloadProgress !== null ? handleCancel : handleDownload}
                                className="relative group cursor-pointer block"
                            >
                                <div className="absolute -inset-2 bg-brand-red rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>
                                <div className="relative glass border border-slate-200 dark:border-white/10 p-6 rounded-[2rem] flex flex-col items-center min-w-[120px] transition-all duration-500 group-hover:border-brand-red/30 overflow-hidden shadow-xl">
                                    
                                    <AnimatePresence mode="wait">
                                        {downloadProgress !== null ? (
                                            <motion.div 
                                                key="progress"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                className="relative w-16 h-16 flex items-center justify-center mb-2"
                                            >
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                    <circle 
                                                        cx="50" cy="50" r="45" 
                                                        fill="none" 
                                                        className="stroke-slate-100 dark:stroke-slate-800" 
                                                        strokeWidth="8" 
                                                    />
                                                    <motion.circle 
                                                        cx="50" cy="50" r="45" 
                                                        fill="none" 
                                                        className="stroke-brand-red" 
                                                        strokeWidth="8" 
                                                        strokeLinecap="round"
                                                        initial={{ strokeDasharray: "0 283" }}
                                                        animate={{ strokeDasharray: `${(downloadProgress / 100) * 283} 283` }}
                                                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {isSuccess ? (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-brand-red">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </motion.div>
                                                    ) : (
                                                        <div className="relative group/cancel">
                                                            <span className="text-[14px] font-black text-slate-900 dark:text-white group-hover/cancel:opacity-0 transition-opacity">
                                                                {downloadProgress}%
                                                            </span>
                                                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cancel:opacity-100 transition-opacity text-brand-red">
                                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="icon"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                            >
                                                <svg className="w-16 h-16 text-brand-red mb-2 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 16l-4-4h3V4h2v8h3l-4 4zm9-8h-3v1.4l1.6 1.6H21v6H3v-6h3.4l1.6-1.6V8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
                                                </svg>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
    
                                    <span className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mt-2">
                                        {downloadProgress !== null ? (isSuccess ? (isAr ? "اكتمل" : "DONE") : (isAr ? "إلغاء" : "CANCEL")) : "PDF"}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </header>
                </ScrollReveal>

                {/* ── ABOUT US SECTION ── */}
                <ScrollReveal direction="up" delay={0.2}>
                    <section className="bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 mb-20 md:mb-32 relative overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-brand-red/10 rounded-[2rem] md:rounded-[3rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                                <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-900/10 dark:border-white/10 shadow-2xl">
                                    <Image
                                        src="/construction_hero.png"
                                        alt="About Us"
                                        width={600}
                                        height={800}
                                        className="object-cover w-full h-[350px] md:h-[600px] transition-transform duration-1000 group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 600px"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <div className="inline-block relative">
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-premium">
                                        {t("about_us_title")}
                                    </h2>
                                    <div className="w-16 h-2 bg-brand-red rounded-full mt-3" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg md:text-xl font-light text-justify italic">
                                    {t("about_us_text1")}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light text-justify">
                                    {t("about_us_text2")}
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ── OUR VISION SECTION ── */}
                <ScrollReveal direction="up">
                    <section className="mb-24 md:mb-40">
                        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div className="space-y-8 order-2 lg:order-1">
                                <div className="inline-block relative">
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-premium">
                                        {t("about_vision_title")}
                                    </h2>
                                    <div className="w-16 h-2 bg-brand-red rounded-full mt-3" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xl md:text-2xl font-light">
                                    {t("about_vision_text")}
                                </p>
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="relative glass p-10 md:p-14 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-red/10 transition-colors" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-red text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-red/30 mb-8">
                                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11H12.017V9C12.017 7.34315 13.3601 6 15.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM4.017 21L4.017 18C4.017 16.8954 4.91243 16 6.017 16H9.017C9.56928 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56928 8 9.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V11H2.017V9C2.017 7.34315 3.36015 6 5.017 6H9.017C10.6739 6 12.017 7.34315 12.017 9V15C12.017 16.6569 10.6739 18 9.017 18H6.017V21H4.017Z"/>
                                            </svg>
                                        </div>
                                        <p className="text-slate-800 dark:text-slate-100 text-lg md:text-2xl italic leading-relaxed font-light">
                                            {t("about_vision_quote")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ── OUR GOALS SECTION ── */}
                <ScrollReveal direction="up">
                    <section className="text-center">
                        <div className="relative w-full h-[400px] md:h-[650px] rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl mb-16 md:mb-24 group">
                             <Image
                                src="/project2.png"
                                alt="Target and Goals"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 1400px"
                            />
                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
    
                        <div className="inline-block relative mb-16 md:mb-24">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-premium">
                                {t("about_goals_title")}
                            </h2>
                            <div className="w-16 h-2 bg-brand-red rounded-full mt-4 mx-auto" />
                        </div>
    
                        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
                            {[
                                { id: 1, text: t("about_goal1") },
                                { id: 2, text: t("about_goal2") },
                                { id: 3, text: t("about_goal3") }
                            ].map((goal, i) => (
                                <ScrollReveal key={goal.id} delay={i * 0.1} direction="up" distance={20}>
                                    <div className="flex flex-col items-center group">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-red text-white rounded-2xl flex items-center justify-center text-xl font-black mb-6 md:mb-8 shadow-xl shadow-brand-red/30 transition-all group-hover:scale-110 group-hover:rotate-6 duration-300">
                                            {goal.id}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed max-w-xs transition-colors group-hover:text-brand-red text-base md:text-lg tracking-tight">
                                            {goal.text}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

            </div>
        </main>
    );
}
