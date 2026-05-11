"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ar" : "en");
    };

    const navLinks = [
        { name: t("header_home"), href: "/" },
        { name: t("header_about"), href: "/about" },
        { name: t("header_services"), href: "/services" },
        { name: t("header_projects"), href: "/projects" },
        { name: t("header_contact"), href: "/contact", special: true },
    ];

    const socialIcons = [
        { name: 'facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
        { name: 'whatsapp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347' },
        { name: 'linkedin', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
    ];

    return (
        <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
            <nav className="max-w-[1400px] mx-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border border-white/20 md:rounded-[100px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-5 md:px-8 h-16 md:h-24 flex items-center justify-between pointer-events-auto transition-all duration-500 relative">
                
                {/* Logo */}
                <NextLink href="/" className="relative h-10 md:h-16 w-32 md:w-[180px] flex-none transition-transform hover:scale-105 active:scale-95 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                    <NextImage
                        src="/Logo.png"
                        alt="Monterial Constructions Logo"
                        fill
                        sizes="(max-width: 768px) 128px, 180px"
                        className="object-contain"
                        priority
                        loading="eager"
                    />
                </NextLink>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-3">
                    {navLinks.map((link) => (
                        <NextLink
                            key={link.name}
                            href={link.href}
                            className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${link.special
                                ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                : "border-slate-800 dark:border-white/30 text-slate-800 dark:text-white hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-black"
                                }`}
                        >
                            {link.name}
                        </NextLink>
                    ))}

                    {/* Language Selector */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-800 dark:border-white/30 text-slate-800 dark:text-white text-[11px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                        {t("header_lang")}
                        <span className="text-[8px] transform transition-transform duration-300 group-hover:rotate-180">
                            {language === "en" ? "▼" : "▲"}
                        </span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full border border-slate-800 dark:border-white/30 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>

                {/* Social Icons - Desktop */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                    {socialIcons.map((social) => (
                        <button key={social.name} className="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-neutral-800 shadow-md">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button & Quick Actions */}
                <div className="flex lg:hidden items-center gap-2">
                    <button
                        onClick={toggleLanguage}
                        className="w-8 h-8 rounded-full border border-slate-800 dark:border-white/30 flex items-center justify-center text-slate-800 dark:text-white text-[10px] font-bold uppercase"
                    >
                        {language === "en" ? "AR" : "EN"}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 rounded-full border border-slate-800 dark:border-white/30 flex items-center justify-center text-slate-800 dark:text-white"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-800 dark:text-white ml-1"
                    >
                        {isMobileMenuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        )}
                    </button>
                </div>

            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-white/20 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 pointer-events-auto origin-top animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NextLink
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all ${link.special
                                    ? "bg-red-600 text-white"
                                    : "bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white"
                                    }`}
                            >
                                {link.name}
                            </NextLink>
                        ))}
                    </div>

                    <div className="h-px w-full bg-slate-200 dark:bg-white/10 my-2"></div>

                    <div className="flex justify-center gap-4">
                        {socialIcons.map((social) => (
                            <button key={social.name} className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
