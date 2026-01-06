"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getGuidePayouts = async () => {
    const res = await serverFetch.get("/guides/unpaid-earnings", {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to get payouts" };
    }

    console.log(result)
    return result.data;
};