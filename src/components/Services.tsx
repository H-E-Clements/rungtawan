import React from 'react'
import ServiceCard from "@/components/ServiceCard";
import {services} from "@/data/services";

function Services() {
    return (
        <div className={"my-10"}>
            <h1 className="flex items-center text-center my-8 font-bold text-4xl">
                <span className="grow h-px bg-[#607912]"></span>
                <span className="px-4">Our Services</span>
                <span className="grow h-px bg-[#607912]"></span>
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
