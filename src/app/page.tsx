import Image from "next/image";
import Hero from "@/components/Hero";
import Proposition from "@/components/Proposition";
import Services from "@/components/Services";

export default function Home() {
  return (
      <>
          <Hero />
          <Proposition />
          <Services />

      </>
  );
}
