"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { client } from "../lib/sanity";

export interface Project {
    id: string; // Sanity uses string IDs (_id)
    title: string;
    titleAr?: string;
    slug: string;
    location: string;
    locationAr?: string;
    category: string;
    categoryAr?: string;
    description: string;
    descriptionAr?: string;
    image: string;
    seoKeywords: string;
}

interface ProjectContextType {
    projects: Project[];
    loading: boolean;
    updateProject: (updatedProject: Project) => void;
    addProject: (project: Omit<Project, "id">) => void;
    deleteProject: (id: string) => void;
    refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const query = `*[_type == "project"] | order(_createdAt desc) {
                "_id": _id,
                "title": title,
                "titleAr": titleAr,
                "slug": slug.current,
                "location": location,
                "locationAr": locationAr,
                "category": category,
                "categoryAr": categoryAr,
                "description": description,
                "descriptionAr": descriptionAr,
                "image": image,
                "seoKeywords": seoKeywords
            }`;
            const data = await client.fetch(query);
            
            const mappedProjects = data.map((p: any) => ({
                id: p._id,
                title: p.title || "",
                titleAr: p.titleAr || "",
                slug: p.slug || "",
                location: p.location || "",
                locationAr: p.locationAr || "",
                category: p.category || "",
                categoryAr: p.categoryAr || "",
                description: p.description || "",
                descriptionAr: p.descriptionAr || "",
                image: p.image || "/project1.png",
                seoKeywords: p.seoKeywords || ""
            }));

            setProjects(mappedProjects);
        } catch (error) {
            console.error("Error fetching projects from Sanity:", error);
            // Fallback to local storage or initial data if needed
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // These functions now might not be needed if editing via Sanity Studio, 
    // but we'll keep them for compatibility or local testing
    const updateProject = (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const addProject = (project: Omit<Project, "id">) => {
        const newProject = { ...project, id: Date.now().toString() };
        setProjects([newProject, ...projects]);
    };

    const deleteProject = (id: string) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    return (
        <ProjectContext.Provider value={{ 
            projects, 
            loading,
            updateProject, 
            addProject, 
            deleteProject,
            refreshProjects: fetchProjects 
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProjects must be used within a ProjectProvider");
    }
    return context;
}
