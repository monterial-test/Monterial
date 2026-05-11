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
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 md:mb-20 border-b border-slate-100 dark:border-slate-800 pb-8 md:pb-12 relative">
                    <div className="relative w-full md:w-auto">
                        <div className="flex items-center gap-3 mb-2">
                             <svg width="24" height="20" viewBox="0 0 36 28" fill="none">
                                <rect x="0" y="4" width="10" height="20" rx="3" transform="rotate(-10 0 4)" fill="#222" className="dark:fill-white" />
                                <rect x="14" y="4" width="10" height="20" rx="3" transform="rotate(-10 14 4)" fill="#222" className="dark:fill-white" />
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
                            {t("about_profile_title")}
                        </h1>
                        <div className="w-full h-1.5 bg-red-600 rounded-full mt-2" />
                        
                        <button 
                            onClick={downloadProgress !== null ? handleCancel : handleDownload}
                            className="inline-flex items-center gap-3 mt-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-red-600 transition-all border-b-2 border-transparent hover:border-red-600 pb-1 group"
                        >
                            {downloadProgress !== null ? (
                                <span className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                    </span>
                                    {isAr ? "جاري التحميل" : "Downloading"} {downloadProgress}%
                                    <span className="ml-2 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[9px] hover:bg-red-600 hover:text-white transition-colors">
                                        {isAr ? "إلغاء" : "CANCEL"}
                                    </span>
                                </span>
                            ) : (
                                <>
                                    {t("about_download")}
                                    <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
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
                            <div className="absolute -inset-1 bg-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex flex-col items-center min-w-[100px] transition-all duration-500 group-hover:border-red-600/30 overflow-hidden">
                                
                                <AnimatePresence mode="wait">
                                    {downloadProgress !== null ? (
                                        <motion.div 
                                            key="progress"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            className="relative w-14 h-14 flex items-center justify-center mb-1"
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
                                                    className="stroke-red-600" 
                                                    strokeWidth="8" 
                                                    strokeLinecap="round"
                                                    initial={{ strokeDasharray: "0 283" }}
                                                    animate={{ strokeDasharray: `${(downloadProgress / 100) * 283} 283` }}
                                                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {isSuccess ? (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-600">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                ) : (
                                                    <div className="relative group/cancel">
                                                        {/* Show percentage by default, show X on hover */}
                                                        <span className="text-[12px] font-black text-slate-900 dark:text-white group-hover/cancel:opacity-0 transition-opacity">
                                                            {downloadProgress}%
                                                        </span>
                                                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cancel:opacity-100 transition-opacity text-red-600">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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
                                            <svg className="w-14 h-14 text-red-600 mb-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 16l-4-4h3V4h2v8h3l-4 4zm9-8h-3v1.4l1.6 1.6H21v6H3v-6h3.4l1.6-1.6V8H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
                                            </svg>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mt-1">
                                    {downloadProgress !== null ? (isSuccess ? (isAr ? "اكتمل" : "DONE") : (isAr ? "إلغاء" : "CANCEL")) : "PDF"}
                                </span>

                                {/* Bottom Glow when loading */}
                                {downloadProgress !== null && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)]" style={{ width: `${downloadProgress}%` }} />
                                )}
                            </div>
                        </button>
                    </div>
                </header>

                {/* ── ABOUT US SECTION ── */}
                <section className="bg-slate-100 dark:bg-slate-900/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 mb-20 md:mb-32 relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* Image Container with "Frame" */}
                        <div className="relative">
                            <div className="relative z-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:shadow-[15px_15px_0px_0px_rgba(15,23,42,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] md:shadow-[15px_15px_0px_0px_rgba(255,255,255,0.05)]">
                                <Image
                                    src="/construction_hero.png"
                                    alt="About Us"
                                    width={600}
                                    height={800}
                                    className="object-cover w-full h-[300px] md:h-[500px]"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 600px"
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4 md:space-y-6">
                            <div className="inline-block relative">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                    {t("about_us_title")}
                                </h2>
                                <div className="w-full h-1 bg-red-600 rounded-full mt-1" />
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg font-light text-justify">
                                {t("about_us_text1")}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg font-light text-justify">
                                {t("about_us_text2")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── OUR VISION SECTION ── */}
                <section className="mb-20 md:mb-32">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <div className="inline-block relative">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                    {t("about_vision_title")}
                                </h2>
                                <div className="w-full h-1 bg-red-600 rounded-full mt-1" />
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg md:text-xl font-light">
                                {t("about_vision_text")}
                            </p>
                        </div>

                        {/* Quote Box */}
                        <div className="order-1 lg:order-2">
                            <div className="relative bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] md:shadow-[10px_10px_0px_0px_rgba(220,38,38,1)]">
                                <div className="absolute -top-6 left-8 md:left-10 w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11H12.017V9C12.017 7.34315 13.3601 6 15.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM4.017 21L4.017 18C4.017 16.8954 4.91243 16 6.017 16H9.017C9.56928 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56928 8 9.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V11H2.017V9C2.017 7.34315 3.36015 6 5.017 6H9.017C10.6739 6 12.017 7.34315 12.017 9V15C12.017 16.6569 10.6739 18 9.017 18H6.017V21H4.017Z"/>
                                    </svg>
                                </div>
                                <p className="text-slate-800 dark:text-slate-100 text-base md:text-lg italic leading-relaxed">
                                    {t("about_vision_quote")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── OUR GOALS SECTION ── */}
                <section className="text-center">
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 md:border-4 border-slate-900 dark:border-white shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] md:shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] mb-12 md:mb-20 group">
                         <Image
                            src="/project2.png"
                            alt="Target and Goals"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div className="inline-block relative mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                            {t("about_goals_title")}
                        </h2>
                        <div className="w-full h-1 bg-red-600 rounded-full mt-2" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { id: 1, text: t("about_goal1") },
                            { id: 2, text: t("about_goal2") },
                            { id: 3, text: t("about_goal3") }
                        ].map((goal) => (
                            <div key={goal.id} className="flex flex-col items-center group">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-black mb-4 md:mb-6 shadow-lg shadow-red-600/30 transition-transform group-hover:scale-125 duration-300">
                                    {goal.id}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed max-w-xs transition-colors group-hover:text-red-600 text-sm md:text-base">
                                    {goal.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
