"use client";

import { motion } from "framer-motion";
import {
    Map,
    Users,
    Headphones,
    ShieldCheck,
    CreditCard,
    Sparkles,
    Globe,
    Award,
    Clock,
    CheckCircle
} from "lucide-react";

type Service = {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    gradient: string;
    delay: number;
};

const services: Service[] = [
    {
        icon: Map,
        title: "Curated Local Tours",
        description: "Handpicked experiences designed by trusted local guides",
        features: ["Local expertise", "Hidden gems", "Cultural immersion"],
        gradient: "from-blue-500 to-cyan-500",
        delay: 0.1
    },
    {
        icon: Users,
        title: "Expert Tour Guides",
        description: "Connect with experienced and verified guides who know the area best",
        features: ["Verified professionals", "Local knowledge", "Multilingual"],
        gradient: "from-blue-500 to-indigo-500",
        delay: 0.2
    },
    {
        icon: CreditCard,
        title: "Secure Online Booking",
        description: "Fast, safe, and transparent booking with trusted payment methods",
        features: ["SSL secure", "Multiple payments", "Instant confirmation"],
        gradient: "from-blue-600 to-purple-600",
        delay: 0.3
    },
    {
        icon: ShieldCheck,
        title: "Verified & Trusted",
        description: "All tours and guides are carefully verified for quality and safety",
        features: ["Background checks", "Quality assurance", "Safety first"],
        gradient: "from-blue-500 to-violet-500",
        delay: 0.4
    },
    {
        icon: Headphones,
        title: "24/7 Customer Support",
        description: "Our support team is always ready to help you anytime, anywhere",
        features: ["24/7 availability", "Multilingual support", "Quick response"],
        gradient: "from-cyan-500 to-blue-500",
        delay: 0.5
    },
    {
        icon: Sparkles,
        title: "Personalized Experiences",
        description: "Tours tailored to your interests, pace, and travel style",
        features: ["Custom itineraries", "Flexible scheduling", "Personal guide"],
        gradient: "from-blue-400 to-purple-500",
        delay: 0.6
    },
];

export default function ServicesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Our Services
                        </span>
                        <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        Premium{" "}
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                                Services
                            </span>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 transition-colors duration-300"
                            />
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Everything you need for a seamless, safe, and unforgettable travel experience
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
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                                whileHover={{
                                    y: -10,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                                className="relative group"
                            >
                                {/* Main Card */}
                                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 transition-all duration-500 overflow-hidden h-full hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl">
                                    {/* Gradient accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />

                                    {/* Hover overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`} />

                                    {/* Pattern dots */}
                                    <div className="absolute top-4 right-4 opacity-5">
                                        <div className="grid grid-cols-3 gap-1">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-current"></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Icon Container */}
                                    <div className="relative mb-6">
                                        <div className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-700">
                                            {/* Icon background */}
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`} />

                                            {/* Icon */}
                                            <Icon
                                                size={30}
                                                className="relative z-10 transition-all duration-300 text-gray-700 dark:text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
                                            />
                                        </div>

                                        {/* Number badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative space-y-4">
                                        <h3 className="font-bold text-xl transition-all duration-300 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                            {service.description}
                                        </p>

                                        {/* Features list */}
                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Learn More Button */}
                                    <div className="mt-8">
                                        <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="rounded-2xl border border-blue-100 dark:border-blue-800 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-purple-900/20 transition-colors duration-300">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                    Flexible Scheduling
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    Choose dates that work for you
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                    Global Coverage
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    Tours available worldwide
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white mb-4">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                    Award Winning
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    Recognized excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            Ready to Start Your Journey?
                        </h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            Join thousands of satisfied travelers who have experienced the world with us
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                                Explore All Tours
                            </button>
                            <button className="px-8 py-3 rounded-full border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                Contact Our Team
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}