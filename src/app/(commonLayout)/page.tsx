import CTASection from "@/components/modules/Home/CTASection";
import FeatureSection from "@/components/modules/Home/FeatureSection";
import Hero from "@/components/modules/Home/Hero";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import PopularTours from "@/components/modules/Home/PopularTours";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LocalEyes | Home",
  description:
    "Discover top-rated tourist platform. Get personalized recommendations and book tours effortlessly.",
};

const HomePage = async () => {
  return (
    <main className="space-y-24">
      <Hero />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <PopularTours />
      <CTASection />
    </main>
  );
};

export default HomePage;
