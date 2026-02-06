import React from 'react'

type ReviewCardProps = {
    name: string;
    reviewText: string;
};

function ReviewCard({
    name,
    reviewText
}: ReviewCardProps) {
    return (
        <div className="w-full h-[160px] flex flex-col gap-6">
            <img alt={""}/>
            <p>
                {reviewText}
            </p>
            <img />
            <h1>{name}</h1>
            <h1>Customer</h1>
        </div>
    )
}

export default ReviewCard
