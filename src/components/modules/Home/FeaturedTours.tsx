/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, MapPin, Clock, Users, Sparkles, ChevronRight, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getTours } from "@/services/tours/getTours";

export default async function FeaturedTours() {
    // Fetch tours on the server
    const toursData = await getTours();
    const tours = toursData.slice(0, 6); // Limit to 6 featured tours

    const CATEGORY_GRADIENTS: Record<string, string> = {
        FOOD: "from-orange-500 to-amber-500",
        ADVENTURE: "from-emerald-500 to-cyan-500",
        HISTORY: "from-amber-600 to-orange-600",
        NATURE: "from-green-500 to-emerald-500",
        CULTURE: "from-purple-500 to-pink-500",
        PHOTOGRAPHY: "from-blue-500 to-indigo-500",
        SHOPPING: "from-rose-500 to-pink-500",
        NIGHTLIFE: "from-violet-500 to-purple-500",
        ART: "from-fuchsia-500 to-purple-500",
        SPORTS: "from-red-500 to-orange-500",
    };

    const CATEGORY_ICONS: Record<string, string> = {
        FOOD: "🍽️",
        ADVENTURE: "🏔️",
        HISTORY: "🏛️",
        NATURE: "🌿",
        CULTURE: "🎭",
        PHOTOGRAPHY: "📸",
        SHOPPING: "🛍️",
        NIGHTLIFE: "🌃",
        ART: "🎨",
        SPORTS: "⚽",
    };

    // Handle empty tours array
    if (!tours || tours.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-primary/10 to-pink-500/10 mb-6">
                    <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Discover Amazing Experiences</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Our local guides are preparing unforgettable journeys for you.
                </p>
                <Link href="/tours">
                    <Button className="gap-2 bg-linear-to-r from-primary to-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <TrendingUp className="h-4 w-4" />
                        Explore All Tours
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

            <div className="relative space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour: any, index: any) => (
                        <div
                            key={tour.id}
                            className="relative group"
                        >
                            {/* Premium & Popular Badges */}
                            {tour.isExclusive && (
                                <div className="absolute top-4 left-4 z-20">
                                    <Badge className="bg-linear-to-r from-amber-500 to-yellow-500 text-white border-none shadow-lg gap-1.5">
                                        <Sparkles className="h-3 w-3" />
                                        Exclusive
                                    </Badge>
                                </div>
                            )}
                            {tour.isPopular && (
                                <div className="absolute top-4 right-4 z-20">
                                    <Badge className="bg-linear-to-r from-red-500 to-pink-500 text-white border-none shadow-lg gap-1.5">
                                        <TrendingUp className="h-3 w-3" />
                                        Trending
                                    </Badge>
                                </div>
                            )}

                            <Card className="relative overflow-hidden border-0 bg-linear-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm shadow-2xl h-full group-hover:shadow-3xl transition-all duration-300">
                                {/* Card Background Glow */}
                                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                                {/* Image Container with Gradient Overlay */}
                                <div className="relative h-56 overflow-hidden">
                                    {tour.images?.[0] ? (
                                        <>
                                            <Image
                                                src={tour.images[0]}
                                                alt={tour.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-all duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-pink-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-primary/20 via-primary/10 to-pink-500/10 flex items-center justify-center">
                                            <span className="text-5xl">{CATEGORY_ICONS[tour.category] || "🌍"}</span>
                                        </div>
                                    )}

                                    {/* Category Badge with Gradient */}
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className={cn(
                                            "font-bold px-4 py-2 border-0 shadow-lg gap-2",
                                            CATEGORY_GRADIENTS[tour.category]
                                                ? `bg-linear-to-r ${CATEGORY_GRADIENTS[tour.category]} text-white`
                                                : "bg-linear-to-r from-gray-600 to-gray-700 text-white"
                                        )}>
                                            <span className="text-sm">{CATEGORY_ICONS[tour.category] || "📍"}</span>
                                            {tour.category || "EXPERIENCE"}
                                        </Badge>
                                    </div>

                                    {/* Price Tag */}
                                    <div className="absolute bottom-4 right-4">
                                        <div className="bg-linear-to-r from-primary/95 to-primary/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl">
                                            <div className="text-white font-bold text-xl">${tour.price || 0}</div>
                                            <div className="text-white/80 text-xs">per person</div>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6 relative z-10">
                                    {/* Title with Gradient Text */}
                                    <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                                        {tour.title || "Premium Local Experience"}
                                    </h3>

                                    {/* Location with Icon */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {tour.city || "Various Locations"}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                                        {tour.description || "Immerse yourself in authentic local culture with expert guidance."}
                                    </p>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="text-center p-3 rounded-lg bg-linear-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
                                            <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                                            <div className="font-bold">{tour.duration || 4}</div>
                                            <div className="text-xs text-muted-foreground">{tour.durationType || "hours"}</div>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-linear-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
                                            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                                            <div className="font-bold">{tour?.maxGroupSize || 0}</div>
                                            <div className="text-xs text-muted-foreground">Group Size</div>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-linear-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
                                            <Star className="h-5 w-5 text-primary mx-auto mb-2" />
                                            <div className="font-bold">{tour?.rating?.toFixed(1) || "5.0"}</div>
                                            <div className="text-xs text-muted-foreground">Rating</div>
                                        </div>
                                    </div>

                                    {/* Guide Info with Hover Effect */}
                                    {tour.guide && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-linear-to-r from-primary/5 to-transparent group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300">
                                            {tour.guide.profilePhoto ? (
                                                <div className="relative">
                                                    <div className="absolute -inset-1 bg-linear-to-r from-primary to-pink-500 rounded-full blur opacity-20" />
                                                    <Image
                                                        src={tour.guide.profilePhoto}
                                                        alt={tour.guide.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full relative border-2 border-white"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-linear-to-r from-primary to-pink-500 flex items-center justify-center text-white font-bold">
                                                    {tour.guide.name?.charAt(0) || "G"}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-bold text-sm">{tour.guide.name || "Expert Guide"}</p>
                                                <p className="text-xs text-muted-foreground">Local Expert</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="p-6 pt-0 relative z-10">
                                    <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                                    <Link href={`/tours/${tour.id}`} className="w-full">
                                        <Button className="w-full group/btn bg-linear-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-white font-bold py-6 rounded-xl">
                                            <span className="flex items-center justify-center gap-2">
                                                <Eye className="h-5 w-5" />
                                                View Experience
                                                <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* View All Button with Gradient Border */}
                {tours.length > 0 && (
                    <div className="text-center pt-8">
                        <Link href="/tours">
                            <Button
                                size="lg"
                                variant="outline"
                                className="group relative overflow-hidden bg-linear-to-r from-transparent via-primary/5 to-transparent hover:shadow-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 py-6 px-10"
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative flex items-center gap-3">
                                    <span className="bg-linear-to-r from-primary via-primary to-pink-500 bg-clip-text text-transparent font-bold text-lg">
                                        Discover All Experiences
                                    </span>
                                    <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}