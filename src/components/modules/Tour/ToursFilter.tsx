"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchFilters } from "@/services/home/search.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MapPin, Filter as FilterIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface ToursFilterProps {
    initialFilters: SearchFilters;
    totalTours: number;
}

const CATEGORIES = [
    { value: "ADVENTURE", label: "Adventure" },
    { value: "FOOD", label: "Food" },
    { value: "HISTORY", label: "History" },
    { value: "NATURE", label: "Nature" },
    { value: "CULTURE", label: "Culture" },
    { value: "SHOPPING", label: "Shopping" },
    { value: "PHOTOGRAPHY", label: "Photography" },
    { value: "NIGHTLIFE", label: "Nightlife" },
    { value: "SPORTS", label: "Sports" },
    { value: "ART", label: "Art" },
];

export default function ToursFilter({ initialFilters, totalTours }: ToursFilterProps) {
    const router = useRouter();

    // Local state for form inputs
    const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "");
    const [city, setCity] = useState(initialFilters.city || "");
    const [priceRange, setPriceRange] = useState<[number, number]>([
        initialFilters.minPrice || 0,
        initialFilters.maxPrice || 1000
    ]);
    const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || "");

    // Debounced values
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedCity = useDebounce(city, 300);

    // Update URL function wrapped in useCallback
    const updateURL = useCallback((filters: Partial<SearchFilters>) => {
        const params = new URLSearchParams();

        // Update params with new filters
        if (filters.searchTerm !== undefined) {
            if (filters.searchTerm) params.set("search", filters.searchTerm);
            else params.delete("search");
        }

        if (filters.city !== undefined) {
            if (filters.city) params.set("city", filters.city);
            else params.delete("city");
        }

        if (filters.category !== undefined) {
            if (filters.category) params.set("category", filters.category);
            else params.delete("category");
        }

        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
            else params.delete("minPrice");

            if (filters.maxPrice < 1000) params.set("maxPrice", filters.maxPrice.toString());
            else params.delete("maxPrice");
        }

        // Reset to page 1 when filters change
        params.set("page", "1");

        router.push(`/tours?${params.toString()}`);
    }, [router]);

    // Update local state when initialFilters changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchTerm(initialFilters.searchTerm || "");
        setCity(initialFilters.city || "");
        setPriceRange([
            initialFilters.minPrice || 0,
            initialFilters.maxPrice || 1000
        ]);
        setSelectedCategory(initialFilters.category || "");
    }, [initialFilters]);

    // Handle debounced search term
    useEffect(() => {
        if (debouncedSearchTerm !== initialFilters.searchTerm) {
            updateURL({ searchTerm: debouncedSearchTerm });
        }
    }, [debouncedSearchTerm, initialFilters.searchTerm, updateURL]);

    // Handle debounced city
    useEffect(() => {
        if (debouncedCity !== initialFilters.city) {
            updateURL({ city: debouncedCity });
        }
    }, [debouncedCity, initialFilters.city, updateURL]);

    // Handle price range updates
    const handlePriceChange = useCallback((value: number[]) => {
        setPriceRange([value[0], value[1]]);
    }, []);

    const handlePriceChangeEnd = useCallback((value: number[]) => {
        updateURL({ minPrice: value[0], maxPrice: value[1] });
    }, [updateURL]);

    const handleCategory = useCallback((category: string) => {
        const newCategory = selectedCategory === category ? "" : category;
        setSelectedCategory(newCategory);
        updateURL({ category: newCategory });
    }, [selectedCategory, updateURL]);

    const handleReset = useCallback(() => {
        // Reset local state
        setSearchTerm("");
        setCity("");
        setPriceRange([0, 1000]);
        setSelectedCategory("");

        // Clear all URL parameters
        router.push("/tours");
    }, [router]);

    const formatPrice = (price: number) => {
        return `$${price}`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FilterIcon className="h-5 w-5" />
                    Filters
                    <span className="text-sm font-normal text-muted-foreground ml-auto">
                        {totalTours} tours
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <Label className="font-semibold">Search Tours</Label>
                    <Input
                        placeholder="Type tour name, guide, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Label className="font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Destination
                    </Label>
                    <Input
                        placeholder="Enter city or country..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Price Range - Improved Design */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="font-semibold flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Price Range
                        </Label>
                        <div className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
                            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Slider
                            min={0}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onValueChange={handlePriceChange}
                            onValueCommit={handlePriceChangeEnd}
                            className="cursor-pointer"
                        />

                        <div className="flex justify-between text-sm text-muted-foreground mt-4">
                            <div className="flex flex-col items-center">
                                <div className="h-1 w-0.5 bg-muted-foreground mb-1"></div>
                                <span>{formatPrice(0)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-1 w-0.5 bg-muted-foreground mb-1"></div>
                                <span>{formatPrice(250)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-1 w-0.5 bg-muted-foreground mb-1"></div>
                                <span>{formatPrice(500)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-1 w-0.5 bg-muted-foreground mb-1"></div>
                                <span>{formatPrice(750)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-1 w-0.5 bg-muted-foreground mb-1"></div>
                                <span>{formatPrice(1000)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="space-y-1">
                                <Label className="text-xs font-medium">Min Price</Label>
                                <div className="flex items-center border rounded-md px-3 py-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                                    <span className="font-medium">{formatPrice(priceRange[0])}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-medium">Max Price</Label>
                                <div className="flex items-center border rounded-md px-3 py-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                                    <span className="font-medium">{formatPrice(priceRange[1])}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <Label className="font-semibold">Tour Categories</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map((category) => (
                            <div key={category.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cat-${category.value}`}
                                    checked={selectedCategory === category.value}
                                    onCheckedChange={() => handleCategory(category.value)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <Label
                                    htmlFor={`cat-${category.value}`}
                                    className="text-sm cursor-pointer hover:text-primary transition-colors"
                                >
                                    {category.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <Button
                    variant="outline"
                    className="w-full border-2 font-medium hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
                    onClick={handleReset}
                >
                    Clear All Filters
                </Button>
            </CardContent>
        </Card>
    );
}