import { serverFetch } from "@/lib/server-fetch";

export const getTours = async () => {
    const res = await serverFetch.get("/listings", { cache: "no-store" });
    const result = await res.json();
    return result.data;
};


export const getToursWithLimit = async (limit: string) => {
    const res = await serverFetch.get(`/listings?limit=${limit}`, { cache: "no-store" });
    const result = await res.json();
    return result.data;
};
