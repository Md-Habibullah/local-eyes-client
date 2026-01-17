/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useRef, useState } from "react";
import {
    Search,
    Tag,
    Compass,
    Sparkles,
    Globe,
    Star,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";

export default function HeroSection() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const mountedRef = useRef(false); // ✅ FIX

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const categories = [
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

    const popularCities = ["Tokyo", "Paris", "Bali", "New York", "Dubai"];

    const stats = [
        { value: "500+", label: "Guides", icon: "👨‍✈️" },
        { value: "50+", label: "Countries", icon: "🌍" },
        { value: "10K+", label: "Travelers", icon: "😊" },
        { value: "4.9", label: "Rating", icon: "⭐" },
    ];

    // ✅ SAFE EFFECT (NO setState directly)
    useEffect(() => {
        mountedRef.current = true;

        const handleMouseMove = (e: MouseEvent) => {
            if (!mountedRef.current || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            mountedRef.current = false;
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/tours?searchTerm=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <>
            <section
                ref={containerRef}
                className="relative h-[70vh] min-h-162.5 flex items-center overflow-hidden"
                style={{
                    transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                }}
            >
                {/* BACKGROUND */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900" />

                {/* CONTENT */}
                <div className="relative z-10 container mx-auto px-8 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-x-20 items-center h-full">
                        {/* LEFT */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur border border-white/20">
                                <Sparkles className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm text-white/80">
                                    #1 Travel Platform
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                                EXPLORE <br />
                                <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                    LIKE NEVER BEFORE
                                </span>
                            </h1>

                            <p className="text-xl text-white/80 max-w-xl">
                                Discover authentic local experiences with expert
                                guides worldwide.
                            </p>
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="bg-white/10 backdrop-blur-2xl border-white/20">
                                <CardContent className="p-8 space-y-8">
                                    <form onSubmit={handleSearch}>
                                        <div className="flex items-center bg-white/10 rounded-xl border border-white/20 overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCategoryDropdown((p) => !p)
                                                }
                                                className="flex items-center gap-2 px-5 text-white"
                                            >
                                                <Tag className="h-5 w-5" />
                                                {selectedCategory || "Category"}
                                                <ChevronRight className="h-4 w-4" />
                                            </button>

                                            <Input
                                                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/60"
                                                placeholder="Search destination, tours..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(e.target.value)
                                                }
                                            />

                                            <Button
                                                type="submit"
                                                className="rounded-none bg-gradient-to-r from-cyan-500 to-purple-600"
                                            >
                                                <Search className="mr-2 h-4 w-4" />
                                                Search
                                            </Button>
                                        </div>
                                    </form>

                                    {/* TRENDING */}
                                    <div>
                                        <p className="text-white/80 mb-3 flex items-center gap-2">
                                            <Compass className="h-4 w-4" />
                                            Trending
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {categories.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() =>
                                                        router.push(
                                                            `/tours?category=${c.id}`
                                                        )
                                                    }
                                                    className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                                >
                                                    {c.icon} {c.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CITIES */}
                                    <div>
                                        <p className="text-white/80 mb-3 flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            Popular
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {popularCities.map((city) => (
                                                <button
                                                    key={city}
                                                    onClick={() =>
                                                        router.push(
                                                            `/tours?searchTerm=${city}`
                                                        )
                                                    }
                                                    className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20"
                                                >
                                                    {city}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* STATS */}
                        <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center text-white"
                                >
                                    <div className="text-3xl font-bold">
                                        {s.value}
                                    </div>
                                    <div className="flex justify-center gap-2 text-sm text-white/80">
                                        <span>{s.icon}</span>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SearchModal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                initialFilters={{
                    searchTerm: searchQuery,
                    category: selectedCategory,
                }}
            />
        </>
    );
}
