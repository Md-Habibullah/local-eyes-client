/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getGuideStats = async () => {
    const res = await serverFetch.get("/bookings", { cache: "no-store" });
    const result = await res.json();

    const bookings = result.data || [];

    return {
        totalBookings: bookings.length,
        pending: bookings.filter((b: any) => b.status === "PENDING").length,
        completed: bookings.filter((b: any) => b.status === "COMPLETED").length,
        earnings: bookings
            .filter((b: any) => b.isGuidePaid)
            .reduce((sum: number, b: any) => sum + (b.guidePayoutAmount || 0), 0),
    };
};