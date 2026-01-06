// src/services/tourist/removeFromWishlist.ts
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const removeFromWishlist = async (tourId: string) => {
    const res = await serverFetch.delete(`/wishlists/${tourId}`);

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result?.message || "Failed to remove from wishlist",
        };
    }

    return {
        success: true,
        message: result.message,
    };
};
