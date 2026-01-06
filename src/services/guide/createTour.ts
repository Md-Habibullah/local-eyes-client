/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTourSchema, TourCategory } from "@/zod/tour.validation";

/**
 * Server action to create a tour
 * Handles formData with images and validates using zod
 */
export const createTour = async (_currentState: any, formData: FormData) => {
    try {
        // 1️⃣ Build payload from form data
        const payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            itinerary: formData.get("itinerary"),
            price: Number(formData.get("price")),
            duration: Number(formData.get("duration")),
            durationType: formData.get("durationType") || "hours",
            meetingPoint: formData.get("meetingPoint"),
            maxGroupSize: Number(formData.get("maxGroupSize")),
            category: formData.get("category") as TourCategory,
            city: formData.get("city"),
            country: formData.get("country") || undefined,
            images: [] as string[], // placeholder, backend will handle actual uploads
        };

        // 2️⃣ Validate payload
        const validationResult = zodValidator(payload, createTourSchema);
        if (!validationResult.success) return validationResult;

        const validatedPayload = validationResult.data;

        // 3️⃣ Prepare FormData for backend
        const uploadFormData = new FormData();
        uploadFormData.append("data", JSON.stringify(validatedPayload));

        // 4️⃣ Handle multiple image files (max 3)
        const files = formData.getAll("images").slice(0, 3);
        files.forEach((file) => {
            if (file instanceof Blob) {
                uploadFormData.append("files", file);
            }
        });

        // 5️⃣ Send to backend
        const res = await serverFetch.post("/listings", { body: uploadFormData });

        // 6️⃣ Parse response
        const result = await res.json();
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create tour. Please try again.",
        };
    }
};
