import React from 'react'
import Button from "@/components/Button";
import ChevronButton from "@/components/Button";

const SvgFilter = () => (
    <svg width="0" height="0" className="absolute">
        <defs>
            <clipPath id="asymmetricCurve" clipPathUnits="objectBoundingBox">
                <path d="M0,0 H1 V0.85 C0.7,1 0.3,0.8 0,0.8 V0 Z" />
            </clipPath>
        </defs>
    </svg>
);

function Hero() {
    return (
        <>
            <SvgFilter />
            <section className="hero-section">
                <video autoPlay muted loop playsInline className="bg-video">
                    <source src="/videos/hero-massage.mp4" type="video/mp4"/>
                </video>
                <div className="relative z-10 flex flex-col gap-6 h-full pb-24 items-center justify-center w-full pt-24 text-white text-center font-medium">
                    <p className="text-xl font-medium">Welcome to</p>
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">
                        Rungtawan Authentic Thai Therapy
                    </h1>
                    <div className={"mt-auto"}>
                        <Button text="View Services"/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;