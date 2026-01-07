"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import SearchModal from "./SearchModal";

export default function HeroSection() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    // Quick search state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [peopleCount, setPeopleCount] = useState("1");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (searchQuery) params.append('search', searchQuery);
        if (selectedCity) params.append('city', selectedCity);
        if (selectedDate) params.append('date', selectedDate);

        router.push(`/tours?${params.toString()}`);
    };

    const handleAdvancedSearch = () => {
        setShowSearchModal(true);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/tours?category=${category.toUpperCase()}`);
    };

    const stats = [
        { value: "500+", label: "Verified Guides" },
        { value: "50+", label: "Countries" },
        { value: "10K+", label: "Happy Travelers" },
        { value: "4.9", label: "Average Rating" }
    ];

    const quickCategories = ["Adventure", "Food", "Culture", "History", "Nature", "Photography"];

    // Sample popular cities (you can fetch these from API)
    const popularCities = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar", "Khulna", "Rajshahi"];

    return (
        <>
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop')`
                        }}
                    />

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-transparent to-primary/20 animate-gradient-x" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Animated Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                                <span className="bg-linear-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                                    Travel Like a Local
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                                Discover hidden gems and authentic experiences with verified local guides worldwide
                            </p>
                        </motion.div>

                        {/* Search Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
                                <CardContent className="p-6">
                                    <form onSubmit={handleQuickSearch} className="space-y-4">
                                        {/* Main Search Row */}
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Destination with popular cities */}
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        type="text"
                                                        placeholder="Where do you want to go?"
                                                        className="pl-10 h-12 bg-white/90 border-white/20"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        list="popular-cities"
                                                    />
                                                    <datalist id="popular-cities">
                                                        {popularCities.map(city => (
                                                            <option key={city} value={city} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                            </div>

                                            {/* Date Input */}
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        type="date"
                                                        placeholder="Select date"
                                                        className="pl-10 h-12 bg-white/90 border-white/20"
                                                        value={selectedDate}
                                                        onChange={(e) => setSelectedDate(e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                            </div>

                                            {/* People Input */}
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        type="number"
                                                        placeholder="People"
                                                        min="1"
                                                        max="20"
                                                        className="pl-10 h-12 bg-white/90 border-white/20"
                                                        value={peopleCount}
                                                        onChange={(e) => setPeopleCount(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            >
                                                <Search className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                                                Search Tours
                                            </Button>

                                            <Button
                                                type="button"
                                                size="lg"
                                                variant="outline"
                                                className="border-white/20 text-white hover:bg-white/10"
                                                onClick={handleAdvancedSearch}
                                            >
                                                <Filter className="h-5 w-5 mr-2" />
                                                Advanced Filters
                                            </Button>
                                        </div>
                                    </form>

                                    {/* Quick Filters */}
                                    <div className="mt-6 pt-6 border-t border-white/20">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {quickCategories.map((tag) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleCategoryClick(tag)}
                                                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Popular Cities */}
                                        <div className="mt-4">
                                            <p className="text-sm text-white/70 text-center mb-2">Popular: </p>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {popularCities.slice(0, 5).map((city) => (
                                                    <button
                                                        key={city}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCity(city);
                                                            router.push(`/tours?city=${city}`);
                                                        }}
                                                        className="text-sm text-white/80 hover:text-white px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                                                    >
                                                        {city}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/80">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/70 text-sm">Scroll to explore</span>
                        <div className="h-10 w-px bg-linear-to-b from-white/50 to-transparent" />
                    </div>
                </motion.div>
            </section>

            {/* Search Modal */}
            <SearchModal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                initialFilters={{
                    searchTerm: searchQuery,
                    city: selectedCity,
                    date: selectedDate
                }}
            />
        </>
    );
}