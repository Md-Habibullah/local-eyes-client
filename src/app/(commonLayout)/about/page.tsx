import { Suspense } from "react";
import {
    Globe,
    Users,
    Sparkles,
    Heart,
    Trophy,
    Shield,
    Compass,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCounter from "@/components/modules/public/StatsCounter";
import TeamMembers from "@/components/modules/public/TeamMembers";

const AboutPage = () => {
    const values = [
        {
            icon: <Heart className="h-10 w-10" />,
            title: "Passion for Authenticity",
            description: "We believe travel should be about real connections, not just checklists."
        },
        {
            icon: <Shield className="h-10 w-10" />,
            title: "Trust & Safety",
            description: "Every guide is verified and reviewed to ensure your peace of mind."
        },
        {
            icon: <Users className="h-10 w-10" />,
            title: "Community First",
            description: "Building bridges between locals and travelers worldwide."
        },
        {
            icon: <Compass className="h-10 w-10" />,
            title: "Endless Discovery",
            description: "Uncovering hidden gems you won't find in guidebooks."
        }
    ];

    const milestones = [
        { year: "2022", title: "Founded", description: "Started with 10 guides in 5 cities" },
        { year: "2023", title: "Expansion", description: "Grew to 500+ guides across 30 countries" },
        { year: "2024", title: "Recognition", description: "Featured in Travel+ Magazine" },
        { year: "2025", title: "Milestone", description: "10,000+ authentic experiences shared" }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.1),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Our Story</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
                            See the world through{' '}
                            <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                                LocalEyes
                            </span>
                        </h1>

                        <p className="text-2xl text-muted-foreground mb-10 leading-relaxed">
                            We&apos;re redefining travel by connecting curious explorers with passionate locals.
                            Because the best stories aren&apos;t found in guidebooks—they&apos;re lived.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/tours">
                                <Button size="lg" className="gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Start Exploring
                                </Button>
                            </Link>
                            <Link href="/become-a-guide">
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Users className="h-5 w-5" />
                                    Become a Guide
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                            <div className="text-5xl font-bold text-primary mb-2">
                                <Suspense fallback={<Skeleton className="h-12 w-32 mx-auto" />}>
                                    <StatsCounter end={50} suffix="+" />
                                </Suspense>
                            </div>
                            <p className="text-muted-foreground">Countries</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                            <div className="text-5xl font-bold text-primary mb-2">
                                <Suspense fallback={<Skeleton className="h-12 w-32 mx-auto" />}>
                                    <StatsCounter end={1000} suffix="+" />
                                </Suspense>
                            </div>
                            <p className="text-muted-foreground">Local Guides</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                            <div className="text-5xl font-bold text-primary mb-2">
                                <Suspense fallback={<Skeleton className="h-12 w-32 mx-auto" />}>
                                    <StatsCounter end={5000} suffix="+" />
                                </Suspense>
                            </div>
                            <p className="text-muted-foreground">Experiences</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                            <div className="text-5xl font-bold text-primary mb-2">
                                <Suspense fallback={<Skeleton className="h-12 w-32 mx-auto" />}>
                                    <StatsCounter end={98} suffix="%" />
                                </Suspense>
                            </div>
                            <p className="text-muted-foreground">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Our Mission & Values</h2>
                        <p className="text-xl text-muted-foreground">
                            To democratize authentic travel by empowering locals to share their passion
                            and helping travelers experience destinations through a genuine lens.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-primary via-pink-500 to-transparent hidden lg:block" />

                        <div className="space-y-12 lg:space-y-0">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    <div className="lg:w-1/2 lg:px-8">
                                        <div className={`p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl transition-all duration-500 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
                                                <Trophy className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-bold">{milestone.year}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                                            <p className="text-muted-foreground">{milestone.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-10 hidden lg:block" />

                                    <div className="lg:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Passionate travelers, tech enthusiasts, and community builders united by one mission.
                        </p>
                    </div>

                    <Suspense fallback={
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <Skeleton key={i} className="h-96 rounded-2xl" />
                            ))}
                        </div>
                    }>
                        <TeamMembers />
                    </Suspense>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-linear-to-br from-primary/5 via-background to-pink-500/5 border border-border/50">
                        <Globe className="h-20 w-20 mx-auto mb-8 text-primary animate-pulse" />
                        <h2 className="text-5xl font-bold mb-6">
                            Ready to see the world differently?
                        </h2>
                        <p className="text-2xl text-muted-foreground mb-10">
                            Join our global community of explorers and storytellers.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="gap-3 px-8 py-6 text-lg">
                                    Start Your Journey
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="gap-3 px-8 py-6 text-lg">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
