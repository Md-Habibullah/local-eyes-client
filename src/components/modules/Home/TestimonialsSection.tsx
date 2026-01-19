/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Star, Quote, Sparkles, Trophy, Heart, Globe } from "lucide-react";
import Testimonials from "./Testimonials";
import TestimonialsSkeleton from "./TestimonialsSkeleton";

interface TestimonialsSectionProps {
    testimonialsResult: {
        error?: string | null;
        data?: any[];
    };
}

export default function TestimonialsSection({ testimonialsResult }: TestimonialsSectionProps) {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/15 dark:to-pink-500/15 border border-purple-200/50 dark:border-purple-700/30 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Traveler Voices
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="relative inline-block mb-8">
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4 relative z-10">
                            Stories That{" "}
                            <span className="relative">
                                <span className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                                    Inspire
                                </span>
                                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full blur-sm"></span>
                            </span>
                        </h2>
                        <Quote className="absolute -top-6 -right-6 w-12 h-12 text-purple-300/30 dark:text-purple-700/30 rotate-12" />
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Real experiences from travelers who discovered authentic connections and unforgettable moments
                    </p>
                </div>

                {/* Main Content */}
                {testimonialsResult?.error ? (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 flex items-center justify-center mx-auto mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 dark:text-yellow-400 animate-pulse" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Connect With Stories
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            {testimonialsResult.error}
                        </p>
                        <Link
                            href="/reviews"
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 dark:hover:shadow-purple-500/15 transition-all duration-300 hover:scale-105 group"
                        >
                            <span>Explore All Reviews</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Trust Stats */}
                <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                value: "4.9",
                                label: "Average Rating",
                                icon: Star,
                                color: "from-yellow-500 to-amber-500",
                                iconColor: "text-yellow-500", // Added icon color
                                bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10"
                            },
                            {
                                value: "10K+",
                                label: "Happy Travelers",
                                icon: Heart,
                                color: "from-rose-500 to-pink-500",
                                iconColor: "text-rose-500", // Added icon color
                                bgColor: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10"
                            },
                            {
                                value: "98%",
                                label: "Satisfaction",
                                icon: Trophy,
                                color: "from-emerald-500 to-teal-500",
                                iconColor: "text-emerald-500", // Added icon color
                                bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10"
                            },
                            {
                                value: "50+",
                                label: "Countries",
                                icon: Globe,
                                color: "from-blue-500 to-indigo-500",
                                iconColor: "text-blue-500", // Added icon color
                                bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10"
                            }
                        ].map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={index}
                                    className="text-center group cursor-pointer"
                                >
                                    {/* Icon Container */}
                                    <div className={`relative mb-4 mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${stat.bgColor} group-hover:scale-110`}>
                                        {/* Background Glow */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                        {/* Icon - Fixed */}
                                        <div className="relative z-10 p-3">
                                            <Icon className={`w-6 h-6 ${stat.iconColor} dark:opacity-90`} />
                                        </div>

                                        {/* Floating Particles */}
                                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-white/60 to-transparent dark:from-gray-800/60"></div>
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-gradient-to-r from-white/40 to-transparent dark:from-gray-800/40"></div>
                                    </div>

                                    {/* Value */}
                                    <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/30">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                Join Our Community
                            </span>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 max-w-2xl mx-auto">
                        Ready to share your own travel story?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group"
                        >
                            <span>Start Your Journey</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        <Link
                            href="/tours"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 group"
                        >
                            <span>Read All Stories</span>
                            <Quote className="w-5 h-5 group-hover:rotate-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent dark:via-purple-400/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent dark:via-pink-400/10"></div>
        </section>
    );
}