"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    location: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
}

interface TestimonialsProps {
    initialTestimonials: Testimonial[];
}

export default function Testimonials({ initialTestimonials }: TestimonialsProps) {
    const [testimonials] = useState<Testimonial[]>(initialTestimonials || []);
    const [activeIndex, setActiveIndex] = useState(0);
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // Handle mounting safely
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (testimonials && testimonials.length > 1) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials]);

    const isDark = isMounted && theme === "dark";

    // Handle empty testimonials array
    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="text-center py-12">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                    <span className="text-2xl">🌟</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                    No Reviews Yet
                </h3>
                <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                    }`}>
                    Be the first to share your experience!
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Quote Icon */}
            <div className={`absolute -top-8 -left-8 transition-colors duration-300 ${isDark ? 'text-primary/20' : 'text-primary/10'
                }`}>
                <Quote className="h-32 w-32" />
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className={`transition-colors duration-300 ${isDark
                            ? 'border-gray-800 bg-gradient-to-br from-gray-900 to-primary/10'
                            : 'border-border/50 bg-gradient-to-br from-white to-primary/5'
                            }`}>
                            <CardContent className="p-8 md:p-12">
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "h-5 w-5 transition-colors duration-300",
                                                i < (testimonials[activeIndex]?.rating || 5)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : isDark
                                                        ? "fill-gray-700 text-gray-700"
                                                        : "fill-gray-200 text-gray-200"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className={`text-2xl md:text-3xl font-medium italic mb-8 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                                    }`}>
                                    {testimonials[activeIndex]?.comment || "Amazing experience!"}
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                                        <AvatarImage src={testimonials[activeIndex]?.avatar} />
                                        <AvatarFallback className={cn(
                                            "text-lg transition-colors duration-300",
                                            isDark
                                                ? 'bg-primary/20 text-primary'
                                                : 'bg-primary/10 text-primary'
                                        )}>
                                            {testimonials[activeIndex]?.name?.charAt(0) || "T"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className={`font-bold text-lg transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-900'
                                            }`}>
                                            {testimonials[activeIndex]?.name || "Traveler"}
                                        </div>
                                        <div className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                                            }`}>
                                            {testimonials[activeIndex]?.role || "Traveler"} • {testimonials[activeIndex]?.location || "Various Locations"}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots - Only show if multiple testimonials */}
                {testimonials.length > 1 && (
                    <>
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "h-2 w-2 rounded-full transition-all duration-300",
                                        index === activeIndex
                                            ? isDark
                                                ? "bg-primary w-8"
                                                : "bg-primary w-8"
                                            : isDark
                                                ? "bg-gray-700 hover:bg-gray-600"
                                                : "bg-gray-300 hover:bg-gray-400"
                                    )}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <Button
                                variant={isDark ? "secondary" : "outline"}
                                size="icon"
                                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                className={`rounded-full transition-colors duration-300 ${isDark
                                    ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200'
                                    : ''
                                    }`}
                            >
                                ←
                            </Button>

                            <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-muted-foreground'
                                }`}>
                                {activeIndex + 1} of {testimonials.length}
                            </div>

                            <Button
                                variant={isDark ? "secondary" : "outline"}
                                size="icon"
                                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                                className={`rounded-full transition-colors duration-300 ${isDark
                                    ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200'
                                    : ''
                                    }`}
                            >
                                →
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}