/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Suspense } from "react";
import Testimonials from "./Testimonials";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

interface TestimonialsSectionProps {
    testimonialsResult: {
        error?: string | null;
        data?: any[];
    };
}

export default function TestimonialsSection({ testimonialsResult }: TestimonialsSectionProps) {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // Handle mounting safely
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const isDark = isMounted && theme === "dark";

    return (
        <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    {/* Section Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 transition-colors duration-300 ${isDark
                        ? 'bg-purple-900/20 text-purple-400 border border-purple-800'
                        : 'bg-purple-100 text-purple-600 border border-purple-200'
                        }`}>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <span className="text-sm font-semibold">Real Experiences</span>
                    </div>

                    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                        Traveler Stories
                    </h2>
                    <p className={`text-lg md:text-xl max-w-3xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                        }`}>
                        See what our travelers have to say about their authentic experiences
                    </p>
                </div>

                {testimonialsResult?.error ? (
                    <div className="text-center py-12">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${isDark ? 'bg-red-900/20' : 'bg-red-100'
                            }`}>
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <p className={`mb-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                            }`}>
                            {testimonialsResult.error}
                        </p>
                        <Link
                            href="/reviews"
                            className={`inline-flex items-center gap-2 font-medium hover:underline transition-colors duration-300 ${isDark
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-primary hover:text-primary/80'
                                }`}
                        >
                            Read more reviews
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <Suspense
                        fallback={
                            <div className="relative">
                                <TestimonialsSkeleton />
                            </div>
                        }
                    >
                        <Testimonials initialTestimonials={testimonialsResult?.data || []} />
                    </Suspense>
                )}

                {/* Stats Bar */}
                <div className={`mt-16 pt-8 border-t transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { value: "4.9", label: "Average Rating", icon: "⭐" },
                            { value: "10K+", label: "Happy Travelers", icon: "😊" },
                            { value: "98%", label: "Satisfaction", icon: "🎯" },
                            { value: "50+", label: "Countries", icon: "🌎" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`text-2xl mb-1 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    {stat.icon}
                                </div>
                                <div className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                                    }`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'
                                    }`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}