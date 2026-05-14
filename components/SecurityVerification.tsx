"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function SecurityVerification({ children }: { children: React.ReactNode }) {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const verified = sessionStorage.getItem("monterial_verified");
        if (verified === "true") {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, []);

    const handleVerify = () => {
        sessionStorage.setItem("monterial_verified", "true");
        setIsVerified(true);
    };

    if (isVerified === null) return null;

    return (
        <>
            <AnimatePresence>
                {!isVerified && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 px-6 overflow-hidden"
                    >
                        {/* Animated Background Elements */}
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>

                        <div className="relative z-10 max-w-md w-full">
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl text-center space-y-8">
                                {/* Logo Decoration */}
                                <div className="relative h-24 w-full mx-auto mb-4">
                                    <NextImage
                                        src="/Logo.webp"
                                        alt="Monterial Constructions Logo"
                                        fill
                                        sizes="(max-width: 768px) 250px, 400px"
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                        {t("verify_title").split(" ")[0]} <span className="text-amber-500">{t("verify_title").split(" ")[1]}</span>
                                    </h1>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                                        {t("verify_desc")}
                                    </p>
                                </div>

                                <button
                                    onClick={handleVerify}
                                    className="w-full group relative bg-amber-500 text-slate-950 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-500/20"
                                >
                                    <span className="relative z-10">{t("verify_btn")}</span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                                </button>

                                <div className="pt-4 flex items-center gap-2 justify-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{t("global_encrypted")}</span>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest">
                                    Monterial Constructions & Engineering Group © 2026
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {isVerified && (
                <div className="contents animate-in fade-in duration-1000">
                    {children}
                </div>
            )}
        </>
    );
}
