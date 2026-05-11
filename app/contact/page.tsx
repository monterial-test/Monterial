"use client";

import { useFooter } from "../../context/FooterContext";
import { useState } from "react";
import { submitInquiry } from "../../lib/actions";

export default function ContactPage() {
    const { footerData } = useFooter();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isHuman, setIsHuman] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isHuman) {
            setError("Please verify that you are not a robot.");
            return;
        }
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            type: formData.get("type") as string,
            message: formData.get("message") as string,
        };

        const result = await submitInquiry(data);
        
        if (result.success) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        } else {
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <main className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="max-w-2xl mb-20">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter dark:text-white mb-6">
                        Get <span className="text-amber-500">In Touch</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">
                        Ready to start your next landmark project? Reach out to our engineering team or visit one of our corporate offices.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Contact Details */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Global Headquarters</h2>
                            <div className="space-y-2">
                                <p className="text-xl font-bold dark:text-white">{footerData.headOffice}</p>
                                <p className="text-slate-500">{footerData.email}</p>
                                <p className="text-amber-600 font-bold">{footerData.phone}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Business Hours</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 font-light">{footerData.openingHours}</p>
                        </div>

                        <div className="p-8 bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-white font-bold mb-4">Direct WhatsApp Support</h3>
                                <p className="text-slate-400 text-sm mb-6 font-light italic">Connect with an engineer instantly for project inquiries.</p>
                                <a
                                    href={`https://wa.me/${footerData.whatsapp}`}
                                    target="_blank"
                                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase hover:bg-green-500 transition-colors"
                                >
                                    Start Chat →
                                </a>
                            </div>
                            <div className="absolute -right-4 -bottom-4 text-8xl grayscale opacity-20 filter blur-sm group-hover:scale-110 transition-transform">💬</div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg shadow-green-500/20">✓</div>
                                <h3 className="text-2xl font-bold dark:text-white mb-2 italic uppercase">Message Received</h3>
                                <p className="text-slate-500">Our engineering representatives will contact you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                                        <input name="name" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white transition-all shadow-sm" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
                                        <input name="email" required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white transition-all shadow-sm" placeholder="john@company.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Inquiry Type</label>
                                    <select name="type" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white transition-all shadow-sm appearance-none cursor-pointer">
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Project Tender">Project Tender</option>
                                        <option value="Infrastructure Consulting">Infrastructure Consulting</option>
                                        <option value="Vendor Partnership">Vendor Partnership</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Message</label>
                                    <textarea name="message" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white transition-all h-32 shadow-sm" placeholder="Describe your project requirements..."></textarea>
                                </div>

                                {/* CAPTCHA / Verification Section */}
                                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl flex items-center justify-between border border-slate-200 dark:border-slate-700 shadow-sm group">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                if(isHuman) return;
                                                setLoading(true);
                                                setTimeout(() => {
                                                    setLoading(false);
                                                    setIsHuman(true);
                                                    setError("");
                                                }, 1000);
                                            }}
                                            className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${isHuman ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' : 'bg-white border-slate-300 hover:border-amber-500 dark:bg-slate-900 dark:border-slate-600'}`}
                                        >
                                            {loading && !isHuman ? (
                                                <div className="w-4 h-4 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
                                            ) : isHuman ? (
                                                <svg className="w-5 h-5 text-white animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            ) : null}
                                        </button>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-amber-500 transition-colors cursor-default">I am human / أنا لست روبوت</span>
                                            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Security Verification</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Monterial Security">
                                        <span className="text-[10px] font-black tracking-widest uppercase text-amber-500">Secured</span>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-xs font-bold text-center uppercase animate-in fade-in slide-in-from-bottom-2">{error}</p>}
                                <button disabled={loading} type="submit" className="w-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-amber-500/10 active:scale-[0.99] transition-all disabled:opacity-50">
                                    {loading && isHuman ? "Sending..." : "Deliver Message →"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
