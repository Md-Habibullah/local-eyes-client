// src/services/guide/updateBookingStatus.ts
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const updateBookingStatus = async (
    bookingId: string,
    status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
) => {
    const res = await serverFetch.patch(
        `/bookings/${bookingId}/status`,
        {
            body: JSON.stringify({ status }),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result?.message || "Failed to update booking",
        };
    }

    return {
        success: true,
        message: result?.message || `Booking marked as ${status}`,
    };
};
