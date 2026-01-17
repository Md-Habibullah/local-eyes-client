"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

type Category = {
    id: string;
    name: string;
    icon: string;
    gradient: string;
};

const categories: Category[] = [
    { id: "FOOD", name: "Food & Culinary", icon: "🍽️", gradient: "from-orange-500 via-amber-500 to-orange-600" },
    { id: "ADVENTURE", name: "Adventure", icon: "⛰️", gradient: "from-emerald-500 via-green-500 to-teal-600" },
    { id: "CULTURE", name: "Culture", icon: "🏛️", gradient: "from-purple-500 via-pink-500 to-rose-600" },
    { id: "HISTORY", name: "History", icon: "📜", gradient: "from-amber-500 via-yellow-500 to-orange-500" },
    { id: "NATURE", name: "Nature", icon: "🌿", gradient: "from-green-500 via-emerald-500 to-teal-500" },
    { id: "NIGHTLIFE", name: "Nightlife", icon: "🌙", gradient: "from-indigo-500 via-purple-500 to-pink-600" },
    { id: "SHOPPING", name: "Shopping", icon: "🛍️", gradient: "from-red-500 via-orange-500 to-yellow-500" },
    { id: "PHOTOGRAPHY", name: "Photography", icon: "📸", gradient: "from-blue-500 via-cyan-500 to-sky-600" },
    { id: "SPORTS", name: "Sports", icon: "⚽", gradient: "from-blue-600 via-blue-500 to-blue-400" },
];

export default function CategorySection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    const handleClick = (id: string) => {
        router.push(`/tours?category=${id}`);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Explore by{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Category
                        </span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Choose experiences that match your passion and explore the world your way
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 text-black md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories.map((category, index) => {
                        const isActive = activeCategory === category.id;

                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => handleClick(category.id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.08, y: -6 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group outline-none"
                            >
                                {/* Glow */}
                                <div
                                    className={clsx(
                                        "absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition duration-300 text-black",
                                        `bg-linear-to-r ${category.gradient}`
                                    )}
                                />

                                {/* Card */}
                                <div
                                    className={clsx(
                                        "relative h-36 rounded-2xl border backdrop-blur-xl flex flex-col items-center justify-center gap-3 transition-all duration-300",
                                        isActive
                                            ? "border-white/40 bg-white/20"
                                            : "border-white/15 bg-white/10 hover:border-white/30"
                                    )}
                                >
                                    <span className="text-4xl">{category.icon}</span>

                                    <span className="text-white font-semibold text-sm text-center px-2">
                                        {category.name}
                                    </span>

                                    {isActive && (
                                        <span className="text-xs text-cyan-300 font-medium">
                                            Selected
                                        </span>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
