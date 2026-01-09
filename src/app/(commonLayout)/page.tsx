import { Suspense } from "react";
// import LoadingSpinner from "@/components/ui/loading-spinner";
import Link from "next/link";
import HeroSection from "@/components/modules/Home/HeroSection";
import HeroSectionSkeleton from "@/components/modules/Home/HeroSectionSkeleton";
import FeaturedTours from "@/components/modules/Home/FeaturedTours";
import FeaturedToursSkeleton from "@/components/modules/Home/FeaturedToursSkeleton";
import TopGuides from "@/components/modules/Home/TopGuides";
import TopGuidesSkeleton from "@/components/modules/Home/TopGuidesSkeleton";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import Testimonials from "@/components/modules/Home/Testimonials";
import TestimonialsSkeleton from "@/components/modules/Home/TestimonialsSkeleton";
import { getFeaturedTours, getTestimonials, getTopGuides } from "@/services/home/home-data";

export default async function HomePage() {
  // Fetch all data on server in parallel
  const [toursResult, guidesResult, testimonialsResult] = await Promise.all([
    getFeaturedTours(),
    getTopGuides(),
    getTestimonials()
  ]);

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
      {/* Hero Section */}
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Featured Tours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Discover Amazing Tours
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated experiences with local experts around the world
            </p>
          </div>

          {toursResult.error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{toursResult.error}</p>
              <Link
                href="/tours"
                className="text-primary hover:underline font-medium"
              >
                Browse all tours →
              </Link>
            </div>
          ) : (
            <Suspense fallback={<FeaturedToursSkeleton />}>
              <FeaturedTours />
            </Suspense>
          )}
        </div>
      </section>

      {/* Top Guides */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Meet Our Expert Guides
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Verified local experts ready to show you their city
            </p>
          </div>

          {guidesResult.error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{guidesResult.error}</p>
              <Link
                href="/guides"
                className="text-primary hover:underline font-medium"
              >
                Meet our guides →
              </Link>
            </div>
          ) : (
            <Suspense fallback={<TopGuidesSkeleton />}>
              <TopGuides />
            </Suspense>
          )}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Traveler Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what our travelers have to say about their experiences
            </p>
          </div>

          {testimonialsResult.error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{testimonialsResult.error}</p>
              <Link
                href="/reviews"
                className="text-primary hover:underline font-medium"
              >
                Read more reviews →
              </Link>
            </div>
          ) : (
            <Suspense fallback={<TestimonialsSkeleton />}>
              <Testimonials initialTestimonials={testimonialsResult.data} />
            </Suspense>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic experiences with local guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Browse All Tours
            </Link>
            <Link
              href="/become-a-guide"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Become a Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}