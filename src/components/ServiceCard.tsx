import React from 'react'
import Image from "next/image";

type Option = {
    time: number;
    cost: number;
};

type ServiceCardProps = {
    title: string;
    description: string;
    options: Option[];
    imgSource: string;
    popular: boolean;
};

function ServiceCard({
    title,
    description,
    options,
    imgSource,
    popular
}: ServiceCardProps) {
    return (
        <div className=" shrink-0 group relative h-130 w-80 p-6 flex flex-col gap-4 rounded-3xl bg-white border border-gray-300 shadow-xl transition-transform duration-500 hover:-translate-y-4 hover:cursor-pointer hover:scale-101 hover:shadow-2xl overflow-hidden">
            <div className="relative h-48 w-full shrink-0 transition-transform duration-500 group-hover:scale-101 group-hover:-translate-y-1">
                <Image
                    src={`/photos/services/${imgSource}`}
                    alt={title}
                    fill
                    className="object-cover rounded-2xl shadow-inner"
                />
                <span className={`absolute top-3 right-3  text-[10px] font-bold px-2 py-1 rounded-full z-10 transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 
                    ${popular ? 'bg-red-400' : 'bg-blue-400'} text-white`}>
                    {popular ? "POPULAR" : "Click me!"}
                </span>
            </div>

            <div className="flex flex-col gap-2 transition-transform duration-500 group-hover:scale-101 group-hover:-translate-y-1">
                <h1 className="font-bold text-xl text-slate-800 group-hover:text-[#607912] transition-colors">
                    {title}
                </h1>

                <div className="space-y-1">
                    {options.map((option) => (
                        <div key={option.time} className={"bg-gray-200 border border-gray-300 px-2 rounded-xl w-fit"}>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-slate-800">
                                {option.time} minutes — £{option.cost}
                            </span>
                        </div>
                    ))}

                </div>
            </div>

            <p className="mt-auto text-sm text-slate-500 line-clamp-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-101 group-hover:text-gray-800 group-hover:text-md ">
                {description}
            </p>
        </div>
    )
}

export default ServiceCard
