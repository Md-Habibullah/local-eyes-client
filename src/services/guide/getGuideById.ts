import { serverFetch } from "@/lib/server-fetch";

export const getGuideById = async (id: string) => {
    const res = await serverFetch.get(`/guides/${id}`, {
        cache: "no-store",
    });
    const result = await res.json();
    return result.data;
};