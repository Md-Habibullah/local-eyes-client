"use server";

import { serverFetch } from "@/lib/server-fetch";

export const addToWishlist = async (tourId: string) => {
    const res = await serverFetch.post("/wishlists", {
        body: JSON.stringify({ tourId }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (!res.ok || result.success === 'false') {
        return { success: false, error: result.message || "Failed to add to wishlist" };
    }


    return {
        success: true,
        message: "Added to wishlist",
    };
};