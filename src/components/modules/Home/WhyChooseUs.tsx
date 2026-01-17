"use client";

import { ShieldCheck, Globe, Star, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Local Guides",
        description: "Every guide is background-checked and verified for quality experiences",
    },
    {
        icon: Globe,
        title: "Authentic Experiences",
        description: "Explore hidden gems and local cultures beyond tourist traps",
    },
    {
        icon: Star,
        title: "Top Rated Tours",
        description: "Highly rated experiences loved by travelers around the world",
    },
    {
        icon: Wallet,
        title: "Best Price Guarantee",
        description: "Transparent pricing with no hidden charges",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Why Travelers{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Choose Us
                        </span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        We make your journey safe, memorable, and truly local
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-center hover:border-white/30 transition"
                            >
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-cyan-300">
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-white font-semibold mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-white/70">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
