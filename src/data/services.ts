type Option = {
    time: number;
    cost: number;
};

type Service = {
    title: string;
    description: string;
    options: Option[];
    imgSource: string;
    popular: boolean;
}

export const services: Service[] = [
    {
        title: "Back, Neck & Shoulders Massage",
        description: "Focused massage targeting tension and stiffness in the back, neck, and shoulders. Perfect for relieving stress, easing muscle tightness, and restoring comfort in these key areas.",
        options: [
            { time: 30, cost: 35 },
            { time: 45, cost: 45 },
            { time: 60, cost: 60 }
        ],
        imgSource: "services-back.jpg",
        popular: true
    },
    {
        title: "Thai Head Massage",
        description: "A calming massage focusing on the head, neck, and shoulders to relieve tension, boost circulation, and promote mental clarity. Ideal for reducing stress and soothing headaches.",
        options: [
            { time: 30, cost: 35 },
            { time: 60, cost: 60 }
        ],
        imgSource: "services-head.jpg",
        popular: false
    },
    {
        title: "Thai Foot Massage",
        description: "Traditional Thai foot massage using pressure points to stimulate circulation, ease tension, and promote overall well-being. A deeply relaxing treatment for tired feet and legs.",
        options: [
            { time: 30, cost: 35 }
        ],
        imgSource: "services-foot.jpg",
        popular: false
    },
    {
        title: "Aromatherapy Massage",
        description: "A relaxing massage combining gentle techniques with essential oils to soothe the body, calm the mind, and uplift the spirit. Perfect for stress relief and emotional balance.",
        options: [
            { time: 60, cost: 60 },
            { time: 90, cost: 90 }
        ],
        imgSource: "services-aroma.jpg",
        popular: false
    },
    {
        title: "Swedish Massage",
        description: "Gentle and soothing massage using long, flowing strokes to ease muscle tension, improve circulation, and promote deep relaxation. Ideal for stress relief and overall well-being.",
        options: [
            { time: 60, cost: 60 },
            { time: 90, cost: 90 }
        ],
        imgSource: "services-swedish.jpg",
        popular: false
    },
    {
        title: "Foot & Leg Massage",
        description: "A soothing massage focusing on feet and legs to relieve fatigue, reduce swelling, and improve circulation. Ideal for those who spend long hours on their feet.",
        options: [
            { time: 60, cost: 60 }
        ],
        imgSource: "services-leg.jpg",
        popular: false
    },
    {
        title: "Deep Tissue Massage",
        description: "An intensive massage using firm pressure and slow strokes to target deeper muscle layers. Helps relieve chronic tension, muscle pain, and stiffness for lasting relief and improved mobility.",
        options: [
            { time: 60, cost: 80 },
            { time: 90, cost: 110 }
        ],
        imgSource: "services-deep.jpg",
        popular: false
    },
    {
        title: "Thai Oil Massage",
        description: "A soothing treatment using warm herbal oil and Thai massage techniques to ease muscle stiffness and calm the mind. Ideal for stress relief and nourishing the skin.",
        options: [
            { time: 60, cost: 60 },
            { time: 90, cost: 90 }
        ],
        imgSource: "services-oil4.jpeg",
        popular: false
    },
    {
        title: "Hot Stone Massage",
        description: "A deeply relaxing massage using smooth, heated stones to warm muscles, ease tension, and improve circulation. Perfect for relieving stress and promoting a sense of calm and balance.",
        options: [
            { time: 60, cost: 80 },
            { time: 90, cost: 110 }
        ],
        imgSource: "services-stones.jpg",
        popular: false
    },
    {
        title: "Hot Candle Massage",
        description: "A luxurious massage using warm candle oil to nourish the skin, melt away tension, and deeply relax body and mind. Leaves skin soft, smooth, and delicately scented.",
        options: [
            { time: 60, cost: 80 }
        ],
        imgSource: "services-candle.jpeg",
        popular: false
    },
    {
        title: "Herbal Compress Massage",
        description: "A therapeutic massage combining warm herbal compresses and gentle pressure to soothe muscle aches, reduce stress, and enhance circulation. The aromatic herbs help relax the body and mind for a truly rejuvenating experience.",
        options: [
            { time: 60, cost: 80 },
            { time: 90, cost: 110 }
        ],
        imgSource: "services-compress.jpeg",
        popular: false
    },
    {
        title: "Pregnancy Massage",
        description: "A gentle, safe massage designed for expectant mothers to ease back pain, reduce swelling, and promote relaxation. Supports comfort and well-being throughout pregnancy.",
        options: [
            { time: 60, cost: 60 }
        ],
        imgSource: "services-pregnant.jpg",
        popular: false
    },
    {
        title: "Lymphatic Drainage Massage",
        description: "A gentle, rhythmic massage that stimulates the lymphatic system to help reduce swelling, remove toxins, and boost immune function. Ideal for promoting detoxification and reducing water retention.",
        options: [
            { time: 30, cost: 45 },
            { time: 60, cost: 70 }
        ],
        imgSource: "services-lymphatic.jpg",
        popular: false
    },
    {
        title: "Thai Traditional Massage",
        description: "A time-honored therapy combining acupressure, assisted stretching, and rhythmic compression to improve flexibility, relieve muscle tension, and restore energy balance. Performed without oil.",
        options: [
            { time: 30, cost: 35 }
        ],
        imgSource: "services-trad.jpg",
        popular: false
    }
];