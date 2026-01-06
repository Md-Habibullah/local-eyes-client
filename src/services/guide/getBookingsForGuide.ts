import { serverFetch } from "@/lib/server-fetch";

export const getBookingsForGuide = async () => {
    const res = await serverFetch.get("/bookings", { cache: "no-store" });
    const result = await res.json();
    return result.data;
};