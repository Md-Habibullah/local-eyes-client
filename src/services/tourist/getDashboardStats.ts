/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export const getDashboardStats = async () => {
    const [bookingRes, wishlistRes] = await Promise.all([
        serverFetch.get("/bookings", { cache: "no-store" }),
        serverFetch.get("/wishlists/my", { cache: "no-store" }),
    ]);

    const bookingResult = await bookingRes.json();
    const wishlistResult = await wishlistRes.json();

    if (!bookingRes.ok || bookingResult.success === 'false') {
        return { error: bookingResult.message || "Failed to get tours" };
    }

    if (!wishlistRes.ok || wishlistResult.success === 'false') {
        return { error: wishlistResult.message || "Failed to get wishlist" };
    }

    const bookings = bookingResult.data || [];
    const wishlist = wishlistResult || [];

    const totalBookings = bookings.length;

    const upcomingTours = bookings.filter(
        (b: any) =>
            b.status === "CONFIRMED" &&
            new Date(b.date) > new Date()
    ).length;

    const completedTours = bookings.filter(
        (b: any) => b.status === "COMPLETED"
    ).length;

    return {
        totalBookings,
        upcomingTours,
        completedTours,
        wishlistCount: wishlist.length,
    };
};
