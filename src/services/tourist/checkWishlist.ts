"use server";

import { serverFetch } from "@/lib/server-fetch";

export const checkWishlist = async (tourId: string) => {
    const res = await serverFetch.get(`/wishlists/check/${tourId}`, {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to fetch wishlist status" };
    }


    return result; // { success: true, exists: boolean }
};
