"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, MapPin, User, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (testimonials.length > 1 && isAutoPlaying) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [testimonials.length, isAutoPlaying]);

    // Fallback testimonials if none provided
    const fallbackTestimonials: Testimonial[] = [
        {
            id: "1",
            name: "Alex Chen",
            role: "Adventure Traveler",
            location: "Tokyo, Japan",
            rating: 5,
            comment: "My guide showed me parts of Tokyo I would never have discovered on my own. The food tour was absolutely incredible - authentic local spots only insiders know about!",
            date: "2024-01-15"
        },
        {
            id: "2",
            name: "Maria Rodriguez",
            role: "Culture Enthusiast",
            location: "Barcelona, Spain",
            rating: 5,
            comment: "The Gaudi architecture tour was mind-blowing! Our guide was so knowledgeable and passionate. I learned more in 3 hours than I did reading guidebooks for weeks.",
            date: "2024-02-20"
        },
        {
            id: "3",
            name: "James Wilson",
            role: "Photography Buff",
            location: "Santorini, Greece",
            rating: 5,
            comment: "The sunset photography tour was worth every penny. Our guide knew all the secret spots for the best shots. I came home with professional-level photos!",
            date: "2024-03-10"
        },
        {
            id: "4",
            name: "Sarah Johnson",
            role: "Food Blogger",
            location: "Bangkok, Thailand",
            rating: 5,
            comment: "Street food tour that changed my life! I tasted flavors I didn't even know existed. Our guide was amazing at explaining the history behind each dish.",
            date: "2024-03-25"
        }
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

    const handlePrevious = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="relative max-w-6xl mx-auto">
            {/* Background decorative elements */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        className="group"
                    >
                        {/* Main Testimonial Card */}
                        <div className="relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 shadow-2xl shadow-gray-200/20 dark:shadow-gray-900/30">
                            {/* Decorative corner accents */}
                            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-purple-300/30 dark:border-purple-700/30 rounded-tr-2xl"></div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-pink-300/30 dark:border-pink-700/30 rounded-bl-2xl"></div>

                            {/* Quote icon background */}
                            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl flex items-center justify-center">
                                <Quote className="w-10 h-10 text-purple-500/40 dark:text-purple-400/40" />
                            </div>

                            {/* Sparkle effect on hover */}
                            <Sparkles className="absolute top-6 right-6 w-6 h-6 text-yellow-500/0 group-hover:text-yellow-500/30 transition-all duration-500 group-hover:rotate-180" />

                            <div className="relative z-10">
                                {/* Rating stars with glow effect */}
                                <div className="flex gap-1 mb-6 relative">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Star
                                                className={cn(
                                                    "h-6 w-6 transition-all duration-300",
                                                    i < displayTestimonials[activeIndex]?.rating
                                                        ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                                                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                                                )}
                                            />
                                        </motion.div>
                                    ))}
                                    {/* Rating badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="absolute -top-2 -right-2"
                                    >
                                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold shadow-lg">
                                            {displayTestimonials[activeIndex]?.rating}.0
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Quote text */}
                                <blockquote className="relative mb-10">
                                    <div className="absolute -left-4 top-0 text-6xl text-purple-300/20 dark:text-purple-700/30 leading-none"></div>
                                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white leading-relaxed pl-4">
                                        {displayTestimonials[activeIndex]?.comment}
                                    </p>
                                    <div className="absolute -right-4 bottom-0 text-6xl text-pink-300/20 dark:text-pink-700/30 leading-none"></div>
                                </blockquote>

                                {/* Author section */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-gray-100/50 dark:border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar with glow effect */}
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30"></div>
                                            <div className="relative w-16 h-16 rounded-full border-2 border-white/50 dark:border-gray-700/50 overflow-hidden bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
                                                {displayTestimonials[activeIndex]?.avatar ? (
                                                    <Image
                                                        src={displayTestimonials[activeIndex].avatar}
                                                        alt={displayTestimonials[activeIndex].name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <User className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                            {/* Verified badge */}
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center border-2 border-white dark:border-gray-800">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {displayTestimonials[activeIndex]?.name}
                                                </h4>
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300">
                                                    {displayTestimonials[activeIndex]?.role}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{displayTestimonials[activeIndex]?.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(displayTestimonials[activeIndex]?.date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review stats */}
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">5★</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                                            <div className="text-sm text-gray-600 dark:text-gray400">Tours</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Navigation Dots */}
                    <div className="flex gap-3">
                        {displayTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setActiveIndex(index);
                                }}
                                className={cn(
                                    "relative transition-all duration-500 group",
                                    "focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-full"
                                )}
                                aria-label={`View testimonial from ${displayTestimonials[index].name}`}
                            >
                                {/* Dot background */}
                                <div className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-500",
                                    index === activeIndex
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                                        : "bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-600"
                                )} />

                                {/* Hover tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                        {displayTestimonials[index].name}
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-800"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons and Counter */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrevious}
                            className="p-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {activeIndex + 1}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 mx-2">/</span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {displayTestimonials.length}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Reviews
                            </span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                        </button>
                    </div>

                    {/* Auto-play toggle */}
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:scale-105"
                    >
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                        {isAutoPlaying ? 'Auto-playing' : 'Click to play'}
                    </button>
                </div>

                {/* Decorative gradient bar */}
                <div className="mt-12 h-1 w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent dark:via-purple-400/20 rounded-full"></div>
            </div>
        </div>
    );
}