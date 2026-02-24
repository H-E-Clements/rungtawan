"use client";

import React, { useRef } from 'react'; // 1. Import useRef
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: Icon library

function Services() {
    const scrollRef = useRef(null); // 2. Create the ref

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 400; // Adjust based on card width
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div 
            id="services"
            className="my-10 bg-gradient-to-br from-emerald-900 via-emerald-900 to-emerald-900 pt-6 relative group"
        >
            <h1 className="flex items-center text-center my-8 font-bold text-4xl px-16">
                <span className="grow h-px bg-white opacity-70"></span>
                <span className="px-4 text-white">Our Services</span>
                <span className="grow h-px bg-white opacity-70"></span>
            </h1>

            {/* Navigation Buttons */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={32} />
            </button>

            <button 
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={32} />
            </button>

            {/* 3. Attach the ref and add scroll-smooth */}
            <div 
                ref={scrollRef}
                className="flex flex-nowrap gap-6 overflow-x-auto h-160 items-center p-12 scroll-smooth no-scrollbar"
            >
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        {...service} // Short-hand if props match keys
                    />
                ))}
            </div>
        </div>
    );
}

export default Services;
