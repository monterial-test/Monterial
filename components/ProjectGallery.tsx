'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectGalleryProps {
  images: any[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }, [selectedIndex, images.length])

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }, [selectedIndex, images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, showNext, showPrev])

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {images.map((img: any, idx: number) => (
          <div 
            key={idx} 
            className="relative h-80 rounded-[2rem] overflow-hidden group cursor-zoom-in bg-slate-100 dark:bg-slate-800"
            onClick={() => setSelectedIndex(idx)}
          >
            <Image
              src={urlFor(img).width(800).format('webp').quality(80).url()}
              alt={`${title} gallery ${idx}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">View Full Image</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-10 right-10 text-white hover:text-amber-500 transition-colors z-20"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={40} strokeWidth={1} />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-amber-500 transition-all z-20 p-2 hover:bg-white/5 rounded-full"
                onClick={showPrev}
              >
                <ChevronLeft size={60} strokeWidth={1} />
              </button>
              <button 
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-amber-500 transition-all z-20 p-2 hover:bg-white/5 rounded-full"
                onClick={showNext}
              >
                <ChevronRight size={60} strokeWidth={1} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] z-20">
            {selectedIndex + 1} / {images.length}
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
            <Image
              src={urlFor(images[selectedIndex]).width(1920).format('webp').quality(85).url()}
              alt={title}
              fill
              className="object-contain animate-in zoom-in-95 duration-300"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
