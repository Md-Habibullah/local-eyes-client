"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, X, Filter, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getPopularDestinations, getTourCategories, SearchFilters } from "@/services/home/search.service";
import { Slider } from "@/components/ui/slider";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialFilters?: SearchFilters;
}

const LANGUAGES = ["English", "Bengali", "Hindi", "Arabic", "Spanish", "French", "German", "Japanese", "Chinese"];

export default function SearchModal({ isOpen, onClose, initialFilters }: SearchModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [popularDestinations, setPopularDestinations] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const [filters, setFilters] = useState<SearchFilters>({
        searchTerm: initialFilters?.searchTerm || "",
        city: initialFilters?.city || "",
        category: initialFilters?.category || "",
        minPrice: initialFilters?.minPrice || 0,
        maxPrice: initialFilters?.maxPrice || 500,
        date: initialFilters?.date || "",
        languages: initialFilters?.languages || [],
        page: 1,
        limit: 12
    });

    useEffect(() => {
        if (isOpen) {
            loadData();
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialFilters) {
            setFilters(prev => ({
                ...prev,
                ...initialFilters
            }));
        }
    }, [initialFilters]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [destinations, tourCategories] = (await Promise.all([
                getPopularDestinations(),
                getTourCategories()
            ])) as [string[], string[]];

            setPopularDestinations(destinations);
            setCategories(tourCategories);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();

        // Build query string
        const params = new URLSearchParams();

        if (filters.searchTerm) params.append('search', filters.searchTerm);
        if (filters.city) params.append('city', filters.city);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice && filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice && filters.maxPrice < 500) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.date) params.append('date', filters.date);
        if (filters.languages?.length) {
            params.append('languages', filters.languages.join(','));
        }

        router.push(`/tours?${params.toString()}`);
    };

    const handleReset = () => {
        setFilters({
            searchTerm: "",
            city: "",
            category: "",
            minPrice: 0,
            maxPrice: 500,
            date: "",
            languages: [],
            page: 1,
            limit: 12
        });
    };

    const toggleLanguage = (language: string) => {
        setFilters(prev => ({
            ...prev,
            languages: prev.languages?.includes(language)
                ? prev.languages.filter(l => l !== language)
                : [...(prev.languages || []), language]
        }));
    };

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Find Your Perfect Tour</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Search and filter tours based on your preferences
                    </p>
                </DialogHeader>

                <form onSubmit={handleSearch} className="space-y-6">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search tours by keyword, location, or guide..."
                            className="pl-10"
                            value={filters.searchTerm}
                            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                        />
                    </div>

                    {/* Location Filter */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <Label>Destination</Label>
                        </div>
                        <Select
                            value={filters.city}
                            onValueChange={(value) => setFilters({ ...filters, city: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Any City</SelectItem>
                                {popularDestinations.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Popular Destination Chips */}
                        {popularDestinations.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {popularDestinations.slice(0, 6).map((city) => (
                                    <Badge
                                        key={city}
                                        variant={filters.city === city ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/10"
                                        onClick={() => setFilters({ ...filters, city: filters.city === city ? "" : city })}
                                    >
                                        {city}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Label>Tour Category</Label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    type="button"
                                    variant={filters.category === category ? "default" : "outline"}
                                    className="h-auto py-2 px-3 text-xs"
                                    onClick={() => setFilters({
                                        ...filters,
                                        category: filters.category === category ? "" : category
                                    })}
                                >
                                    {categoryLabels[category] || category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <Label>Price Range</Label>
                            </div>
                            <span className="text-sm font-medium">
                                ${filters.minPrice} - ${filters.maxPrice}
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={1000}
                            step={10}
                            value={[filters.minPrice || 0, filters.maxPrice || 500]}
                            onValueChange={(value) => {
                                const [min, max] = value as number[];
                                setFilters({ ...filters, minPrice: min, maxPrice: max });
                            }}
                            className="py-4"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>$0</span>
                            <span>$500</span>
                            <span>$1000</span>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <Label>Tour Date</Label>
                        </div>
                        <Input
                            type="date"
                            value={filters.date}
                            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    {/* Languages Filter */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Label>Guide Languages</Label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {LANGUAGES.map((language) => (
                                <div key={language} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`lang-${language}`}
                                        checked={filters.languages?.includes(language)}
                                        onCheckedChange={() => toggleLanguage(language)}
                                    />
                                    <Label
                                        htmlFor={`lang-${language}`}
                                        className="text-sm cursor-pointer"
                                    >
                                        {language}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Filters */}
                    {(filters.city || filters.category || (filters.languages && filters.languages.length > 0)) && (
                        <div className="space-y-2">
                            <Label className="text-sm">Selected Filters:</Label>
                            <div className="flex flex-wrap gap-2">
                                {filters.city && (
                                    <Badge variant="secondary" className="gap-1">
                                        {filters.city}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => setFilters({ ...filters, city: "" })}
                                        />
                                    </Badge>
                                )}
                                {filters.category && (
                                    <Badge variant="secondary" className="gap-1">
                                        {categoryLabels[filters.category] || filters.category}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => setFilters({ ...filters, category: "" })}
                                        />
                                    </Badge>
                                )}
                                {filters.languages?.map((lang: string) => (
                                    <Badge key={lang} variant="secondary" className="gap-1">
                                        {lang}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => toggleLanguage(lang)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={loading}
                        >
                            <Search className="h-4 w-4 mr-2" />
                            {loading ? "Searching..." : "Search Tours"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={loading}
                        >
                            Reset Filters
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}