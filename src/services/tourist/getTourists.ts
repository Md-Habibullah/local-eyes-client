import { serverFetch } from "@/lib/server-fetch";

export const getTourists = async () => {
    const res = await serverFetch.get("/users?role=TOURIST", {
        cache: "no-store",
    });
    const result = await res.json();
    return result.data;
};