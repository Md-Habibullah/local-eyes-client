"use client";

import { Search, Calendar, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HowItWorks() {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const isDark = isMounted && theme === "dark";

    const steps = [
        {
            icon: Search,
            title: "Discover Tours",
            description: "Browse authentic experiences from local guides worldwide.",
            lightColor: "text-blue-600 bg-blue-100",
            darkColor: "text-blue-400 bg-blue-900/30",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: Calendar,
            title: "Book Your Date",
            description: "Choose your preferred date and group size for the tour.",
            lightColor: "text-purple-600 bg-purple-100",
            darkColor: "text-purple-400 bg-purple-900/30",
            gradient: "from-purple-500 to-purple-600"
        },
        {
            icon: Users,
            title: "Meet Your Guide",
            description: "Connect with your local guide and get personalized tips.",
            lightColor: "text-green-600 bg-green-100",
            darkColor: "text-green-400 bg-green-900/30",
            gradient: "from-green-500 to-green-600"
        },
        {
            icon: Star,
            title: "Share Your Experience",
            description: "Leave reviews and help other travelers discover great guides.",
            lightColor: "text-amber-600 bg-amber-100",
            darkColor: "text-amber-400 bg-amber-900/30",
            gradient: "from-amber-500 to-amber-600"
        }
    ];

    return (
        <section className={`py-20 mb-4 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 transition-colors duration-300 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                        Simple Process
                    </span>
                    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                        How It Works
                    </h2>
                    <p className={`text-lg md:text-xl max-w-3xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                        }`}>
                        Get started with LocalEyes in four simple steps
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line - Desktop Only */}
                    <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 transition-colors duration-300 ${isDark
                        ? 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'
                        : 'bg-gradient-to-r from-transparent via-primary/20 to-transparent'
                        }`} />

                    {/* Mobile connecting lines */}
                    <div className="block lg:hidden">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={`absolute left-1/2 top-0 h-16 w-0.5 -translate-x-1/2 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'
                                }`} style={{ top: `${(i + 1) * 100}%` }} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative">
                                {/* Step connector arrow */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                        <ArrowRight className={`h-6 w-6 transition-colors duration-300 ${isDark ? 'text-gray-700' : 'text-gray-300'
                                            }`} />
                                    </div>
                                )}

                                <Card className={`h-full transition-all duration-500 hover:scale-[1.02] group ${isDark
                                    ? 'border-gray-800 bg-gray-800/50 hover:border-blue-600/30'
                                    : 'border-gray-200 bg-white hover:border-primary/30'
                                    } hover:shadow-xl`}>
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col items-center">
                                            {/* Step Number with Gradient */}
                                            <div className="relative mb-6">
                                                <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${isDark ? step.darkColor : step.lightColor
                                                    }`}>
                                                    <step.icon className="h-7 w-7" />
                                                </div>
                                                {/* Number Badge */}
                                                <div className={`absolute -top-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${isDark
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                                {/* Pulse effect */}
                                                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-400'
                                                    }`}></div>
                                            </div>

                                            <CardTitle className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                                                }`}>
                                                {step.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                                            }`}>
                                            {step.description}
                                        </p>

                                        {/* Progress indicator for mobile */}
                                        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                                                }`}></div>
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                                                }`}></div>
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isDark ? 'bg-gray-600' : 'bg-gray-300'
                                                }`}></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 transition-colors duration-300 ${isDark
                        ? 'bg-green-900/20 text-green-400 border border-green-800'
                        : 'bg-green-100 text-green-600 border border-green-200'
                        }`}>
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-semibold">Over 10,000 successful bookings</span>
                    </div>

                    <p className={`text-lg md:text-xl mb-8 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Ready to start your adventure?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register?role=tourist"
                            className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group ${isDark
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                }`}
                        >
                            Sign Up as Traveler
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="/become-a-guide"
                            className={`inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg border-2 transition-all duration-300 ${isDark
                                ? 'border-blue-500 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400 hover:text-blue-300'
                                : 'border-primary text-primary hover:bg-primary hover:text-white'
                                }`}
                        >
                            Become a Guide
                        </Link>
                    </div>

                    {/* Trust badge */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                            Trusted by travelers in 50+ countries
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}