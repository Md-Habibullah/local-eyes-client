import { serverFetch } from "@/lib/server-fetch";

export const getTourByID = async (id: string) => {
    const res = await serverFetch.get(`/listings/${id}`, {
        cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to get tour" };
    }

    return result.data;
};