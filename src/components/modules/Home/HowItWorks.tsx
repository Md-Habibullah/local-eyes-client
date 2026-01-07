import { Search, Calendar, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Discover Tours",
            description: "Browse authentic experiences from local guides worldwide.",
            color: "text-blue-600 bg-blue-100"
        },
        {
            icon: Calendar,
            title: "Book Your Date",
            description: "Choose your preferred date and group size for the tour.",
            color: "text-purple-600 bg-purple-100"
        },
        {
            icon: Users,
            title: "Meet Your Guide",
            description: "Connect with your local guide and get personalized tips.",
            color: "text-green-600 bg-green-100"
        },
        {
            icon: Star,
            title: "Share Your Experience",
            description: "Leave reviews and help other travelers discover great guides.",
            color: "text-amber-600 bg-amber-100"
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Get started with LocalEyes in four simple steps
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative">
                                <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col items-center">
                                            {/* Step Number */}
                                            <div className="relative mb-4">
                                                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${step.color} mb-4`}>
                                                    <step.icon className="h-6 w-6" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl">{step.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-muted-foreground mb-6">
                        Ready to start your adventure?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register?role=tourist"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Sign Up as Traveler
                        </Link>
                        <Link
                            href="/become-a-guide"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            Become a Guide
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}