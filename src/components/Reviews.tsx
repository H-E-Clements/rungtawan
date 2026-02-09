import React from 'react';

// Data array to keep the UI logic clean
const REVIEWS_DATA = [
	{
		id: 1,
		name: "น่ารัก น่ารัก",
		role: "Customer",
		image: "/photos/reviews/review-1.png",
		text: "“[I] had been suffering from a frozen shoulder for several months and had tried many different places, but nothing really helped. The stiffness and pain in my arm completely disappeared after the treatment. I had a 4-hour massage, and it was absolutely worth every penny.”"
	},
	{
		id: 2,
		name: "Taylor",
		role: "Customer",
		image: "photos/reviews/review-2.png",
		text: "“I would highly reccomend, I have had many massages and can say this is the best I’ve ever had. I had back and neck pain prior and have come out feeling very loose. Lovely woman I will definitely be returning 🤍”"
	},
	{
		id: 3,
		name: "Katia Riccardo",
		role: "Customer",
		image: "photos/reviews/review-3.png",
		text: "“One of the best massages I’ve ever had! I had a lymphatic drainage massage today and I left feeling incredibly light, relaxed, and cared for. I highly recommend to anyone looking for real care and professionalism. Thank you !!”"
	}
];

// Reusable Quote Icon Component
const QuoteIcon = () => (
	<svg className="absolute top-0 -right-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="10.5" cy="10.5" r="8.5" fill={"#006045"} />
		<path d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z" fill="#fff" />
	</svg>
);

function Reviews() {
	return (
		<div className="flex flex-col items-center text-center py-12 my-12">
			<h1 className="text-4xl font-bold max-w-[740px] mb-[72px]">
				Trusted by over <span className="text-emerald-600">one hundred</span> clients to restore calm, balance, and serenity.
			</h1>

			<div className="flex flex-wrap items-center justify-center gap-4">
				{REVIEWS_DATA.map((review) => (
					<div key={review.id} className="flex flex-col items-center bg-white px-3 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-center text-gray-500 min-h-[400px]">
						<div className="relative mb-4">
							<img className="h-16 w-16 rounded-full object-cover" src={review.image} alt={review.name} />
							<QuoteIcon />
						</div>
						
						<p className="flex-grow">{review.text}</p>
						
						<div className="mt-5">
							<p className="text-lg text-gray-800 font-medium">{review.name}</p>
							<p className="text-xs">{review.role}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Reviews;