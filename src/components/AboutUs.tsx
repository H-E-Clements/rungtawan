import React from 'react';
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";



async function AboutUs({ settings } : { settings: any }) {
    return (
        <section
            id="about"
            className="w-full py-12 md:py-24 px-6 flex justify-center items-center overflow-hidden">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Images Container */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-[400px] h-[350px] md:h-[450px]">
                        {settings?.aboutImage ? (
                            <Image
                                src={urlFor(settings.aboutImage).url()}
                                alt="Image of Kung Rungtawan"
                                fill
                                className="object-cover rounded-2xl shadow-2xl"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-6 tracking-tight">
                        {settings?.aboutTitle || "Who are we?"}
                    </h1>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
                        {settings?.aboutDescription ? (
                            <p className="whitespace-pre-line">
                                {settings.aboutDescription}
                            </p>
                        ) : (
                            <>
                                <p>Traditional Thai massage is an ancient healing art that has been practised in Thailand for centuries. It focuses on releasing tension, improving flexibility, and restoring the body’s natural balance through rhythmic pressure and guided movement.</p>
                                <p>Our therapist trained in Thailand, where she learned authentic techniques rooted in this long-standing tradition. Bringing this knowledge and experience to every treatment, she combines professional expertise with a personal, caring approach to help clients relax, recover, and feel their best.</p>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AboutUs;