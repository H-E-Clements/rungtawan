import React from 'react'
import InformationCard from "@/components/InformationCard";

function Proposition() {
    return (
        <div id="value-proposition" className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-6 px-12 py-10 w-full">
            <InformationCard dest={"booking"}
cta={"Book Your Lymphatic Drainage"} imgSource={"services/services-lymphatic.jpg"} title={"Specialists In Authentic Thai Lymphatic Drainage"} description={"The Manchester specialist in authentic Thai Lymphatic Drainage, offering targeted treatments to detoxify the body, reduce swelling, and support post-surgical healing through expert manual techniques."} />
            <InformationCard dest={"services"}
cta={"View our services"} imgSource={"candles.jpg"} title={"Personalized Therapeutic Precision"} description={"Bespoke healing sessions tailored to your body’s unique needs, where every treatment is customized by knowledgeable therapists to address specific muscle tension, chronic pain, or individual wellness goals."} />
            <InformationCard dest={"footer"}
cta={"Find us"} imgSource={"prop-man.jpg"} title={"An Urban Sanctuary for Deep Restoration"} description={"A tranquil, authentic Thai escape located in the heart of the Northern Quarter, providing a peaceful environment for city dwellers to reset through traditional herbal compresses and restorative oil massages."} />
        </div>
    )
}

export default Proposition
