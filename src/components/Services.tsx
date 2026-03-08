import React from 'react';
import ServiceCard from "@/components/ServiceCard";
import ScrollContainer from "@/components/ScrollContainer";

type ServicesProps = {
    services: any[];
};

function Services({ services }: ServicesProps) {
    if (!services || services.length === 0) return null;
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
            <ScrollContainer>
                {services.map((service: any) => (
                    <ServiceCard key={service._id || service.title} {...service} />
                ))}
            </ScrollContainer>
        </div>
    );
}

export default Services;
