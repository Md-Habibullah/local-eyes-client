/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

/**
 * Server action to initiate payment for a booking
 */
export const initiatePayment = async (bookingId: string) => {
    try {
        const response = await serverFetch.post(`/payments/booking/${bookingId}`);

        if (!response.ok) {
            throw new Error("Failed to initiate payment");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Payment initiation error:", error);
        return {
            success: false,
            message: error.message || "Failed to initiate payment. Please try again.",
        };
    }
};

/**
 * Server action to verify payment status
 */
export const verifyPaymentStatus = async (bookingId: string) => {
    try {
        const response = await serverFetch.get(`/bookings/${bookingId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch booking status");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Payment verification error:", error);
        return {
            success: false,
            message: error.message || "Failed to verify payment status.",
        };
    }
};