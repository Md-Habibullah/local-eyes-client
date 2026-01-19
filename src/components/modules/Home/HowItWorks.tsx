"use client";

import { Search, Calendar, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Discover Tours",
            description: "Browse authentic experiences from local guides worldwide.",
            lightColor: "text-blue-600 bg-blue-100",
            darkColor: "dark:text-blue-400 dark:bg-blue-900/30",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: Calendar,
            title: "Book Your Date",
            description: "Choose your preferred date and group size for the tour.",
            lightColor: "text-purple-600 bg-purple-100",
            darkColor: "dark:text-purple-400 dark:bg-purple-900/30",
            gradient: "from-purple-500 to-purple-600"
        },
        {
            icon: Users,
            title: "Meet Your Guide",
            description: "Connect with your local guide and get personalized tips.",
            lightColor: "text-green-600 bg-green-100",
            darkColor: "dark:text-green-400 dark:bg-green-900/30",
            gradient: "from-green-500 to-green-600"
        },
        {
            icon: Star,
            title: "Share Your Experience",
            description: "Leave reviews and help other travelers discover great guides.",
            lightColor: "text-amber-600 bg-amber-100",
            darkColor: "dark:text-amber-400 dark:bg-amber-900/30",
            gradient: "from-amber-500 to-amber-600"
        }
    ];

    return (
        <section className="py-20 mb-4 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-colors duration-300">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        How It Works
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Get started with LocalEyes in four simple steps
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line - Desktop Only */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-400/20 to-transparent transition-colors duration-300" />

                    {/* Mobile connecting lines */}
                    <div className="block lg:hidden">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="absolute left-1/2 top-0 h-16 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 transition-colors duration-300" style={{ top: `${(i + 1) * 100}%` }} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative">
                                {/* Step connector arrow */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-700 transition-colors duration-300" />
                                    </div>
                                )}

                                <Card className="h-full transition-all duration-500 hover:scale-[1.02] group border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600/30 hover:shadow-xl">
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col items-center">
                                            {/* Step Number with Gradient */}
                                            <div className="relative mb-6">
                                                <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${step.lightColor} ${step.darkColor}`}>
                                                    <step.icon className="h-7 w-7" />
                                                </div>
                                                {/* Number Badge */}
                                                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
                                                    {index + 1}
                                                </div>
                                                {/* Pulse effect */}
                                                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400 dark:bg-blue-500"></div>
                                            </div>

                                            <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                                {step.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                            {step.description}
                                        </p>

                                        {/* Progress indicator for mobile */}
                                        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-semibold">Over 10,000 successful bookings</span>
                    </div>

                    <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Ready to start your adventure?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register?role=tourist"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        >
                            Sign Up as Traveler
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="/become-a-guide"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-900/30 dark:hover:border-blue-400 dark:hover:text-blue-300"
                        >
                            Become a Guide
                        </Link>
                    </div>

                    {/* Trust badge */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-500 transition-colors duration-300">
                            Trusted by travelers in 50+ countries
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}