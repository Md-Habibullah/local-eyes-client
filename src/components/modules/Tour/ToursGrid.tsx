import { SearchFilters } from "@/services/home/search.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Clock, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

interface Tour {
    id: string;
    title: string;
    description: string;
    city: string;
    price: number;
    duration: number;
    maxGroupSize: number;
    rating: number;
    reviewCount: number;
    category: string;
    languages: string[];
    guide: {
        name: string;
        avatar?: string;
    };
    images?: string[];
}

interface ToursGridProps {
    tours: Tour[];
    total: number;
    currentPage: number;
    filters: SearchFilters;
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

export default function ToursGrid({ tours, total, currentPage, filters }: ToursGridProps) {
    if (tours.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                    <p>Try adjusting your search filters to find more tours.</p>
                </div>
                <Button variant="outline">Clear all filters</Button>
            </div>
        );
    }

    const totalPages = Math.ceil(total / (filters.limit || 12));
    const limit = filters.limit || 12;
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="p-0">
                            {/* Tour Image with Next.js Image */}
                            <div className="aspect-4/3 relative overflow-hidden">
                                {tour.images?.[0] ? (
                                    <Image
                                        src={tour.images[0]}
                                        alt={tour.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/10">
                                        <MapPin className="h-12 w-12 text-primary/30" />
                                    </div>
                                )}
                                <Badge className="absolute top-3 left-3 z-10">
                                    {categoryLabels[tour.category] || tour.category}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <CardTitle className="text-xl line-clamp-1">{tour.title}</CardTitle>
                                <div className="text-2xl font-bold text-primary">${tour.price}</div>
                            </div>

                            <CardDescription className="line-clamp-2 mb-4">
                                {tour.description}
                            </CardDescription>

                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{tour.city}</span>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{tour.duration}h</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Max {tour.maxGroupSize}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-medium">{tour.rating}</span>
                                        <span className="text-sm text-muted-foreground">({tour.reviewCount})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Languages */}
                            {tour.languages?.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Languages</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {tour.languages.slice(0, 3).map((lang) => (
                                            <Badge key={lang} variant="outline" className="text-xs">
                                                {lang}
                                            </Badge>
                                        ))}
                                        {tour.languages.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{tour.languages.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Guide Info */}
                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={tour.guide.avatar} />
                                        <AvatarFallback>{tour.guide.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">Guide</p>
                                        <p className="text-sm text-muted-foreground">{tour.guide.name}</p>
                                    </div>
                                </div>
                                <Button>View Tour</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination with your existing components */}
            {totalPages > 1 && (
                <div className="mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {startItem}-{endItem} of {total} tours
                        </div>
                    </div>

                    <Pagination>
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationItem>
                                <PaginationPrevious
                                    href={currentPage > 1 ? `/tours?page=${currentPage - 1}` : undefined}
                                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {/* Page Numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNumber: number;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                } else {
                                    pageNumber = currentPage - 2 + i;
                                }

                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            href={`/tours?page=${pageNumber}`}
                                            isActive={currentPage === pageNumber}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            {/* Ellipsis for many pages */}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Last page if not shown */}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <PaginationItem>
                                    <PaginationLink
                                        href={`/tours?page=${totalPages}`}
                                        isActive={currentPage === totalPages}
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            {/* Next Button */}
                            <PaginationItem>
                                <PaginationNext
                                    href={currentPage < totalPages ? `/tours?page=${currentPage + 1}` : undefined}
                                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    );
}