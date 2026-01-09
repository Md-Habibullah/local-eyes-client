/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { Search, Sparkles, Users, Globe, Award, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGuides } from "@/services/guide/getGuides";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Expert Local Guides | Travel with Locals",
    description: "Discover passionate local guides ready to create unforgettable experiences for you.",
};

export const revalidate = 3600;

export default async function GuidesPage() {
    const guides = await getGuides();

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-pink-500/10" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

                <div className="relative container mx-auto px-4 py-16 lg:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-linear-to-r from-primary/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary/30">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Expert Local Guides</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Meet Your Perfect
                            <span className="block text-transparent bg-linear-to-r from-primary via-primary to-pink-500 bg-clip-text">
                                Local Guide
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Connect with passionate locals who know their cities inside out.
                            From hidden gems to cultural insights, experience destinations through the eyes of those who call them home.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto mb-10">
                            <div className="text-center p-4 rounded-xl bg-linear-to-b from-card/50 to-card/30 backdrop-blur-sm border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">{guides.length}+</div>
                                <div className="text-sm text-muted-foreground">Expert Guides</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-linear-to-b from-card/50 to-card/30 backdrop-blur-sm border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">120+</div>
                                <div className="text-sm text-muted-foreground">Cities</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-linear-to-b from-card/50 to-card/30 backdrop-blur-sm border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                                <div className="text-sm text-muted-foreground">Satisfaction</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-linear-to-b from-card/50 to-card/30 backdrop-blur-sm border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">40+</div>
                                <div className="text-sm text-muted-foreground">Languages</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            {/* <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-linear-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search guides by name, city, or expertise..."
                                        className="pl-12 h-14 text-lg border-primary/20 focus:border-primary/40 bg-white/5 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="h-14 px-8 bg-linear-to-r from-primary to-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Find Guides
                            </Button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Features Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="text-center p-6 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-primary to-primary/80 mb-4">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Verified & Vetted</h3>
                        <p className="text-sm text-muted-foreground">
                            All guides undergo thorough background checks and training
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-primary to-primary/80 mb-4">
                            <Award className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Local Experts</h3>
                        <p className="text-sm text-muted-foreground">
                            True insiders with deep knowledge of their cities
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-primary to-primary/80 mb-4">
                            <Globe className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Global Network</h3>
                        <p className="text-sm text-muted-foreground">
                            Guides available in 120+ cities across the world
                        </p>
                    </div>
                </div>
            </div>

            {/* Guides List */}
            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Available Guides
                        <span className="text-primary ml-2">({guides.length})</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Click on any guide to view detailed information
                    </p>
                </div>

                <Suspense fallback={<GuidesListSkeleton />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.map((guide: any) => (
                            <Link
                                href={`/guides/${guide.id}`}
                                key={guide.id}
                                className="group"
                            >
                                <div className="bg-linear-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="relative">
                                            {/* Profile Photo with Next.js Image */}
                                            <div className="relative">
                                                {guide.profilePhoto ? (
                                                    <div className="h-20 w-20 rounded-full overflow-hidden relative">
                                                        <Image
                                                            src={guide.profilePhoto}
                                                            alt={guide.name || "Guide"}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                            priority={false}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-20 w-20 rounded-full bg-linear-to-r from-primary to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                                                        {guide.name?.charAt(0) || "G"}
                                                    </div>
                                                )}
                                                {guide.isVerified && (
                                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                                        <Shield className="h-3 w-3 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                                {guide.name || "Local Guide"}
                                            </h3>
                                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                <Globe className="h-3 w-3 mr-1" />
                                                {guide.address || "Various Cities"}, {guide.country || "Worldwide"}
                                            </div>
                                            {guide.rating && (
                                                <div className="flex items-center">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="ml-1 text-sm font-medium">
                                                        {guide.rating.toFixed(1)}
                                                    </span>
                                                    <span className="ml-1 text-sm text-muted-foreground">
                                                        ({guide.reviewCount || 0} reviews)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {guide.bio || "Passionate local guide with extensive knowledge of the area."}
                                        </p>

                                        {guide.expertise && guide.expertise.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {guide.expertise.slice(0, 3).map((skill: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {guide.expertise.length > 3 && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                                        +{guide.expertise.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-white/10">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-lg font-bold text-primary">
                                                        ${guide.dailyRate || 50}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground ml-1">/hour</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="bg-linear-to-r from-primary to-primary/80 hover:shadow-md"
                                                >
                                                    View Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Suspense>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-pink-500/20 p-12">
                        <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Want to Share Your City?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Join our community of passionate local guides and turn your knowledge into unforgettable experiences.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-linear-to-r from-primary to-pink-500 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    <Users className="h-5 w-5 mr-2" />
                                    Become a Guide
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary/30 hover:border-primary/50"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Skeleton loading component
function GuidesListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-card/50 rounded-2xl p-6 h-full">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="h-20 w-20 rounded-full bg-primary/20" />
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-primary/20 rounded w-3/4" />
                                <div className="h-3 bg-primary/20 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-3 bg-primary/20 rounded w-full" />
                            <div className="h-3 bg-primary/20 rounded w-5/6" />
                            <div className="h-3 bg-primary/20 rounded w-4/6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}