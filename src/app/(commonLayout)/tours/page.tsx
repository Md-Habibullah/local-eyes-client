import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Calendar, DollarSign, Globe, Sparkles, X, Star, Users, Clock, Search } from "lucide-react";
import { searchTours } from "@/services/home/search.service";
import ToursGrid from "@/components/modules/Tour/ToursGrid";
import SearchFilter from "@/components/shared/filters/SearchFilter";
import SelectFilter from "@/components/shared/filters/SelectFilter";

interface ToursPageProps {
    searchParams: {
        search?: string;
        city?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        date?: string;
        languages?: string;
        page?: string;
    };
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
    const filters = {
        searchTerm: searchParams.search || "",
        city: searchParams.city || "",
        category: searchParams.category || "",
        minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
        date: searchParams.date || "",
        languages: searchParams.languages ? searchParams.languages.split(',') : [],
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        limit: 12
    };

    const searchResult = await searchTours(filters);

    // Filter options
    const categoryOptions = [
        { value: "ADVENTURE", label: "Adventure" },
        { value: "FOOD", label: "Food" },
        { value: "HISTORY", label: "History" },
        { value: "NATURE", label: "Nature" },
        { value: "CULTURE", label: "Culture" },
        { value: "PHOTOGRAPHY", label: "Photography" },
        { value: "SHOPPING", label: "Shopping" },
        { value: "NIGHTLIFE", label: "Nightlife" },
    ];

    const languageOptions = [
        { value: "EN", label: "English" },
        { value: "ES", label: "Spanish" },
        { value: "FR", label: "French" },
        { value: "DE", label: "German" },
        { value: "IT", label: "Italian" },
        { value: "JA", label: "Japanese" },
        { value: "ZH", label: "Chinese" },
        { value: "KO", label: "Korean" },
    ];

    // Popular categories for quick filter
    const popularCategories = [
        { icon: "🏔️", label: "Adventure", value: "ADVENTURE" },
        { icon: "🍽️", label: "Food", value: "FOOD" },
        { icon: "🏛️", label: "History", value: "HISTORY" },
        { icon: "🌿", label: "Nature", value: "NATURE" },
        { icon: "🎭", label: "Culture", value: "CULTURE" },
        { icon: "📸", label: "Photography", value: "PHOTOGRAPHY" },
    ];

    // Popular cities
    const popularCities = [
        { name: "New York", experiences: 50 },
        { name: "Paris", experiences: 45 },
        { name: "Tokyo", experiences: 60 },
        { name: "Bali", experiences: 40 },
        { name: "London", experiences: 55 },
        { name: "Dubai", experiences: 35 },
    ];

    const hasActiveFilters = Boolean(
        filters.searchTerm ||
        filters.city ||
        filters.category ||
        filters.minPrice ||
        filters.maxPrice ||
        filters.date ||
        filters.languages?.length
    );

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-primary/10 to-pink-500/10" />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

                <div className="relative container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Decorative Element */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-8">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Discover Authentic Experiences</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            <span className="bg-linear-to-r from-primary via-primary to-pink-500 bg-clip-text text-transparent">
                                Find Your Perfect
                            </span>
                            <br />
                            <span className="text-foreground">Local Experience</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Connect with passionate local guides and discover hidden gems around the world
                        </p>

                        {/* Main Search */}
                        <div className="max-w-3xl mx-auto mb-12">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-linear-to-r from-primary to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                <div className="relative flex items-center bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 rounded-2xl shadow-xl overflow-hidden">
                                    <div className="pl-5">
                                        <Search className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search destinations, experiences, or guides..."
                                        className="flex-1 px-4 py-4 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                                        defaultValue={filters.searchTerm}
                                    />
                                    <Button
                                        className="h-full px-8 rounded-none bg-linear-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 hover:shadow-lg transition-all duration-300"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Glassmorphism Design */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24">
                            {/* Mobile Filter Header */}
                            <div className="lg:hidden mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">Filters</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Refine your search
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 border-primary/20 hover:border-primary/40"
                                    >
                                        <Filter className="h-4 w-4" />
                                        Filters
                                    </Button>
                                </div>
                            </div>

                            {/* Desktop Filter Panel */}
                            <div className="hidden lg:block">
                                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold">Filters</h3>
                                        {hasActiveFilters && (
                                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                                <X className="h-4 w-4 mr-1" />
                                                Clear All
                                            </Button>
                                        )}
                                    </div>

                                    <div className="space-y-8">
                                        {/* Search */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Destination
                                            </label>
                                            <SearchFilter placeholder="Where to?" paramName="city" />
                                        </div>

                                        {/* Category Filter */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Sparkles className="h-4 w-4" />
                                                Experience Type
                                            </label>
                                            <SelectFilter
                                                paramName="category"
                                                placeholder="Select category"
                                                options={categoryOptions}
                                            />
                                        </div>

                                        {/* Price Range */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" />
                                                Price Range
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                                                    defaultValue={filters.minPrice}
                                                />
                                                <span className="text-muted-foreground">to</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                                                    defaultValue={filters.maxPrice}
                                                />
                                            </div>
                                        </div>

                                        {/* Date Picker */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Select Date
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                                                defaultValue={filters.date}
                                            />
                                        </div>

                                        {/* Language Filter */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                Language
                                            </label>
                                            <SelectFilter
                                                paramName="languages"
                                                placeholder="Select language"
                                                options={languageOptions}

                                            />
                                        </div>

                                        {/* Apply Button */}
                                        <Button
                                            className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 hover:shadow-lg transition-all duration-300"
                                            size="lg"
                                        >
                                            Apply Filters
                                            <Filter className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Popular Destinations */}
                                <div className="mt-8 p-6 rounded-2xl bg-linear-to-br from-primary/5 to-pink-500/5 border border-primary/10">
                                    <h4 className="font-bold mb-4">Popular Destinations</h4>
                                    <div className="space-y-3">
                                        {popularCities.slice(0, 4).map((city) => (
                                            <button
                                                key={city.name}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 w-full text-left group"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-linear-to-r from-primary/20 to-pink-500/20 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <span className="font-medium group-hover:text-primary transition-colors block">
                                                        {city.name}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {city.experiences}+ experiences
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        {/* Header with Stats */}
                        <div className="mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-bold">
                                            {searchResult.total} Experiences
                                        </h2>
                                        {filters.searchTerm && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                                {filters.searchTerm}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">
                                        Book unique experiences with verified local guides
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5">
                                        <Star className="h-4 w-4 text-primary" />
                                        <span className="font-medium">4.8+ Avg Rating</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span className="font-medium">1K+ Happy Travelers</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span className="font-medium">24/7 Support</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Category Filters */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-sm font-medium text-muted-foreground">Popular:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {popularCategories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filters.category === cat.value
                                                    ? 'bg-linear-to-r from-primary to-pink-500 text-white shadow-lg'
                                                    : 'bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10'
                                                    }`}
                                            >
                                                <span>{cat.icon}</span>
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {hasActiveFilters && (
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium">Active Filters</h4>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                            Clear All
                                            <X className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {filters.city && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {filters.city}
                                                <button className="ml-1 hover:text-primary/70">×</button>
                                            </div>
                                        )}
                                        {filters.category && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500/10 to-pink-500/5 text-pink-600 rounded-full border border-pink-500/20">
                                                <Sparkles className="h-3.5 w-3.5" />
                                                {filters.category}
                                                <button className="ml-1 hover:text-pink-600/70">×</button>
                                            </div>
                                        )}
                                        {(filters.minPrice || filters.maxPrice) && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-blue-500/5 text-blue-600 rounded-full border border-blue-500/20">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                ${filters.minPrice || 0} - ${filters.maxPrice || "∞"}
                                                <button className="ml-1 hover:text-blue-600/70">×</button>
                                            </div>
                                        )}
                                        {filters.date && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500/10 to-green-500/5 text-green-600 rounded-full border border-green-500/20">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(filters.date).toLocaleDateString()}
                                                <button className="ml-1 hover:text-green-600/70">×</button>
                                            </div>
                                        )}
                                        {filters.languages?.map((lang) => (
                                            <div key={lang} className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500/10 to-amber-500/5 text-amber-600 rounded-full border border-amber-500/20">
                                                <Globe className="h-3.5 w-3.5" />
                                                {lang}
                                                <button className="ml-1 hover:text-amber-600/70">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tours Grid */}
                        <Suspense fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="rounded-2xl bg-muted h-80"></div>
                                    </div>
                                ))}
                            </div>
                        }>
                            <ToursGrid
                                tours={searchResult.tours}
                                total={searchResult.total}
                                currentPage={searchResult.page}
                                filters={filters}
                            />
                        </Suspense>

                        {/* No Results */}
                        {searchResult.total === 0 && (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-primary/10 to-pink-500/10 mb-6">
                                    <MapPin className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">No Tours Found</h3>
                                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                                    Try adjusting your filters or search for a different destination
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <Filter className="h-4 w-4" />
                                        Clear Filters
                                    </Button>
                                    <Button
                                        className="gap-2 bg-linear-to-r from-primary to-pink-500"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Explore Popular Tours
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Destinations Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Top Destinations Worldwide
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the most popular cities for authentic local experiences
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {popularCities.map((city) => (
                        <button
                            key={city.name}
                            className="group relative overflow-hidden rounded-2xl aspect-square bg-linear-to-br from-primary/10 to-pink-500/10 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
                            <div className="relative z-20 h-full flex flex-col justify-end p-4">
                                <div className="text-white font-bold text-lg drop-shadow-lg">
                                    {city.name}
                                </div>
                                <div className="text-white/80 text-sm">
                                    {city.experiences}+ experiences
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}