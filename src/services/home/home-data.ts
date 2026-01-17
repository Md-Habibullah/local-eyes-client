/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";


export async function getFeaturedTours() {
    try {
        console.log("Fetching featured tours...");

        const response = await serverFetch.get("/listings?limit=6");

        if (!response.ok) {
            console.error("Failed to fetch tours:", response.status);
            return {
                data: [],
                error: `Failed to load tours (${response.status})`
            };
        }

        const data = await response.json();

        return {
            data: data.data || [],
            error: null
        };

    } catch (error) {
        console.error("Error fetching featured tours:", error);
        return {
            data: [],
            error: "Unable to load tours at the moment"
        };
    }
}

export async function getTopGuides() {
    try {
        console.log("Fetching top guides...");

        // Filter users by role=GUIDE and get only verified guides
        const response = await serverFetch.get("/guides");

        if (!response.ok) {
            console.error("Failed to fetch guides:", response.status);
            return {
                data: [],
                error: `Failed to load guides (${response.status})`
            };
        }

        const data = await response.json();

        // Filter and map guides
        const guides = data.data
            ?.filter((user: any) => user.guide && user.guide.isVerified)
            .slice(0, 4) // Take only 4
            .map((user: any) => ({
                id: user.guide.id,
                name: user.guide.name || "Local Guide",
                bio: user.guide.bio || "Experienced local guide",
                profilePhoto: user.guide.profilePhoto || "",
                city: user.guide.address?.split(',')[0] || "Various locations",
                languages: user.guide.languages || ["English"],
                expertise: user.guide.expertise || ["Local Culture"],
                dailyRate: user.guide.dailyRate || 50,
                isVerified: user.guide.isVerified || false,
                rating: 4.5,
                reviewCount: Math.floor(Math.random() * 50) + 10
            })) || [];

        return {
            data: guides,
            error: null
        };

    } catch (error) {
        console.error("Error fetching top guides:", error);
        return {
            data: [],
            error: "Unable to load guides at the moment"
        };
    }
}

export async function getTestimonials() {
    try {
        console.log("Fetching testimonials...");

        const response = await serverFetch.get("/reviews?limit=5");

        if (!response.ok) {
            console.error("Failed to fetch reviews:", response.status);
            return {
                data: [],
                error: `Failed to load reviews (${response.status})`
            };
        }

        const data = await response.json();

        // Map reviews to testimonials format
        const testimonials = data.data?.map((review: any, index: number) => ({
            id: review.id || `review-${index}`,
            name: review.tourist?.name || "Traveler",
            role: "Traveler",
            location: review.tourist?.address?.split(',')[0] || "Various locations",
            avatar: review.tourist?.profilePhoto || "",
            rating: review.rating || 5,
            comment: review.comment || "Amazing experience with a local guide!",
            date: new Date(review.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            })
        })) || [];

        // If no reviews, return sample testimonials
        if (testimonials.length === 0) {
            return {
                data: [
                    {
                        id: "1",
                        name: "Sarah Johnson",
                        role: "Traveler",
                        location: "New York",
                        avatar: "",
                        rating: 5,
                        comment: "The local guide showed us hidden gems we would never have found on our own!",
                        date: "Jan 2024"
                    },
                    {
                        id: "2",
                        name: "Michael Chen",
                        role: "Traveler",
                        location: "San Francisco",
                        avatar: "",
                        rating: 5,
                        comment: "Authentic experience that felt like exploring with a local friend.",
                        date: "Dec 2023"
                    }
                ],
                error: null
            };
        }

        return {
            data: testimonials,
            error: null
        };

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return {
            data: [],
            error: "Unable to load testimonials at the moment"
        };
    }
}