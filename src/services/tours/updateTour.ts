/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateTourSchema } from "@/zod/tour.validation";
import { revalidatePath } from "next/cache";

export const updateTour = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const id = formData.get("id") as string;

        if (!id) {
            return { success: false, message: "Tour ID is required" };
        }

        // Build payload (PATCH = optional fields)
        const payload = {
            id,
            title: formData.get("title") || undefined,
            description: formData.get("description") || undefined,
            itinerary: formData.get("itinerary") || undefined,
            price: formData.get("price")
                ? Number(formData.get("price"))
                : undefined,
            duration: formData.get("duration")
                ? Number(formData.get("duration"))
                : undefined,
            durationType: formData.get("durationType") || undefined,
            meetingPoint: formData.get("meetingPoint") || undefined,
            maxGroupSize: formData.get("maxGroupSize")
                ? Number(formData.get("maxGroupSize"))
                : undefined,
            category: formData.get("category") || undefined,
            city: formData.get("city") || undefined,
            country: formData.get("country") || undefined,
            isActive: formData.get("isActive") === "on",
        };

        // Validate
        const validationResult = zodValidator(payload, updateTourSchema);
        if (!validationResult.success) return validationResult;

        const validatedPayload = validationResult.data || {};

        // Convert to FormData for backend
        const cleanedPayload = Object.fromEntries(
            Object.entries(validatedPayload).filter(([_, value]) => value !== undefined)
        );

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(cleanedPayload));

        // Send PATCH request
        const res = await serverFetch.patch(`/listings/${id}`, {
            body: newFormData,
        });

        const result = await res.json();

        revalidatePath("/dashboard/guide/tours");
        revalidatePath("/tours");
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update tour. Please try again.",
        };
    }
};
