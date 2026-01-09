/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const BACKEND_API_URL =
    process.env.NEXT_PUBLIC_BASE_API_URL || "https://local-eyes-server.vercel.app/api/v1";

export interface SearchFilters {
    searchTerm?: string;
    city?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    date?: string;
    languages?: string[];
    page?: number;
    limit?: number;
}

export interface SearchResult {
    data: any[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export async function searchTours(
    filters: SearchFilters = {}
): Promise<SearchResult> {
    try {
        const params = new URLSearchParams();

        if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
        if (filters.city) params.set("city", filters.city);
        if (filters.category) params.set("category", filters.category);
        if (filters.minPrice !== undefined)
            params.set("minPrice", filters.minPrice.toString());
        if (filters.maxPrice !== undefined)
            params.set("maxPrice", filters.maxPrice.toString());
        if (filters.page) params.set("page", filters.page.toString());
        if (filters.limit) params.set("limit", filters.limit.toString());

        const endpoint = `${BACKEND_API_URL}/listings?${params.toString()}`;

        console.log("🚀 FETCHING TOURS:", endpoint);

        const response = await fetch(endpoint, {
            method: "GET",
            cache: "no-store", // 🔥 THIS IS THE KEY FIX
        });

        if (!response.ok) {
            throw new Error(`Search failed: ${response.status}`);
        }

        const json = await response.json();

        return {
            data: json.data ?? [],
            meta: {
                page: json.meta?.page ?? filters.page ?? 1,
                limit: json.meta?.limit ?? filters.limit ?? 12,
                total: json.meta?.total ?? 0,
            },
        };
    } catch (error) {
        console.error("❌ Error searching tours:", error);
        return {
            data: [],
            meta: {
                page: filters.page ?? 1,
                limit: filters.limit ?? 12,
                total: 0,
            },
        };
    }
}

/* ===============================
   OPTIONAL HELPERS (FIXED TOO)
   =============================== */

export async function getPopularDestinations(): Promise<string[]> {
    try {
        const res = await fetch(`${BACKEND_API_URL}/listings?limit=100`, {
            cache: "no-store",
        });

        if (!res.ok) return [];

        const json = await res.json();
        const tours = json.data ?? [];

        const cityCounts = tours.reduce(
            (acc: Record<string, number>, tour: any) => {
                if (tour.city) acc[tour.city] = (acc[tour.city] || 0) + 1;
                return acc;
            },
            {}
        );

        return Object.entries(cityCounts)
            .sort(([, a], [, b]) => Number(b) - Number(a))
            .slice(0, 10)
            .map(([city]) => city);
    } catch {
        return [];
    }
}

export async function getTourCategories(): Promise<string[]> {
    try {
        const res = await fetch(`${BACKEND_API_URL}/listings?limit=100`, {
            cache: "no-store",
        });

        if (!res.ok) return [];

        const json = await res.json();
        const tours = json.data ?? [];

        const categories: any = [
            ...new Set(tours.map((t: any) => t.category).filter(Boolean)),
        ];

        return categories.length
            ? categories
            : [
                "ADVENTURE",
                "FOOD",
                "HISTORY",
                "NATURE",
                "CULTURE",
                "PHOTOGRAPHY",
                "SHOPPING",
                "NIGHTLIFE",
                "SPORTS",
                "ART",
            ];
    } catch {
        return [
            "ADVENTURE",
            "FOOD",
            "HISTORY",
            "NATURE",
            "CULTURE",
            "PHOTOGRAPHY",
            "SHOPPING",
            "NIGHTLIFE",
            "SPORTS",
            "ART",
        ];
    }
}
