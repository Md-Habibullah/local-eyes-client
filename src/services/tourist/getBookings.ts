import { serverFetch } from "@/lib/server-fetch";

export const getBookings = async (page = 1) => {
    const res = await serverFetch.get(
        `/bookings?page=${page}&limit=5`,
        {
            // cache: 'force-cache',
            next: {
                revalidate: 120
            }
        }
    );

    const result = await res.json();
    console.log("STATUS:", res.status);
    console.log("DATA:", result);


    // HARD CHECK (backend friendly)
    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to fetch bookings" };
    }

    return result;
};