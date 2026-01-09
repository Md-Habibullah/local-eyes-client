/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, MapPin, Tag, Compass, Sparkles, Globe, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";

export default function HeroSection() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Epic Categories with gradient colors
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

    const popularCities = ["Tokyo", "Paris", "Bali", "New York", "Dubai", "Bangkok", "Rome", "Barcelona"];

    // Generate stable particle positions
    const particlePositions = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            // Deterministic calculation (no Math.random)
            const x = ((i * 137) % 100) + '%';
            const y = ((i * 193) % 100) + '%';
            const opacity = 0.3 + ((i * 157) % 70) / 100;
            const yMovement = 20 + ((i * 179) % 80);
            const xMovement = (i * 151) % 50 - 25;
            const duration = 3 + ((i * 163) % 4);
            return { x, y, opacity, yMovement, xMovement, duration };
        });
    }, []);

    // Generate stable floating card positions
    const floatingCardPositions = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const x = ((i * 127) % 100) + 'vw';
            const y = ((i * 199) % 100) + 'vh';
            const rotate = (i * 137) % 360;
            const xMovement = ((i * 151) % 100) - 50;
            const yMovement = ((i * 173) % 100) - 50;
            const rotateMovement = (i * 163) % 180 - 90;
            const duration = 10 + ((i * 157) % 10);
            return { x, y, rotate, xMovement, yMovement, rotateMovement, duration };
        });
    }, []);

    // Set client flag after mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                setMousePosition({ x, y });
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCategory) {
            router.push(`/tours?category=${selectedCategory}&search=${encodeURIComponent(searchQuery)}`);
        } else if (searchQuery.trim()) {
            router.push(`/tours?search=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push("/tours");
        }
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setShowCategoryDropdown(false);
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            setSearchQuery(category.name);
        }
        router.push(`/tours?category=${categoryId}`);
    };

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/tours?category=${categoryId}`);
    };

    const handleCityClick = (city: string) => {
        setSearchQuery(city);
        router.push(`/tours?search=${encodeURIComponent(city)}`);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSelectedCategory("");
    };

    const stats = [
        { value: "500+", label: "Verified Guides", icon: "👨‍✈️" },
        { value: "50+", label: "Countries", icon: "🌍" },
        { value: "10K+", label: "Happy Travelers", icon: "😊" },
        { value: "4.9", label: "Avg Rating", icon: "⭐" }
    ];

    return (
        <>
            <section
                ref={containerRef}
                className="py-12 relative min-h-screen flex items-center justify-center overflow-hidden"
                style={isClient ? {
                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                    transition: "transform 0.1s ease-out"
                } : undefined}
            >
                {/* INSANE ANIMATED BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Base Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900" />

                    {/* Animated Gradient Mesh */}
                    {isClient && (
                        <>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" style={{ animationDelay: '1s' }} />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" style={{ animationDelay: '2s' }} />
                        </>
                    )}

                    {/* Floating Particles */}
                    <div className="absolute inset-0">
                        {particlePositions.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                initial={{
                                    x: particle.x,
                                    y: particle.y,
                                    opacity: particle.opacity
                                }}
                                animate={isClient ? {
                                    y: [null, `-${particle.yMovement}px`],
                                    x: [null, `${particle.xMovement}px`]
                                } : undefined}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    left: particle.x,
                                    top: particle.y,
                                    opacity: particle.opacity
                                }}
                            />
                        ))}
                    </div>

                    {/* Animated Grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />

                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 backdrop-blur-[100px] bg-white/5" />
                </div>

                {/* FLOATING ELEMENTS */}
                <div className="absolute inset-0 overflow-hidden">
                    {floatingCardPositions.map((card, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-32 h-32 rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 shadow-2xl"
                            initial={{
                                x: card.x,
                                y: card.y,
                                rotate: card.rotate
                            }}
                            animate={isClient ? {
                                x: [null, `+${card.xMovement}px`],
                                y: [null, `+${card.yMovement}px`],
                                rotate: [null, card.rotateMovement]
                            } : undefined}
                            transition={{
                                duration: card.duration,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            style={{
                                left: card.x,
                                top: card.y,
                                transform: `rotate(${card.rotate}deg)`
                            }}
                        />
                    ))}
                </div>

                {/* Content - Super Centered */}
                <div className="relative z-10 container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Animated Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-center mb-16"
                        >
                            {/* Animated Badge */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 mb-8"
                            >
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                <span className="text-sm font-medium bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                                    🌟 #1 Travel Experience Platform
                                </span>
                                <Star className="h-4 w-4 text-yellow-400" />
                            </motion.div>

                            {/* Main Title with Gradient */}
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
                                <span className="relative">
                                    {isClient && (
                                        <>
                                            <span className="absolute top-0 left-0 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-glitch-1">
                                                EXPLORE
                                            </span>
                                            <span className="absolute top-0 left-0 bg-linear-to-r from-purple-400 via-pink-500 to-red-600 bg-clip-text text-transparent animate-glitch-2">
                                                EXPLORE
                                            </span>
                                        </>
                                    )}
                                    <span className="relative bg-linear-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                                        EXPLORE
                                    </span>
                                </span>
                                <br />
                                <motion.span
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                                >
                                    LIKE NEVER BEFORE
                                </motion.span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto font-light tracking-wide"
                            >
                                Immerse yourself in authentic experiences with local experts who know the soul of their cities
                            </motion.p>
                        </motion.div>

                        {/* EPIC SEARCH CARD - Glass Morphism Masterpiece */}
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative group"
                        >
                            {/* Glowing Border Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                            {/* Main Card */}
                            <Card className="relative border-white/30 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl">
                                <CardContent className="p-8 md:p-12">
                                    <form onSubmit={handleSearch} className="space-y-8">
                                        {/* MAGIC SEARCH BAR */}
                                        <div className="relative">
                                            {/* Animated Background */}
                                            {isClient && (
                                                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-xl animate-pulse" />
                                            )}

                                            <div className="relative flex items-center bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl shadow-inner border border-white/20 overflow-hidden">
                                                {/* Category Button */}
                                                <motion.button
                                                    type="button"
                                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                                    className="flex items-center gap-3 px-6 py-4 h-full border-r border-white/20 hover:bg-white/10 transition-all duration-300 group/btn"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <div className="relative">
                                                        <Tag className="h-6 w-6 text-white/80 group-hover/btn:text-white transition-colors" />
                                                        {isClient && (
                                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                                                        )}
                                                    </div>
                                                    <span className="text-lg font-medium text-white">
                                                        {selectedCategory
                                                            ? categories.find(c => c.id === selectedCategory)?.name
                                                            : "All Categories"
                                                        }
                                                    </span>
                                                    <ChevronRight className={`h-5 w-5 text-white/60 transition-transform duration-300 ${showCategoryDropdown ? 'rotate-90' : ''}`} />
                                                </motion.button>

                                                {/* Search Input */}
                                                <div className="flex-1 flex items-center px-6">
                                                    <Search className="h-6 w-6 text-white/60 mr-4" />
                                                    <Input
                                                        type="text"
                                                        placeholder="Where would you like to go? Search destinations, tours..."
                                                        className="flex-1 border-0 bg-transparent px-0 h-14 text-xl text-white placeholder:text-white/50 focus:ring-0 focus:outline-none placeholder:text-lg"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />

                                                    {searchQuery && (
                                                        <motion.button
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            type="button"
                                                            onClick={clearSearch}
                                                            className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                                        >
                                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </motion.button>
                                                    )}
                                                </div>

                                                {/* Search Button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        className="h-14 px-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 shadow-2xl hover:shadow-cyan-500/25 rounded-l-none border-l border-white/20"
                                                    >
                                                        <Search className="h-6 w-6 mr-3" />
                                                        <span className="text-lg font-semibold">Explore Now</span>
                                                    </Button>
                                                </motion.div>
                                            </div>

                                            {/* Category Dropdown */}
                                            <AnimatePresence>
                                                {showCategoryDropdown && (
                                                    <>
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="fixed inset-0 z-40"
                                                            onClick={() => setShowCategoryDropdown(false)}
                                                        />
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                            className="absolute top-full left-0 mt-4 w-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden"
                                                        >
                                                            <div className="p-6">
                                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                                    <Compass className="h-5 w-5" />
                                                                    Choose Your Experience
                                                                </h3>
                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                    {categories.map((category) => (
                                                                        <motion.button
                                                                            key={category.id}
                                                                            type="button"
                                                                            onClick={() => handleCategorySelect(category.id)}
                                                                            whileHover={{ scale: 1.05 }}
                                                                            whileTap={{ scale: 0.95 }}
                                                                            className={`relative overflow-hidden group/cat p-4 rounded-xl border transition-all duration-300 ${selectedCategory === category.id
                                                                                ? 'border-white/40 bg-white/10'
                                                                                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                                                                                }`}
                                                                        >
                                                                            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover/cat:opacity-20 transition-opacity duration-300`} />
                                                                            <div className="relative z-10 flex items-center gap-3">
                                                                                <span className="text-2xl">{category.icon}</span>
                                                                                <span className="text-white font-medium">{category.name}</span>
                                                                            </div>
                                                                        </motion.button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* QUICK CATEGORIES - Floating Cards */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/80">
                                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                                <span className="text-lg font-semibold">Trending Experiences</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {categories.map((category) => (
                                                    <motion.button
                                                        key={category.id}
                                                        type="button"
                                                        onClick={() => handleCategoryClick(category.id)}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            y: -5
                                                        }}
                                                        whileTap={{ scale: 0.95 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                        className="group/quick relative"
                                                    >
                                                        <div className={`absolute -inset-1 bg-gradient-to-br ${category.gradient} rounded-2xl blur opacity-0 group-hover/quick:opacity-50 transition-opacity duration-300`} />
                                                        <div className="relative flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover/quick:border-white/40 transition-all duration-300">
                                                            <span className="text-2xl group-hover/quick:scale-110 transition-transform duration-300">
                                                                {category.icon}
                                                            </span>
                                                            <span className="text-white font-medium">
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* POPULAR CITIES - Globe Animation */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/80">
                                                <Globe className="h-5 w-5 text-cyan-400" />
                                                <span className="text-lg font-semibold">Popular Destinations</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {popularCities.map((city, index) => (
                                                    <motion.button
                                                        key={city}
                                                        type="button"
                                                        onClick={() => handleCityClick(city)}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                                                    >
                                                        {city}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* EPIC STATS BAR - Floating */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1, type: "spring", bounce: 0.5 }}
                                    whileHover={{ scale: 1.1, y: -10 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative p-6 text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300">
                                        <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-white/80">
                                            <span className="text-2xl">{stat.icon}</span>
                                            <span className="text-sm font-medium">{stat.label}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* SCROLL INDICATOR - Animated */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.span
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white/60 text-sm tracking-wider"
                        >
                            SCROLL TO DISCOVER
                        </motion.span>
                        <div className="relative">
                            <div className="h-16 w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600" />
                            <motion.div
                                animate={{ y: [0, 64, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Custom Animations CSS */}
            <style jsx global>{`
                @keyframes gridMove {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(-50px) translateX(-50px); }
                }
                @keyframes glitch-1 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                }
                @keyframes glitch-2 {
                    0%, 100% { transform: translate(0); }
                    10% { transform: translate(2px, -1px); }
                    30% { transform: translate(-3px, 0); }
                    50% { transform: translate(-1px, 2px); }
                    70% { transform: translate(1px, -1px); }
                    90% { transform: translate(2px, 2px); }
                }
                .animate-glitch-1 {
                    animation: glitch-1 2s infinite linear alternate-reverse;
                }
                .animate-glitch-2 {
                    animation: glitch-2 3s infinite linear alternate-reverse;
                    animation-delay: 0.5s;
                }
            `}</style>

            {/* Search Modal */}
            <SearchModal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                initialFilters={{
                    searchTerm: searchQuery,
                    category: selectedCategory
                }}
            />
        </>
    );
}