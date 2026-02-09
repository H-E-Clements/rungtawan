import Image from "next/image";
import Hero from "@/components/Hero";
import Proposition from "@/components/Proposition";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";

export default function Home() {
	return (
		<>
			<Hero />

			<AboutUs />

			<Services />

			<Proposition />
			
			<Reviews />
			
			<Booking />
			
			<Footer />

		</>
	);
}
