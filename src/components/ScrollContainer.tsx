"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollContainer({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 344;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-emerald-800 p-2 rounded-full text-white"><ChevronLeft size={32} /></button>
            <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-emerald-800 p-2 rounded-full text-white"><ChevronRight size={32} /></button>

            <div ref={scrollRef} className="flex flex-nowrap gap-6 overflow-x-auto p-12 scroll-smooth no-scrollbar">
                {children}
            </div>
        </>
    );
}