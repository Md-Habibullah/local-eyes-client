"use client";

import { motion } from "framer-motion";
import {
    Map,
    Users,
    Headphones,
    ShieldCheck,
    CreditCard,
    Sparkles,
} from "lucide-react";

type Service = {
    icon: React.ElementType;
    title: string;
    description: string;
};

const services: Service[] = [
    {
        icon: Map,
        title: "Curated Local Tours",
        description:
            "Handpicked experiences designed by trusted local guides",
    },
    {
        icon: Users,
        title: "Expert Tour Guides",
        description:
            "Connect with experienced and verified guides who know the area best",
    },
    {
        icon: CreditCard,
        title: "Secure Online Booking",
        description:
            "Fast, safe, and transparent booking with trusted payment methods",
    },
    {
        icon: ShieldCheck,
        title: "Verified & Trusted",
        description:
            "All tours and guides are carefully verified for quality and safety",
    },
    {
        icon: Headphones,
        title: "24/7 Customer Support",
        description:
            "Our support team is always ready to help you anytime, anywhere",
    },
    {
        icon: Sparkles,
        title: "Personalized Experiences",
        description:
            "Tours tailored to your interests, pace, and travel style",
    },
];

export default function ServicesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-transparent to-black/10">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Our{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Services
                        </span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Everything you need for a smooth, safe, and unforgettable journey
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-8 hover:border-white/30 transition"
                            >
                                {/* Glow */}
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition" />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-cyan-300">
                                        <Icon size={28} />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-white font-semibold mb-2">
                                        {service.title}
                                    </h3>

                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
