"use client";

import { useFooter } from "../context/FooterContext";
import { useProjects } from "../context/ProjectContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { verifyAdminPassword, logout } from "../lib/auth-actions";
import { z } from "zod";
import { urlFor } from "../lib/sanity";

const projectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug is required"),
    category: z.string().min(2, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().min(1, "Please upload an image"),
    seoKeywords: z.string().optional()
});

interface AdminDashboardProps {
    initiallyAuthenticated: boolean;
}

export default function AdminDashboard({ initiallyAuthenticated }: AdminDashboardProps) {
    const { footerData, updateFooterData } = useFooter();
    const [formData, setFormData] = useState(footerData);
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [isAuthenticated, setIsAuthenticated] = useState(initiallyAuthenticated);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setError("");

        try {
            const result = await verifyAdminPassword(password);
            if (result.success) {
                setIsAuthenticated(true);
            } else {
                setError(result.error || "Access Denied");
            }
        } catch (err) {
            setError("Authentication failed");
        } finally {
            setLoginLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl text-center space-y-8">
                    <div className="relative h-24 w-full mx-auto mb-4">
                        <Image src="/Logo.webp" alt="Logo" fill className="object-contain" priority />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">Admin <span className="text-red-600">Access</span></h1>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Key..."
                            className="w-full bg-slate-900 border-none rounded-2xl px-6 py-4 text-sm text-white focus:ring-2 focus:ring-red-600 outline-none text-center"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>}
                        <button disabled={loginLoading} className="w-full bg-red-600 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50">
                            {loginLoading ? "Verifying..." : "Unlock Dashboard"}
                        </button>
                    </form>
                    <div className="pt-4">
                        <Link href="/" className="text-[10px] font-black uppercase text-slate-600 hover:text-red-600">Return to public site</Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("saving");
        updateFooterData(formData);
        setTimeout(() => {
            setStatus("saved");
            setTimeout(() => setStatus("idle"), 2000);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic">
                            Admin <span className="text-red-600">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 mt-2">Manage your company website content.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest">
                            View Site →
                        </Link>
                        <button onClick={handleLogout} className="text-xs font-black text-red-500 border border-red-500/20 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase">
                            Logout
                        </button>
                    </div>
                </header>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-amber-600 dark:text-amber-500 font-bold uppercase text-xs tracking-widest mb-1">New CMS Integrated</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">You can now manage projects with images and rich text via Sanity Studio.</p>
                    </div>
                    <Link href="/admin/studio/" target="_blank" className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:scale-105 transition-transform shadow-lg">
                        Open Sanity Studio 🚀
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">🏗️</span>
                            Corporate Locations
                        </h2>
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Head Office</label>
                                <textarea name="headOffice" value={formData.headOffice} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white h-20" />
                            </div>
                            {/* Branch 1 and 2 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Branch 1</label>
                                    <textarea name="branch1" value={formData.branch1} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white h-20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Branch 2</label>
                                    <textarea name="branch2" value={formData.branch2} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none dark:text-white h-20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <AdminProjectsSection />

                    <button type="submit" disabled={status === "saving"} className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800 text-slate-950 px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
                        {status === "saving" ? "Saving..." : status === "saved" ? "✓ Saved Success" : "Save General Settings"}
                    </button>
                </form>
            </div>
        </div>
    );
}

function AdminProjectsSection() {
    const { projects, updateProject, addProject, deleteProject } = useProjects();
    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({
        title: "",
        slug: "",
        location: "",
        category: "Commercial",
        description: "",
        image: "",
        seoKeywords: ""
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, projectId?: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (isNew) setNewProject({ ...newProject, image: base64String });
                else if (projectId) {
                    const proj = projects.find(p => p.id === projectId);
                    if (proj) updateProject({ ...proj, image: base64String });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold flex items-center gap-3">
                    <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">🏙️</span>
                    Projects Management (Legacy/Local)
                </h2>
                <div className="flex gap-3">
                    <button type="button" onClick={() => setIsAdding(!isAdding)} className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                        {isAdding ? "Cancel" : "+ Local Draft"}
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] mb-12 border border-amber-500/20 space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Project Title</label>
                                <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none dark:text-white shadow-sm" value={newProject.title} onChange={e => {
                                    const val = e.target.value;
                                    setNewProject({ ...newProject, title: val, slug: val.toLowerCase().replace(/ /g, '-') });
                                }} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Slug (URL)</label>
                                <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none dark:text-white shadow-sm" value={newProject.slug} onChange={e => setNewProject({ ...newProject, slug: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Category</label>
                                    <input className="bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none w-full dark:text-white shadow-sm" value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block ml-2 text-left">Image</label>
                                    <label className="w-full h-[46px] flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-amber-500 transition-colors group">
                                        <span className="text-[10px] font-black uppercase">Upload</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, true)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Description</label>
                                <textarea className="bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm outline-none w-full h-32 dark:text-white shadow-sm" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={() => { 
                        const result = projectSchema.safeParse(newProject);
                        if (!result.success) {
                            const errorMsg = result.error.issues.map(i => i.message).join(", ");
                            setFieldErrors({ error: errorMsg });
                            return;
                        }
                        addProject(newProject as any); 
                        setIsAdding(false);
                        setFieldErrors({});
                        setNewProject({ title: "", slug: "", location: "", category: "Commercial", description: "", image: "", seoKeywords: "" });
                    }} className="bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl text-[11px] font-black uppercase w-full hover:bg-amber-600 shadow-lg">
                        Publish Project (Local Draft)
                    </button>
                    {fieldErrors.error && <p className="text-red-500 text-center text-[10px] font-bold mt-4 uppercase max-w-xs mx-auto leading-relaxed">{fieldErrors.error}</p>}
                </div>
            )}

            <div className="space-y-4">
                {projects.map((project) => (
                    <ProjectItem key={project.id} project={project} onUpdate={updateProject} onDelete={deleteProject} />
                ))}
            </div>
        </div>
    );
}

function ProjectItem({ project, onUpdate, onDelete }: { project: any, onUpdate: any, onDelete: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const [temp, setTemp] = useState({ ...project });

    if (isEditing) {
        return (
            <div className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[2rem] border border-amber-500/10 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-2 block">Title</label>
                        <input className="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white" value={temp.title} onChange={e => setTemp({ ...temp, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-1 ml-2 block">Description</label>
                        <textarea className="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs h-24 dark:text-white" value={temp.description} onChange={e => setTemp({ ...temp, description: e.target.value })} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={() => { onUpdate(temp); setIsEditing(false); }} className="bg-amber-500 text-slate-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase flex-grow">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-8 py-3 rounded-2xl text-[10px] font-black uppercase">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/20 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-all shadow-sm">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 relative rounded-2xl overflow-hidden shrink-0 shadow-lg border border-stone-200 bg-slate-100 dark:bg-slate-800">
                    <Image 
                        src={typeof project.image === 'string' ? (project.image || "/project1.png") : urlFor(project.image).width(200).url()} 
                        alt={project.title} 
                        fill 
                        className="object-contain p-2" 
                    />
                </div>
                <div>
                    <h4 className="font-black text-xl dark:text-white tracking-tight">{project.title}</h4>
                    <p className="text-xs text-slate-500">{project.category}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={() => setIsEditing(true)} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 w-24 py-2 rounded-xl text-[10px] font-black uppercase text-amber-600 hover:bg-amber-500 hover:text-white transition-all">Edit</button>
                <button type="button" onClick={() => onDelete(project.id)} className="w-24 py-2 rounded-xl text-[10px] font-black uppercase text-red-600 hover:bg-red-50 transition-colors">Delete</button>
            </div>
        </div>
    );
}
