"use client";

import { useState } from "react";
import {
    Search,
    ChevronDown,
    UserCheck,
    CreditCard,
    Map,
    Calendar,
    Shield,
    Star,
    Globe,
    HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openCategory, setOpenCategory] = useState<string | null>("general");

    const categories = [
        {
            id: "general",
            icon: <HelpCircle className="h-5 w-5" />,
            title: "General Questions",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: "guides",
            icon: <UserCheck className="h-5 w-5" />,
            title: "For Guides",
            color: "from-green-500 to-emerald-500"
        },
        {
            id: "travelers",
            icon: <Map className="h-5 w-5" />,
            title: "For Travelers",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: "payments",
            icon: <CreditCard className="h-5 w-5" />,
            title: "Payments & Pricing",
            color: "from-orange-500 to-red-500"
        },
        {
            id: "safety",
            icon: <Shield className="h-5 w-5" />,
            title: "Safety & Trust",
            color: "from-indigo-500 to-blue-500"
        },
        {
            id: "booking",
            icon: <Calendar className="h-5 w-5" />,
            title: "Booking Process",
            color: "from-amber-500 to-yellow-500"
        }
    ];

    const faqs = {
        general: [
            {
                question: "What is LocalEyes?",
                answer: "LocalEyes is a platform connecting travelers with verified local guides for authentic, personalized experiences beyond typical tourist attractions. We help you discover hidden gems through the eyes of locals."
            },
            {
                question: "How does LocalEyes differ from traditional tour companies?",
                answer: "Unlike traditional tours, our experiences are led by passionate locals who share their personal insights, stories, and favorite spots. Experiences are more intimate, flexible, and tailored to your interests."
            },
            {
                question: "Is LocalEyes available worldwide?",
                answer: "Yes! We have guides in over 50 countries across 6 continents. From major cities to remote villages, you can find authentic local experiences almost anywhere."
            }
        ],
        guides: [
            {
                question: "How do I become a LocalEyes guide?",
                answer: "Visit our 'Become a Guide' page, complete the application form, and our team will review your profile. You'll need to provide identification, background information, and details about your proposed experiences."
            },
            {
                question: "What are the requirements to be a guide?",
                answer: "You must be at least 18 years old, have deep local knowledge of your area, speak English or the local language fluently, pass our verification process, and have a passion for sharing your culture."
            },
            {
                question: "How much can I earn as a guide?",
                answer: "Guides set their own prices, typically earning $50-$200 per experience depending on duration, group size, and expertise. Top guides on our platform earn over $3,000 per month."
            }
        ],
        travelers: [
            {
                question: "How do I find the right guide for me?",
                answer: "Use our search filters to find guides by location, language, expertise, and price. Read reviews, check ratings, and look at guide profiles to find someone who matches your interests and travel style."
            },
            {
                question: "What if I need to cancel or reschedule?",
                answer: "Cancellation policies vary by guide, but you can cancel or reschedule through your bookings dashboard. Most guides offer full refunds if cancelled 24-48 hours in advance."
            },
            {
                question: "Can I request a custom experience?",
                answer: "Absolutely! Many guides offer customized experiences. After booking, you can message your guide to discuss personalizing the tour to your specific interests."
            }
        ],
        payments: [
            {
                question: "Is it safe to pay through LocalEyes?",
                answer: "Yes, we use bank-level encryption and secure payment processors. Your payment is held securely until 24 hours after your experience completes, ensuring both parties are protected."
            },
            {
                question: "What payment methods are accepted?",
                answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and in some regions, local payment methods. All transactions are processed securely through our platform."
            },
            {
                question: "Are there any hidden fees?",
                answer: "No hidden fees. The price you see is what you pay. We charge a small service fee (clearly displayed) that helps us maintain the platform, provide 24/7 support, and ensure secure payments."
            }
        ],
        safety: [
            {
                question: "How are guides verified?",
                answer: "Every guide undergoes a thorough verification process including ID verification, background checks, and personal interviews. We also verify their local knowledge and expertise."
            },
            {
                question: "What if I feel unsafe during an experience?",
                answer: "Your safety is our priority. All experiences are reviewed for safety, guides are rated by travelers, and we offer 24/7 emergency support. You can report any concerns immediately through our app."
            },
            {
                question: "Is there insurance coverage?",
                answer: "Yes, all experiences booked through LocalEyes include liability insurance. We also offer 24/7 emergency assistance and have local emergency contacts in every region we operate."
            }
        ],
        booking: [
            {
                question: "How do I book an experience?",
                answer: "Browse experiences, select your preferred date/time, click 'Book Now', enter payment details, and you'll receive instant confirmation. You can then message your guide directly through our platform."
            },
            {
                question: "What happens after I book?",
                answer: "You'll receive a confirmation email with all details. You can message your guide, add the experience to your calendar, and access all information through your bookings dashboard."
            },
            {
                question: "Can I book for a large group?",
                answer: "Yes! Many guides accommodate groups. Check the 'Max Group Size' on each listing, or contact guides directly to discuss custom arrangements for larger parties."
            }
        ]
    };

    const popularQuestions = [
        "How do I become a guide?",
        "Is it safe to book through LocalEyes?",
        "What payment methods do you accept?",
        "Can I cancel my booking?",
        "How are guides verified?"
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                            <HelpCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Help Center</span>
                        </div>

                        <h1 className="text-6xl font-bold tracking-tight mb-6">
                            How can we <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">help</span> you?
                        </h1>

                        <p className="text-2xl text-muted-foreground mb-10">
                            Find answers to common questions about LocalEyes, guides, bookings, and more.
                        </p>

                        {/* Search */}
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-14 pl-12 pr-4 text-lg rounded-2xl"
                            />
                            <Button className="absolute right-2 top-2 h-10 rounded-xl">
                                Search
                            </Button>
                        </div>

                        {/* Popular Questions */}
                        <div className="mt-12 flex flex-wrap justify-center gap-3">
                            {popularQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="rounded-full"
                                    onClick={() => setSearchQuery(question)}
                                >
                                    {question}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setOpenCategory(category.id)}
                                className={`group p-6 rounded-2xl border-2 transition-all duration-500 ${openCategory === category.id
                                    ? 'border-primary bg-card shadow-xl scale-105'
                                    : 'border-border/50 bg-card/50 hover:border-primary/30'
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-xl bg-linear-to-br ${category.color}`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-left">{category.title}</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {faqs[category.id as keyof typeof faqs]?.length} questions
                                    </p>
                                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openCategory === category.id ? 'rotate-180' : ''
                                        }`} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-12 pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {openCategory && (
                                <motion.div
                                    key={openCategory}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        {categories.find(c => c.id === openCategory)?.icon}
                                        <h2 className="text-3xl font-bold">
                                            {categories.find(c => c.id === openCategory)?.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        {faqs[openCategory as keyof typeof faqs]?.map((faq, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group"
                                            >
                                                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                        {faq.question}
                                                    </h3>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-20 bg-linear-to-r from-primary/10 to-pink-500/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Star className="h-16 w-16 mx-auto mb-6 text-primary" />
                        <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
                        <p className="text-xl text-muted-foreground mb-10">
                            Our support team is here to help you 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-3 px-8">
                                <Globe className="h-5 w-5" />
                                Contact Support
                            </Button>
                            <Button size="lg" variant="outline" className="gap-3 px-8">
                                <HelpCircle className="h-5 w-5" />
                                Browse Help Center
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;