"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../../../context/FooterContext";
import { uploadCompanyProfile, updateSiteSettings } from "../../../lib/admin-actions";
import { useLanguage } from "../../../context/LanguageContext";

export default function AdminDashboard() {
    const { footerData } = useFooter();
    const { t } = useLanguage();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading', msg: string } | null>(null);

    // Form states
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (footerData) {
            setEmail(footerData.email);
            setPhone(footerData.phone);
        }
    }, [footerData]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check for demonstration (In production use NextAuth)
        if (password === "Admin@Monterial2026") {
            setIsLoggedIn(true);
            setStatus(null);
        } else {
            setStatus({ type: 'error', msg: 'Incorrect Password' });
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus({ type: 'loading', msg: 'Uploading PDF...' });
        const result = await uploadCompanyProfile(file);

        if (result.success) {
            setStatus({ type: 'success', msg: 'Profile PDF updated successfully!' });
        } else {
            setStatus({ type: 'error', msg: result.error || 'Upload failed' });
        }
    };

    const handleUpdateInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', msg: 'Updating info...' });
        
        const result = await updateSiteSettings({ email, phone });
        
        if (result.success) {
            setStatus({ type: 'success', msg: 'Settings updated successfully!' });
        } else {
            setStatus({ type: 'error', msg: result.error || 'Update failed' });
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-red-600/20">
                            <span className="text-white font-black text-2xl">M</span>
                        </div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-widest">Admin Access</h1>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input 
                            type="password" 
                            placeholder="Enter Admin Password" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:border-red-600 outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-red-600/20">
                            Login
                        </button>
                        {status?.type === 'error' && <p className="text-red-500 text-center text-sm font-bold">{status.msg}</p>}
                    </form>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-2 italic">
                            Monterial <span className="text-red-600">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 font-light tracking-wide uppercase text-xs">Manage your company presence</p>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-600 text-xs font-black uppercase tracking-widest transition-colors">
                        Logout →
                    </button>
                </header>

                {/* Status Bar */}
                {status && (
                    <div className={`mb-8 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${
                        status.type === 'loading' ? 'bg-amber-100 text-amber-700' : 
                        status.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                        <div className={`w-2 h-2 rounded-full ${
                            status.type === 'loading' ? 'bg-amber-500 animate-pulse' : 
                            status.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        <span className="font-bold text-sm">{status.msg}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* PDF Upload Section */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                             <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                             </div>
                             Company Profile
                        </h2>
                        <p className="text-slate-500 text-sm mb-8 font-light">Upload a new PDF to update the profile document on the website.</p>
                        
                        <label className="block">
                            <div className="relative group cursor-pointer">
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 group-hover:border-red-600/50 rounded-[2rem] p-12 text-center transition-all">
                                    <svg className="w-10 h-10 text-slate-300 group-hover:text-red-600 mx-auto mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Select PDF File</span>
                                </div>
                                <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                            </div>
                        </label>
                    </div>

                    {/* Contact Info Section */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                             <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                             </div>
                             Quick Contact
                        </h2>
                        <form onSubmit={handleUpdateInfo} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-sm outline-none focus:border-red-600 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-sm outline-none focus:border-red-600 transition-all"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest py-4 rounded-2xl transition-all hover:bg-red-600 hover:text-white border border-transparent shadow-lg active:scale-95">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-12 p-8 bg-red-600 rounded-[2.5rem] text-white flex items-center justify-between shadow-2xl shadow-red-600/20">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
                        <div>
                            <h3 className="font-black uppercase tracking-widest text-sm">Need to manage projects?</h3>
                            <p className="text-white/60 text-xs font-light">Use the full Sanity Studio for advanced content management.</p>
                        </div>
                    </div>
                    <a href="/admin/studio" className="bg-white text-red-600 text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:scale-105 transition-all">
                        Open Studio
                    </a>
                </div>
            </div>
        </main>
    );
}
