"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getMyReviews = async () => {
    const res = await serverFetch.get("/reviews");
    const result = await res.json();

    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to fetch reviews" };
    }

    return result.data;
};