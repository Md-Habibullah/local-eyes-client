"use server";

import { serverFetch } from "@/lib/server-fetch";

export const isWishlisted = async (tourId: string): Promise<boolean> => {
    const res = await serverFetch.get(`/wishlists/check/${tourId}`, {
        cache: "no-store",
    });

    if (!res.ok) return false;

    const result = await res.json();
    return Boolean(result?.exists);
};
