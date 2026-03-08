import React from 'react'
import InformationCard from "@/components/InformationCard";

type PropositionProps = {
    data: {
        cards: Array<{
            title: string;
            description: string;
            imgSource: string;
            cta: string;
            dest: string;
        }>;
    } | null;
};

function Proposition({ data }: PropositionProps) {
    if (!data || !data.cards) return null;
    return (
        <div id="value-proposition" className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-6 px-12 py-10 w-full">
            {data.cards.map((card, index) => (
                <InformationCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    imgSource={card.imgSource}
                    cta={card.cta}
                    dest={card.dest}
                />
            ))}
        </div>
    )
}

export default Proposition
