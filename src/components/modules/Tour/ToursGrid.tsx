// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Eye, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface Tour {
    id: string;
    title: string;
    description: string;
    city: string;
    price: number;
    duration: number;
    maxGroupSize: number;
    category: string;
    images: string[];
    guide: {
        id: string;
        name: string;
        profilePhoto?: string | null;
    };
}

interface ToursGridProps {
    tours: Tour[];
}

const categoryLabels: Record<string, string> = {
    ADVENTURE: "Adventure",
    FOOD: "Food",
    HISTORY: "History",
    NATURE: "Nature",
    CULTURE: "Culture",
    SHOPPING: "Shopping",
    PHOTOGRAPHY: "Photography",
    NIGHTLIFE: "Nightlife",
    SPORTS: "Sports",
    ART: "Art"
};

export default function ToursGrid({ tours }: ToursGridProps) {
    if (!tours || tours.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => {
                const imageUrl = tour.images?.[0] || null;
                const categoryLabel = categoryLabels[tour.category] || tour.category;
                const guideName = tour.guide?.name || "Local Guide";
                const guideAvatar = tour.guide?.profilePhoto || null;

                return (
                    <div key={tour.id} className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border">
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={tour.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                    <Eye className="h-12 w-12 text-blue-200" />
                                </div>
                            )}

                            {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-white/95 text-sm font-medium rounded-full shadow-sm">
                                    {categoryLabel}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="absolute top-3 right-3">
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-black/80 text-white rounded-full text-sm font-semibold">
                                    <DollarSign className="h-3 w-3" />
                                    <span>{tour.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Title & Description */}
                            <h3 className="font-bold text-lg mb-2 line-clamp-1">
                                {tour.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {tour.description || "Join this amazing tour experience."}
                            </p>

                            {/* Location */}
                            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{tour.city}</span>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm font-medium">{tour.duration}h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm font-medium">Max {tour.maxGroupSize}</span>
                                </div>
                            </div>

                            {/* Guide & Button */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        {guideAvatar ? (
                                            <AvatarImage src={guideAvatar} alt={guideName} />
                                        ) : (
                                            <AvatarFallback className="bg-blue-100 text-blue-600">
                                                {guideName.charAt(0)}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <p className="text-xs text-gray-500">Guide</p>
                                        <p className="text-sm font-medium">{guideName}</p>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Link href={`/tours/${tour.id}`}>
                                        View Tour
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}