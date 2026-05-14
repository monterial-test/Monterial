"use client";

import React from "react";
import NextLink from "next/link";
import { useFooter } from "../context/FooterContext";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { footerData } = useFooter();
    const { t, language } = useLanguage();

    return (
        <footer 
            className="bg-[#121212] text-white py-16 px-4 md:px-6 relative"
            dir={t("rights_reserved").includes("جميع") ? "rtl" : "ltr"}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Column 1: About & Social */}
                <div className="space-y-8">
                    <div className="relative h-16 w-48">
                         <NextLink href="/">
                            <img src="/Logo.webp" alt="Logo" className="object-contain h-full w-auto" />
                         </NextLink>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {language === "ar" 
                          ? "مونتريال للإنشاءات: شركة رائدة في الحلول الهندسية والبنية التحتية منذ عام 2010. نبني المستقبل بإرث من الجودة."
                          : "Monterial Construction: A leader in engineering solutions and infrastructure since 2010. Building the future with a legacy of quality."}
                    </p>
                    <div className="flex gap-4">
                        {[
                            { name: 'facebook', url: footerData.facebookUrl, path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                            { name: 'linkedin', url: footerData.linkedinUrl, path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
                        ].map((social) => (
                            <NextLink key={social.name} href={social.url} target="_blank" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                            </NextLink>
                        ))}
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 border-l-4 border-red-600 pl-4">
                        {language === "ar" ? "روابط سريعة" : "Quick Links"}
                    </h4>
                    <ul className="space-y-4 text-gray-400 text-sm font-bold">
                        {['home', 'about', 'services', 'projects', 'contact'].map((link) => (
                            <li key={link}>
                                <NextLink href={link === 'home' ? '/' : `/${link}`} className="hover:text-red-600 transition-colors uppercase">
                                    {t(`header_${link}`)}
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact Details */}
                <div className="lg:col-span-2">
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 border-l-4 border-red-600 pl-4">
                        {language === "ar" ? "اتصل بنا" : "Contact Us"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {[
                                { label: t("footer_whatsapp"), val: footerData.whatsapp, link: `https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}` },
                                { label: t("footer_phone"), val: footerData.phone, link: `tel:${footerData.phone.replace(/\D/g, '')}` },
                                { label: t("footer_email"), val: footerData.email, link: `mailto:${footerData.email}` }
                            ].map((item, idx) => (
                                <NextLink key={idx} href={item.link} className="flex flex-col group">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">{item.label}</span>
                                    <span className="text-white group-hover:text-red-600 transition-colors font-bold break-all">{item.val}</span>
                                </NextLink>
                            ))}
                        </div>
                        <div className="space-y-6">
                             {[
                                { label: t("footer_head_office"), text: t("footer_head_office_address") },
                                { label: t("footer_branch1"), text: t("footer_branch1_address") }
                            ].map((loc, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">{loc.label}</span>
                                    <span className="text-gray-400 text-xs leading-relaxed">{loc.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-20 text-xs md:text-sm text-gray-500 font-bold uppercase tracking-[0.3em]">
                {t("rights_reserved")} <span className="text-white">{t("company_name")}</span> &copy; {new Date().getFullYear()}
            </div>

            {/* Floating WhatsApp Button */}
            <NextLink
                href={`https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                aria-label="Chat with us on WhatsApp"
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group flex items-center gap-4 active:scale-90 transition-transform"
            >
                <span className="bg-white text-black px-5 py-2 rounded-full text-xs font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">{t("footer_contact_btn")}</span>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.6)] transition-all">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
            </NextLink>
        </footer>
    );
}
