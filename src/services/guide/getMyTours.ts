import { serverFetch } from "@/lib/server-fetch";


export const getMyTours = async () => {
    const res = await serverFetch.get("/listings/my-listings");

    const result = await res.json();

    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to get my tours" };
    }

    return result.data || [];
};