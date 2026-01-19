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
import CategorySection from "@/components/modules/Home/CategorySection";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import ServicesSection from "@/components/modules/Home/ServicesSection";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";
import { Compass } from "lucide-react";

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
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            {/* Decorative element */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-blue-100 text-blue-600 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm font-semibold">Featured Experiences</span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Discover Amazing Tours
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground dark:text-gray-400 transition-colors duration-300">
              Curated experiences with local experts around the world
            </p>
          </div>

          {toursResult.error ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                <Compass className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-muted-foreground dark:text-gray-400 mb-4 transition-colors duration-300">
                {toursResult.error}
              </p>
              <Link
                href="/tours"
                className="text-primary hover:underline font-medium dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
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
      <section className="py-20 bg-muted/30 dark:bg-gray-800/30 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            {/* Decorative badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-amber-100 text-amber-600 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <span className="text-sm font-semibold">Expert Local Guides</span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Meet Our Expert Guides
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground dark:text-gray-400 transition-colors duration-300">
              Verified local experts ready to show you their city
            </p>
          </div>

          {guidesResult.error ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                <svg
                  className="h-8 w-8 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground dark:text-gray-400 mb-4 transition-colors duration-300">
                {guidesResult.error}
              </p>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 group"
              >
                Meet our guides
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <Suspense fallback={<TopGuidesSkeleton />}>
              <TopGuides />
            </Suspense>
          )}

          {/* Stats Section */}
          {/* <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  500+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Expert Guides
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  4.9
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Avg Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Countries
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Verified
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/become-a-guide"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-all duration-300 font-medium"
              >
                Become a Guide
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div> */}
        </div>
      </section>

      <section className="py-4 bg-muted/30">
        <CategorySection />
      </section>
      <section className="py-4 bg-muted/30">
        <WhyChooseUs />
      </section>


      <ServicesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialsSection testimonialsResult={testimonialsResult} />

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
            <div
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Become a Guide
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}