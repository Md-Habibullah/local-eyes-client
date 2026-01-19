"use client";

import { ShieldCheck, Globe, Star, Wallet, Sparkles, Zap, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Local Guides",
        description: "Every guide is background-checked and verified for quality experiences",
        gradient: "from-blue-500 to-purple-600",
        iconBg: "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"
    },
    {
        icon: Globe,
        title: "Authentic Experiences",
        description: "Explore hidden gems and local cultures beyond tourist traps",
        gradient: "from-blue-400 to-purple-500",
        iconBg: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"
    },
    {
        icon: Star,
        title: "Top Rated Tours",
        description: "Highly rated experiences loved by travelers around the world",
        gradient: "from-blue-600 to-purple-700",
        iconBg: "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"
    },
    {
        icon: Wallet,
        title: "Best Price Guarantee",
        description: "Transparent pricing with no hidden charges",
        gradient: "from-blue-500 to-indigo-600",
        iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
        icon: Sparkles,
        title: "Premium Quality",
        description: "Only the finest experiences curated for discerning travelers",
        gradient: "from-cyan-500 to-blue-600",
        iconBg: "bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20"
    },
    {
        icon: Zap,
        title: "Instant Booking",
        description: "Secure your spot instantly with our seamless booking system",
        gradient: "from-blue-500 to-violet-600",
        iconBg: "bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/20 dark:to-violet-900/20"
    },
    {
        icon: Target,
        title: "Perfectly Curated",
        description: "Every tour is carefully designed for maximum enjoyment",
        gradient: "from-indigo-500 to-purple-600",
        iconBg: "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20"
    },
    {
        icon: Heart,
        title: "Traveler Loved",
        description: "Join thousands of satisfied travelers worldwide",
        gradient: "from-blue-400 to-purple-500",
        iconBg: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6"
                    >
                        <div className="flex items-center gap-2 rounded-full px-6 py-2 border bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 border-blue-100 dark:border-blue-800 transition-colors duration-300">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Why Choose Us
                            </span>
                        </div>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        Why Travelers{" "}
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                                Trust Us
                            </span>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute -bottom-2 left-0 w-full h-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 transition-colors duration-300"
                            />
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Experience travel with confidence through our comprehensive services and dedicated support
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 transition-all duration-300 h-full overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl">
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`} />

                                    {/* Corner accents */}
                                    <div className={`absolute top-0 left-0 w-12 h-12 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-br-2xl transition-all duration-500`} />
                                    <div className={`absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-tl-2xl transition-all duration-500`} />

                                    {/* Icon Container */}
                                    <div className={`relative mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 border ${item.iconBg} border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-700`}>
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
                                        <Icon
                                            size={28}
                                            className="relative z-10 transition-all duration-300 text-gray-700 dark:text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
                                        />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-bold text-xl mb-3 transition-all duration-300 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                        {item.description}
                                    </p>

                                    {/* Bottom line indicator */}
                                    <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "10K+", label: "Happy Travelers", color: "from-blue-500 to-purple-600" },
                            { value: "500+", label: "Local Guides", color: "from-blue-600 to-purple-700" },
                            { value: "4.9", label: "Avg Rating", color: "from-blue-400 to-purple-500" },
                            { value: "98%", label: "Satisfaction", color: "from-blue-500 to-indigo-600" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg">
                                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
                >
                    <p className="text-center text-sm mb-6 text-gray-600 dark:text-gray-500 transition-colors duration-300">
                        Trusted by leading travel organizations
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                        {["TripAdvisor", "Lonely Planet", "National Geographic", "Forbes Travel", "Travel + Leisure"].map((name, index) => (
                            <div key={index} className="transition-colors duration-300 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                                <div className="text-lg font-bold">{name}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}