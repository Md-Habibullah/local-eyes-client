"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getWishlist = async () => {
    const res = await serverFetch.get("/wishlists/my", {
        cache: "no-store",
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
        }
    });

    const result = await res.json();
    console.log(result)

    //
    if (!res.ok || result.success === 'false') {
        console.error("Wishlist API error:", result);
        throw new Error(result?.message || "Failed to fetch wishlist");
    }

    // backend returns array directly
    return result;
};