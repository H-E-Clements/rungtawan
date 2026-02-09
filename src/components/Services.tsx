import React from 'react'
import ServiceCard from "@/components/ServiceCard";
import {services} from "@/data/services";

function Services() {
    return (
        <div 
			id="services"
			className={"my-10 bg-gradient-to-br from-emerald-900 via-emerald-900 to-emerald-900 pt-6"}>
            <h1 className="flex items-center text-center my-8 font-bold text-4xl px-16">
                <span className="grow h-px bg-white opacity-70"></span>
                <span className="px-4 text-white">Our Services</span>
                <span className="grow h-px bg-white opacity-70"></span>
            </h1>
            <div className={"flex flex-nowrap gap-6 overflow-x-auto h-160 items-center p-12"}>
                {
                    services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            options={service.options}
                            imgSource={service.imgSource}
                            popular={service.popular}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Services
