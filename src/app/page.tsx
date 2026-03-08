import Hero from "@/components/Hero";
import Proposition from "@/components/Proposition";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";

import { getServices, getProposition, getSiteSettings } from "@/sanity/lib/queries";

export default async function Home() {
	const [servicesData, propositionData, settingsData] = await Promise.all([
		getServices(),
		getProposition(),
		getSiteSettings(),
	]);

	return (
		<>
			<Hero />

			<AboutUs settings={settingsData} />

			<Services services={servicesData} />

			<Proposition data={propositionData} />

			<Reviews />

			<Booking initialServices={servicesData} />

			<Footer />
		</>
	);
}