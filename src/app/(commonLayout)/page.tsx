import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/VerifiedGuides";
import { Metadata } from "next";
import TopRatedGuides from "@/components/modules/Home/TopRatedGuides";
import Hero from "@/components/modules/Home/Hero";

export const metadata: Metadata = {
  title: "LocalEyes | Home",
  description:
    "Discover top-rated tourist platform. Get personalized recommendations and book tours effortlessly.",
};

const HomePage = () => {
  return (
    <main>
      <Hero />
      <TopRatedGuides />
      <Steps />
      <Testimonials />
    </main>
  );
};

export default HomePage;
