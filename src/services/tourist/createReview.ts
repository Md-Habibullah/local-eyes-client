/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";

interface ReviewPayload {
    bookingId: string;
    rating: number;
    comment: string;
}

export const createReview = async (
    prevState: any,
    formData: FormData
): Promise<{
    success: boolean;
    message: string;
    errors?: Record<string, string[]>
}> => {

    // Extract form data
    const bookingId = formData.get("bookingId") as string;
    const rating = formData.get("rating") as string;
    const comment = formData.get("comment") as string;

    // Client-side validation
    const errors: Record<string, string[]> = {};

    if (!bookingId || bookingId.trim().length === 0) {
        errors.bookingId = ["Booking ID is required"];
    }

    const ratingNum = Number(rating);
    if (!rating || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        errors.rating = ["Please select a valid rating between 1 and 5"];
    }

    if (!comment || comment.trim().length < 10) {
        errors.comment = ["Please provide a detailed comment (at least 10 characters)"];
    }

    if (comment && comment.trim().length > 500) {
        errors.comment = ["Comment must be less than 500 characters"];
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Please fix the errors below",
            errors
        };
    }

    // Prepare payload
    const payload: ReviewPayload = {
        bookingId: bookingId.trim(),
        rating: ratingNum,
        comment: comment.trim(),
    };

    console.log("Submitting review for booking:", payload);

    try {
        // Send request to API
        const res = await serverFetch.post("/reviews", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            // Handle API errors
            return {
                success: false,
                message: result.message || `Failed to submit review (Status: ${res.status})`,
                errors: result.errors || {}
            };
        }

        // Success response
        return {
            success: true,
            message: result.message || "Thank you! Your review has been submitted successfully.",
        };

    } catch (error) {
        console.error("Error submitting review:", error);

        // Network or server errors
        return {
            success: false,
            message: error instanceof Error ? error.message : "Network error. Please check your connection and try again.",
        };
    }
};