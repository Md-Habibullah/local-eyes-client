"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

    useEffect(() => {
        if (testimonials && testimonials.length > 1) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials]);

    // Handle empty testimonials array
    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground">Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 -left-8 text-primary/10">
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
                        <Card className="border-border/50 bg-linear-to-br from-white to-primary/5">
                            <CardContent className="p-8 md:p-12">
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "h-5 w-5",
                                                i < (testimonials[activeIndex]?.rating || 5)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-2xl md:text-3xl font-medium italic mb-8">
                                    {testimonials[activeIndex]?.comment || "Amazing experience!"}
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                                        <AvatarImage src={testimonials[activeIndex]?.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                            {testimonials[activeIndex]?.name?.charAt(0) || "T"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-lg">
                                            {testimonials[activeIndex]?.name || "Traveler"}
                                        </div>
                                        <div className="text-muted-foreground">
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
                                            ? "bg-primary w-8"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    )}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                className="rounded-full"
                            >
                                ←
                            </Button>

                            <div className="text-sm text-muted-foreground">
                                {activeIndex + 1} of {testimonials.length}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                                className="rounded-full"
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