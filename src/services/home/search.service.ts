/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface SearchFilters {
    searchTerm?: string;
    city?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    date?: string;
    duration?: number;
    languages?: string[];
    page?: number;
    limit?: number;
}

export interface SearchResult {
    tours: any[];
    total: number;
    page: number;
    limit: number;
    filters: SearchFilters;
}

export async function searchTours(filters: SearchFilters = {}): Promise<SearchResult> {
    try {
        // Build query parameters
        const params = new URLSearchParams();

        // Add filters
        if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
        if (filters.city) params.append('city', filters.city);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        // Add languages as multiple params
        if (filters.languages?.length) {
            filters.languages.forEach(lang => params.append('languages', lang));
        }

        const endpoint = `/listings?${params.toString()}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();

        return {
            tours: data.data || [],
            total: data.meta?.total || 0,
            page: data.meta?.page || 1,
            limit: data.meta?.limit || 10,
            filters
        };

    } catch (error) {
        console.error("Error searching tours:", error);
        return {
            tours: [],
            total: 0,
            page: 1,
            limit: 10,
            filters
        };
    }
}

export async function getPopularDestinations() {
    try {
        // Get tours and extract unique cities
        const response = await serverFetch.get("/listings?limit=50");

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const tours = data.data || [];

        // Count city occurrences
        const cityCounts = tours.reduce((acc: Record<string, number>, tour: any) => {
            if (tour.city) {
                acc[tour.city] = (acc[tour.city] || 0) + 1;
            }
            return acc;
        }, {});

        // Sort by count and get top 10
        return Object.entries(cityCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 10)
            .map(([city]) => city);

    } catch (error) {
        console.error("Error getting popular destinations:", error);
        return ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar"];
    }
}

export async function getTourCategories() {
    try {
        // Get all tours and extract unique categories
        const response = await serverFetch.get("/listings?limit=100");

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const tours = data.data || [];

        // Get unique categories
        const categories = [...new Set(tours.map((tour: any) => tour.category))].filter(Boolean);

        return categories.length > 0 ? categories : ["ADVENTURE", "FOOD", "HISTORY", "NATURE", "CULTURE"];

    } catch (error) {
        console.error("Error getting tour categories:", error);
        return ["ADVENTURE", "FOOD", "HISTORY", "NATURE", "CULTURE"];
    }
}