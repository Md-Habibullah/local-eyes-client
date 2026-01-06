"use server"
import { serverFetch } from "@/lib/server-fetch";

export const getBookingById = async (id: string) => {
    const res = await serverFetch.get(
        `/bookings/${id}`,
        {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
            }
        }
    );

    const result = await res.json();
    console.log("resultFromService", result)

    if (!res.ok || result.success === 'false') {
        return { error: result.message || "Failed to get booking" };
    }

    return result.data;
};