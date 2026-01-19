import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Sparkles, X, Star, Users, Clock, Search, Compass, Globe, TrendingUp, Shield } from "lucide-react";
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
        limit: 9 // Increased to 9 for better grid layout
    };

    // Fetch tours with current filters
    const searchResult = await searchTours(filters);

    // Category options with icons
    const categoryOptions = [
        { value: "ADVENTURE", label: "Adventure", icon: "🏔️", color: "from-blue-500 to-cyan-500" },
        { value: "FOOD", label: "Food & Culinary", icon: "🍽️", color: "from-orange-500 to-red-500" },
        { value: "ART", label: "Art", icon: "🎨", color: "from-purple-500 to-pink-500" },
        { value: "HISTORY", label: "History", icon: "🏛️", color: "from-amber-500 to-yellow-500" },
        { value: "NATURE", label: "Nature", icon: "🌿", color: "from-green-500 to-emerald-500" },
        { value: "CULTURE", label: "Culture", icon: "🌍", color: "from-indigo-500 to-blue-500" },
        { value: "PHOTOGRAPHY", label: "Photography", icon: "📸", color: "from-sky-500 to-cyan-500" },
        { value: "SHOPPING", label: "Shopping", icon: "🛍️", color: "from-pink-500 to-rose-500" },
        { value: "NIGHTLIFE", label: "Nightlife", icon: "🌙", color: "from-violet-500 to-purple-500" },
        { value: "SPORTS", label: "Sports", icon: "⚽", color: "from-red-500 to-orange-500" },
    ];

    const hasActiveFilters = Boolean(filters.searchTerm || filters.category);
    const totalTours = searchResult.meta.total;
    const activeCategory = categoryOptions.find(c => c.value === filters.category);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 dark:from-primary/10 dark:via-purple-900/10 dark:to-blue-900/10" />

                {/* Floating elements */}
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl dark:from-primary/30 dark:to-purple-500/30" />
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl dark:from-blue-500/30 dark:to-cyan-500/30" />

                <div className="container relative mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border border-primary/20 dark:border-primary/30 mb-6">
                            <Compass className="h-4 w-4 text-primary dark:text-primary/90" />
                            <span className="text-sm font-semibold text-primary dark:text-primary/90">
                                Discover Experiences
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                            Discover Amazing Tours
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            Find your perfect travel experience with local experts
                        </p>

                        {/* Main Search - Enhanced */}
                        <div className="mb-8 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-800">
                            <SimpleSearch
                                placeholder="Search tours by destination, activity, or guide..."
                                defaultValue={filters.searchTerm}
                            // className="h-14 text-lg"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="mb-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Sparkles className="h-5 w-5 text-primary dark:text-primary/90" />
                                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    Browse by Category
                                </span>
                            </div>
                            <CategoryFilter
                                options={categoryOptions}
                                defaultValue={filters.category}
                            />
                        </div>

                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                            <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-xl border border-primary/20 dark:border-primary/30">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Active filters:
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {filters.searchTerm && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/30 dark:from-primary/30 dark:to-primary/40 text-primary dark:text-primary/90 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/30 dark:border-primary/50">
                                                <Search className="h-3 w-3" />
                                                {filters.searchTerm}
                                            </div>
                                        )}
                                        {activeCategory && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/30 dark:to-cyan-500/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/30 dark:border-blue-500/50">
                                                <span className="text-lg">{activeCategory.icon}</span>
                                                {activeCategory.label}
                                            </div>
                                        )}
                                        <Link
                                            href="/tours"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                            Clear All
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Stats and Filter Header */}
                <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {totalTours} {totalTours === 1 ? 'Tour' : 'Tours'} Available
                                </h2>
                                {filters.searchTerm && (
                                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90 font-medium">
                                        Search Results
                                    </span>
                                )}
                            </div>
                            {filters.searchTerm && (
                                <p className="text-gray-600 dark:text-gray-400">
                                    Showing results for <span className="font-medium text-primary dark:text-primary/90">{filters.searchTerm}</span>
                                </p>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                                    <Star className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">4.8+</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">100%</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Verified</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">500+</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Guides</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">10K+</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Bookings</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tours Grid */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 h-64 mb-4"></div>
                                <div className="space-y-4">
                                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded w-3/4"></div>
                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded w-1/2"></div>
                                    <div className="flex justify-between pt-4">
                                        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded w-20"></div>
                                        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }>
                    {searchResult.data.length > 0 ? (
                        <>
                            <ToursGrid tours={searchResult.data} />

                            {/* Pagination */}
                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <ToursPagination
                                    currentPage={searchResult.meta.page}
                                    totalPages={Math.ceil(searchResult.meta.total / searchResult.meta.limit)}
                                    totalItems={searchResult.meta.total}
                                    itemsPerPage={searchResult.meta.limit}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mb-6">
                                <Compass className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                                No Tours Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                                {hasActiveFilters
                                    ? "We couldn't find any tours matching your search. Try adjusting your filters or explore other categories."
                                    : "No tours are available at the moment. Check back soon for new experiences!"
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {hasActiveFilters ? (
                                    <>
                                        <Link href="/tours">
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="gap-2 border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
                                            >
                                                <Filter className="h-4 w-4" />
                                                Clear All Filters
                                            </Button>
                                        </Link>
                                        <Link href="/guides">
                                            <Button
                                                size="lg"
                                                className="gap-2 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90"
                                            >
                                                <Users className="h-4 w-4" />
                                                Browse Guides
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/become-a-guide">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="gap-2 border-primary/50 dark:border-primary/50 text-primary dark:text-primary/90 hover:bg-primary/10 dark:hover:bg-primary/20"
                                        >
                                            <Sparkles className="h-4 w-4" />
                                            Become a Guide
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </Suspense>

                {/* Bottom CTA */}
                {searchResult.data.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
                        <div className="max-w-2xl mx-auto text-center">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                Need a Custom Tour?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Contact our guides directly to create a personalized experience just for you
                            </p>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="gap-2 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Request Custom Tour
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}