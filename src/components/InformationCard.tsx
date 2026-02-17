import React from 'react'
import Image from 'next/image';

type InformationCardProps = {
    title: string;
    description: string;
    imgSource: string;
    cta: string;
    dest: string;
};

function InformationCard({
    title,
    description,
    imgSource,
    cta,
    dest
}: InformationCardProps) {
    return (
        <div
            className="flex flex-col bg-white border border-gray-200 shadow-md w-full h-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <div className="relative aspect-3/2">
                <Image
                    src={`/photos/${imgSource}`}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="flex flex-col grow p-6">
                <h3 className="text-slate-900 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {description}
                </p>
                <a
                    href={`#${dest}`}
                    className="mt-auto inline-block w-full text-center px-6 py-3
               rounded-full bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest
               shadow-sm hover:shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5
               active:translate-y-0 active:shadow-inner
               transition-all duration-300 ease-in-out cursor-pointer outline-none"
                >
                    {cta}
                </a>
            </div>
        </div>
    )
}

export default InformationCard
