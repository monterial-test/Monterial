"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark"); // Default to dark as per construction theme

    useEffect(() => {
        const savedTheme = localStorage.getItem("monterial_theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("monterial_theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        // Flash the screen on toggle for strong visual feedback
        const flash = document.createElement("div");
        flash.style.cssText = `
            position:fixed; inset:0; z-index:99999; pointer-events:none;
            background:${theme === "dark" ? "#ffffff" : "#020617"};
            animation: theme-flash-anim 0.35s ease forwards;
        `;
        const style = document.createElement("style");
        style.textContent = `@keyframes theme-flash-anim { 0%{opacity:0.18} 100%{opacity:0} }`;
        document.head.appendChild(style);
        document.body.appendChild(flash);
        setTimeout(() => { flash.remove(); style.remove(); }, 360);

        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
