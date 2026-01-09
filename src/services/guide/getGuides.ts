import { serverFetch } from "@/lib/server-fetch";

export const getGuides = async () => {
    const res = await serverFetch.get("/guides", {
        cache: "no-store",
    });
    const result = await res.json();
    return result.data;
};