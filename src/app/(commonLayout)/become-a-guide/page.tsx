import { Mail, Users, Globe, Star, Shield, DollarSign, Calendar, MapPin, Sparkles, ArrowRight, CheckCircle, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BecomeAGuidePage() {
    const benefits = [
        {
            icon: DollarSign,
            title: "Earn Money",
            description: "Turn your local knowledge into income. Set your own rates and earn competitive commissions."
        },
        {
            icon: Globe,
            title: "Flexible Schedule",
            description: "Choose your own hours. Work full-time or part-time, whenever it suits you."
        },
        {
            icon: Users,
            title: "Meet Travelers",
            description: "Connect with interesting people from around the world and share cultural experiences."
        },
        {
            icon: Star,
            title: "Build Reputation",
            description: "Gain reviews and ratings to establish yourself as a trusted local expert."
        },
        {
            icon: Shield,
            title: "Full Support",
            description: "We handle marketing, payments, and insurance. You focus on guiding."
        },
        {
            icon: Award,
            title: "Recognition",
            description: "Get featured as a top guide and receive badges for excellence."
        }
    ];

    const requirements = [
        "Legal right to work in your country",
        "At least 18 years old",
        "Excellent knowledge of local area",
        "Good communication skills in English or local language",
        "Passion for sharing local culture",
        "Smartphone with internet access"
    ];

    const steps = [
        {
            number: "01",
            title: "Apply Online",
            description: "Fill out our simple application form"
        },
        {
            number: "02",
            title: "Interview",
            description: "Quick video call to learn about you"
        },
        {
            number: "03",
            title: "Training",
            description: "Complete our free online training"
        },
        {
            number: "04",
            title: "Get Verified",
            description: "Background check & verification"
        },
        {
            number: "05",
            title: "Create Tours",
            description: "Design unique experiences"
        },
        {
            number: "06",
            title: "Start Earning",
            description: "Welcome your first travelers!"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 dark:from-primary/10 dark:via-purple-900/10 dark:to-blue-900/10" />
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />

                <div className="container relative mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border border-primary/20 dark:border-primary/30 mb-6">
                            <Sparkles className="h-4 w-4 text-primary dark:text-primary/90" />
                            <span className="text-sm font-semibold text-primary dark:text-primary/90">
                                Join Our Community
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            <span className="bg-gradient-to-r from-gray-900 via-primary to-gray-900 dark:from-gray-100 dark:via-primary/90 dark:to-gray-100 bg-clip-text text-transparent">
                                Become a Local Guide
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            Share your passion for your city and earn money doing what you love
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <a
                                href="mailto:mdhabibullah.work@gmail.com?subject=Guide Application - LocalEyes&body=Hello,%0D%0A%0D%0AI'm interested in becoming a guide with LocalEyes. Please send me more information about the application process.%0D%0A%0D%0ABest regards,"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white hover:from-primary/90 hover:to-purple-600/90"
                            >
                                <Mail className="h-5 w-5" />
                                Apply Now
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>

                            <Link href="/guides">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 border-2 border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 hover:bg-primary/5 dark:hover:bg-primary/10"
                                >
                                    <Users className="h-5 w-5" />
                                    Meet Our Guides
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-primary/90 mb-2">500+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Guides</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-primary/90 mb-2">50+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-primary/90 mb-2">$100K+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Earned by Guides</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-primary/90 mb-2">4.9</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Guide Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Why Become a Guide?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Join our community of passionate locals and enjoy these benefits
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <Card
                                key={index}
                                className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 group"
                            >
                                <CardContent className="p-6">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <benefit.icon className="h-6 w-6 text-primary dark:text-primary/90" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                How It Works
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Start your journey in 6 simple steps
                            </p>
                        </div>

                        <div className="relative">
                            {/* Connecting Line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                                {steps.map((step, index) => (
                                    <div key={index} className="relative">
                                        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center h-full">
                                            <CardContent className="p-6">
                                                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 bg-clip-text text-transparent mb-4">
                                                    {step.number}
                                                </div>
                                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {step.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Requirements
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            What you need to get started
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {requirements.map((requirement, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                            >
                                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                                <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 dark:from-primary/20 dark:via-purple-900/20 dark:to-blue-900/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 mb-6">
                            <Heart className="h-10 w-10 text-white" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Ready to Share Your City?
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            Join our community of passionate local guides and start creating unforgettable experiences for travelers.
                            Email us today to begin your journey!
                        </p>

                        {/* Contact Email */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-primary dark:text-primary/90" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Send us an email at</p>
                                    <a
                                        href="mailto:mdhabibullah.work@gmail.com"
                                        className="text-xl font-bold text-primary dark:text-primary/90 hover:underline"
                                    >
                                        mdhabibullah.work@gmail.com
                                    </a>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Include your name, location, and why you&apos;d make a great guide. We&apos;ll get back to you within 48 hours.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <a
                            href="mailto:mdhabibullah.work@gmail.com?subject=Guide Application - LocalEyes&body=Hello LocalEyes team,%0D%0A%0D%0AI am excited to apply as a guide! Here's why I'd be a great addition to your community:%0D%0A%0D%0A• I live in: [Your City/Region]%0D%0A• My expertise: [Your expertise - history, food, nature, etc.]%0D%0A• Why I want to be a guide: [Brief explanation]%0D%0A%0D%0APlease send me the application details.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white"
                        >
                            <Mail className="h-5 w-5" />
                            Email Us to Apply
                            <ArrowRight className="h-5 w-5" />
                        </a>

                        {/* Additional Info */}
                        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Application process typically takes 5-7 business days. We provide full training and support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}