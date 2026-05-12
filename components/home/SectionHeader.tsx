import React from "react";

export function SectionHeader({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className="text-center mb-10 md:mb-16 group">
      <div className="flex justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 duration-500">
        <svg width="40" height="30" className="md:w-12 md:h-9" viewBox="0 0 36 28" fill="none">
          <rect x="0" y="4" width="10" height="20" rx="3" transform="rotate(-10 0 4)" fill={light ? "#fff" : "#222"} />
          <rect x="14" y="4" width="10" height="20" rx="3" transform="rotate(-10 14 4)" fill={light ? "#fff" : "#222"} />
        </svg>
      </div>
      <div className="relative inline-block px-4">
        <h2 className={`text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-4 ${light ? "text-white" : "text-slate-900"}`}>
          {title}
        </h2>
        <div className="w-1/2 md:w-full h-1 bg-red-600 rounded-full transition-all duration-700 group-hover:w-3/4 mx-auto" />
      </div>
    </div>
  );
}
