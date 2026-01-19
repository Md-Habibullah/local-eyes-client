"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useState, useEffect } from "react";

type Category = {
    id: string;
    name: string;
    icon: string;
    gradient: string;
    bgColor: string;
    darkBgColor: string;
    iconColor: string;
    darkIconColor: string;
    shadowColor: string;
    darkShadowColor: string;
};

const categories: Category[] = [
    {
        id: "FOOD",
        name: "Food & Culinary",
        icon: "🍽️",
        gradient: "from-blue-500 to-purple-600",
        bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-purple-900/20",
        iconColor: "text-orange-500",
        darkIconColor: "dark:text-orange-400",
        shadowColor: "shadow-orange-100",
        darkShadowColor: "dark:shadow-orange-900/20"
    },
    {
        id: "ADVENTURE",
        name: "Adventure",
        icon: "⛰️",
        gradient: "from-blue-600 to-purple-700",
        bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-indigo-900/20",
        iconColor: "text-emerald-600",
        darkIconColor: "dark:text-emerald-400",
        shadowColor: "shadow-emerald-100",
        darkShadowColor: "dark:shadow-emerald-900/20"
    },
    {
        id: "CULTURE",
        name: "Culture",
        icon: "🏛️",
        gradient: "from-purple-600 to-blue-600",
        bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-blue-900/20",
        iconColor: "text-amber-600",
        darkIconColor: "dark:text-amber-400",
        shadowColor: "shadow-amber-100",
        darkShadowColor: "dark:shadow-amber-900/20"
    },
    {
        id: "HISTORY",
        name: "History",
        icon: "📜",
        gradient: "from-blue-700 to-purple-800",
        bgColor: "bg-gradient-to-br from-blue-100 to-purple-100",
        darkBgColor: "dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-purple-900/30",
        iconColor: "text-amber-700",
        darkIconColor: "dark:text-amber-300",
        shadowColor: "shadow-amber-100",
        darkShadowColor: "dark:shadow-amber-900/20"
    },
    {
        id: "NATURE",
        name: "Nature",
        icon: "🌿",
        gradient: "from-emerald-500 to-purple-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-purple-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-emerald-900/20 dark:to-purple-900/20",
        iconColor: "text-green-600",
        darkIconColor: "dark:text-green-400",
        shadowColor: "shadow-green-100",
        darkShadowColor: "dark:shadow-green-900/20"
    },
    {
        id: "NIGHTLIFE",
        name: "Nightlife",
        icon: "🌙",
        gradient: "from-indigo-600 to-blue-600",
        bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-indigo-900/20 dark:to-blue-900/20",
        iconColor: "text-sky-600",
        darkIconColor: "dark:text-sky-400",
        shadowColor: "shadow-sky-100",
        darkShadowColor: "dark:shadow-sky-900/20"
    },
    {
        id: "SHOPPING",
        name: "Shopping",
        icon: "🛍️",
        gradient: "from-blue-500 to-pink-600",
        bgColor: "bg-gradient-to-br from-blue-50 to-pink-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-pink-900/20",
        iconColor: "text-pink-600",
        darkIconColor: "dark:text-pink-400",
        shadowColor: "shadow-pink-100",
        darkShadowColor: "dark:shadow-pink-900/20"
    },
    {
        id: "PHOTOGRAPHY",
        name: "Photography",
        icon: "📸",
        gradient: "from-sky-500 to-purple-600",
        bgColor: "bg-gradient-to-br from-sky-50 to-purple-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-sky-900/20 dark:to-purple-900/20",
        iconColor: "text-cyan-600",
        darkIconColor: "dark:text-cyan-400",
        shadowColor: "shadow-cyan-100",
        darkShadowColor: "dark:shadow-cyan-900/20"
    },
    {
        id: "SPORTS",
        name: "Sports",
        icon: "⚽",
        gradient: "from-blue-600 to-violet-700",
        bgColor: "bg-gradient-to-br from-blue-50 to-violet-50",
        darkBgColor: "dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-violet-900/20",
        iconColor: "text-blue-600",
        darkIconColor: "dark:text-blue-400",
        shadowColor: "shadow-blue-100",
        darkShadowColor: "dark:shadow-blue-900/20"
    },
];

export default function CategorySection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    const handleClick = (id: string) => {
        router.push(`/tours?category=${id}`);
    };

    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 border-blue-100 dark:border-blue-800 transition-colors duration-300">
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Explore Experiences
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        Browse by{" "}
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                                Category
                            </span>
                            <span className="absolute -bottom-2 left-0 w-full h-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 transition-colors duration-300"></span>
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Discover experiences tailored to your interests. Each category offers unique adventures
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category, index) => {
                        const isActive = activeCategory === category.id;

                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => handleClick(category.id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group outline-none"
                            >
                                {/* Card */}
                                <div
                                    className={clsx(
                                        "relative h-36 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all duration-300 p-4 overflow-hidden",
                                        isActive
                                            ? `border-transparent bg-gradient-to-br ${category.gradient} ${category.shadowColor} dark:${category.darkShadowColor} shadow-lg`
                                            : clsx(
                                                `border-gray-200 dark:border-gray-800 ${category.bgColor} ${category.darkBgColor}`,
                                                "hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg",
                                                category.shadowColor,
                                                category.darkShadowColor
                                            )
                                    )}
                                >
                                    {/* Active overlay */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-white/10"></div>
                                    )}

                                    {/* Pattern overlay */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-current rounded-full -translate-y-8 translate-x-8"></div>
                                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-current rounded-full translate-y-6 -translate-x-6"></div>
                                    </div>

                                    {/* Icon Container */}
                                    <div className={clsx(
                                        "text-4xl transform transition-all duration-500 relative z-10",
                                        isActive
                                            ? "text-white scale-110"
                                            : clsx(
                                                `${category.iconColor} ${category.darkIconColor}`,
                                                "group-hover:scale-110"
                                            )
                                    )}>
                                        {category.icon}
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white"
                                            >
                                                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Text Container */}
                                    <div className="text-center space-y-1 relative z-10">
                                        <span className={clsx(
                                            "font-semibold text-sm transition-colors duration-300",
                                            isActive
                                                ? "text-white"
                                                : "text-gray-800 dark:text-gray-200"
                                        )}>
                                            {category.name}
                                        </span>

                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <div className="h-1 w-3 bg-white/60 rounded-full"></div>
                                                <span className="text-xs font-medium text-white/90">
                                                    Active
                                                </span>
                                                <div className="h-1 w-3 bg-white/60 rounded-full"></div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Hover effect */}
                                    {!isActive && (
                                        <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/0 dark:group-hover:from-white/10 dark:group-hover:to-white/0"></div>
                                    )}
                                </div>

                                {/* Bottom indicator */}
                                <div className={clsx(
                                    "absolute -bottom-2 left-4 right-4 h-1 rounded-full transition-all duration-500",
                                    isActive
                                        ? `opacity-100 bg-gradient-to-r ${category.gradient}`
                                        : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
                                )} />
                            </motion.button>
                        );
                    })}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                        View All Categories
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}