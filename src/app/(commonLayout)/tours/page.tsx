import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Sparkles, X, Star, Users, Clock, Search } from "lucide-react";
import { searchTours } from "@/services/home/search.service";
import ToursGrid from "@/components/modules/Tour/ToursGrid";
import SimpleSearch from "@/components/shared/SimpleSearch";
import CategoryFilter from "@/components/shared/CategoryFilter";
import ToursPagination from "@/components/shared/ToursPagination";
import Link from "next/link";

export const dynamic = 'force-dynamic'; // Disable static rendering
export const revalidate = 0; // Disable caching

type ToursPageProps = {
    searchParams?: Promise<{
        searchTerm?: string
        category?: string
        page?: string
    }>
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
    const params = await searchParams;

    // Parse filters from search params
    const filters = {
        searchTerm: params?.searchTerm || "",
        category: params?.category || "",
        page: params?.page ? parseInt(params?.page) : 1,
        limit: 6
    };

    // IMPORTANT: Fetch tours with current filters
    const searchResult = await searchTours(filters);

    // Category options
    const categoryOptions = [
        { value: "ADVENTURE", label: "Adventure" },
        { value: "FOOD", label: "Food" },
        { value: "ART", label: "Art" },
        { value: "HISTORY", label: "History" },
        { value: "NATURE", label: "Nature" },
        { value: "CULTURE", label: "Culture" },
        { value: "PHOTOGRAPHY", label: "Photography" },
        { value: "SHOPPING", label: "Shopping" },
        { value: "NIGHTLIFE", label: "Nightlife" },
        { value: "SPORTS", label: "Sports" },
    ];

    const hasActiveFilters = Boolean(filters.searchTerm || filters.category);
    const totalTours = searchResult.meta.total;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                            Discover Amazing Tours
                        </h1>
                        <p className="text-center text-muted-foreground mb-8">
                            Find your perfect travel experience
                        </p>

                        {/* Main Search - Client Component */}
                        <div className="mb-8">
                            <SimpleSearch
                                placeholder="Search tours by name, city, or description..."
                                defaultValue={filters.searchTerm}
                            />
                        </div>

                        {/* Category Filters - Client Component */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Filter by Category</span>
                            </div>
                            <CategoryFilter
                                options={categoryOptions}
                                defaultValue={filters.category}
                            />
                        </div>

                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {filters.searchTerm && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                            Search: {filters.searchTerm}
                                        </div>
                                    )}
                                    {filters.category && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                            Category: {categoryOptions.find(c => c.value === filters.category)?.label}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Stats Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {totalTours} {totalTours === 1 ? 'Tour' : 'Tours'} Available
                        </h2>
                        {filters.searchTerm && (
                            <p className="text-muted-foreground mt-1">
                                Results for {filters.searchTerm}
                            </p>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">4.8+ Rating</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Verified Guides</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Flexible Dates</span>
                        </div>
                    </div>
                </div>

                {/* Tours Grid */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="rounded-lg bg-muted h-64 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                }>
                    <ToursGrid tours={searchResult.data} />
                </Suspense>

                {/* Pagination - Client Component */}
                {searchResult.data.length > 0 && (
                    <ToursPagination
                        currentPage={searchResult.meta.page}
                        totalPages={Math.ceil(searchResult.meta.total / searchResult.meta.limit)}
                        totalItems={searchResult.meta.total}
                        itemsPerPage={searchResult.meta.limit}
                    />
                )}

                {/* No Results */}
                {searchResult.data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-muted mb-6">
                            <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No Tours Found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            {hasActiveFilters
                                ? "Try adjusting your filters or search for a different destination"
                                : "No tours are available at the moment. Check back soon!"
                            }
                        </p>
                        {hasActiveFilters && (
                            <Link href="/tours">
                                <Button
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    Clear All Filters
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}