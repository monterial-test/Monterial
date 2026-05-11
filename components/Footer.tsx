"use client";

import React from "react";
import NextLink from "next/link";
import { useFooter } from "../context/FooterContext";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { footerData } = useFooter();
    const { t } = useLanguage();

    return (
        <footer className="bg-[#121212] text-white py-16 px-4 md:px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Card: Follow Us & Locations */}
                <div className="bg-[#1e1e1e] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/5 transition-transform hover:scale-[1.01] duration-500">
                    <h3 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-white/95">{t("footer_follow")}</h3>

                    <div className="flex gap-4 mb-14">
                        {[
                            { name: 'facebook', url: footerData.facebookUrl, path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                            { name: 'whatsapp', url: `https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}`, path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
                            { name: 'linkedin', url: footerData.linkedinUrl, path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
                        ].map((social) => (
                            <NextLink key={social.name} href={social.url} target="_blank" className="w-14 h-14 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-[#b91c1c] transition-all hover:scale-110 shadow-lg group">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-white transition-colors"><path d={social.path} /></svg>
                            </NextLink>
                        ))}
                    </div>

                    <div className="space-y-8 text-sm md:text-base text-gray-300">
                        {[
                            { label: t("footer_head_office"), text: t("footer_head_office_address"), url: footerData.headOfficeMapsUrl },
                            { label: t("footer_branch1"), text: t("footer_branch1_address"), url: footerData.branch1MapsUrl },
                            { label: t("footer_branch2"), text: t("footer_branch2_address"), url: footerData.branch2MapsUrl }
                        ].map((loc, i) => (
                            <NextLink key={i} href={loc.url || "#"} target="_blank" className="flex gap-5 group cursor-pointer transition-all hover:translate-x-2">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div className="text-start">
                                    <strong className="block text-white mb-1 font-bold text-lg">{loc.label} :</strong>
                                    <span className="group-hover:text-amber-500 transition-colors leading-relaxed underline hover:no-underline underline-offset-4 decoration-amber-500/30">{loc.text}</span>
                                </div>
                            </NextLink>
                        ))}

                        <div className="flex gap-5 group cursor-pointer pt-2">
                            <div className="shrink-0 w-6 h-6 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <div className="text-start">
                                <strong className="block text-white mb-1 font-bold text-lg">{t("footer_opening")} :</strong>
                                <span className="group-hover:text-white transition-colors">{t("footer_opening_hours")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Card: Contact Us */}
                <div className="bg-[#1e1e1e] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/5 flex flex-col transition-transform hover:scale-[1.01] duration-500">
                    <NextLink href="/contact" className="bg-[#b91c1c] text-white text-center py-5 rounded-3xl font-black text-2xl mb-12 shadow-xl hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
                        {t("footer_contact_btn")}
                    </NextLink>

                    <div className="space-y-6 flex-grow">
                        {[
                            { label: t("footer_whatsapp"), val: footerData.whatsapp, link: `https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}`, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
                            { label: t("footer_phone"), val: footerData.phone, link: `tel:${footerData.phone.replace(/\D/g, '')}`, icon: "M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM12 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" },
                            { label: t("footer_email"), val: footerData.email, link: `mailto:${footerData.email}`, icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }
                        ].map((item, idx) => (
                            <NextLink
                                key={idx}
                                href={item.link}
                                className="bg-[#181818] rounded-[2rem] p-6 md:p-8 border border-white/5 flex items-center gap-8 transition-all hover:bg-[#252525] hover:border-red-600/30 hover:scale-[1.02] active:scale-[0.98] group"
                            >
                                <div className="w-16 h-16 flex items-center justify-center shrink-0">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#b91c1c" className="group-hover:scale-110 transition-transform"><path d={item.icon} /></svg>
                                </div>
                                <div className="text-start">
                                    <div className="text-gray-500 text-xs md:text-sm mb-1 uppercase tracking-[0.2em] font-black">{item.label}</div>
                                    <div className={`font-black text-white/90 truncate ${item.val.includes('@') ? 'text-sm md:text-base lg:text-lg' : 'text-lg md:text-2xl'}`} dir="ltr">
                                        {item.val}
                                    </div>
                                </div>
                            </NextLink>
                        ))}
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
