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

        console.log("Starting updateTour for ID:", id);

        // Build payload with PATCH semantics (all fields optional)
        const payload: any = {
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
            isActive: formData.get("isActive") === "on" || undefined,
        };

        // Remove undefined values to avoid sending empty strings/undefined
        Object.keys(payload).forEach(key => {
            if (payload[key] === undefined || payload[key] === "") {
                delete payload[key];
            }
        });

        console.log("Payload after cleanup:", payload);

        // Validate the payload (id is not included as it's in URL)
        const validationResult = zodValidator(payload, updateTourSchema);

        // Filter out id errors since id is in URL, not in payload
        if (!validationResult.success) {
            const errors = validationResult.errors || [];

            // Filter out id field errors
            const filteredErrors = errors.filter(error =>
                String(error.field) !== "id"
            );

            if (filteredErrors.length > 0) {
                console.log("Validation failed:", filteredErrors);

                // Format validation errors for display
                const errorMessages = filteredErrors.map(error =>
                    `${String(error.field)}: ${error.message}`
                ).join(", ");

                return {
                    success: false,
                    message: `Validation error: ${errorMessages}`,
                    errors: filteredErrors,
                };
            }
            // If only error is about id, continue (it's expected)
        }

        const validatedPayload = validationResult.data || payload;
        console.log("Validated payload:", validatedPayload);

        // Prepare FormData for backend
        const uploadFormData = new FormData();

        // Append JSON data as "data" field
        uploadFormData.append("data", JSON.stringify(validatedPayload));

        // Handle image files - note: using "files" field name to match backend
        const files = formData.getAll("files");
        console.log("Files to upload:", files.length);

        if (files.length > 0) {
            files.forEach((file, index) => {
                if (file instanceof File && file.size > 0) {
                    console.log(`Adding file ${index}:`, {
                        name: file.name || `file-${index}`,
                        type: file.type,
                        size: file.size,
                    });
                    uploadFormData.append("files", file);
                }
            });
        } else {
            console.log("No new images uploaded. Existing images will remain unchanged.");
        }

        console.log("Sending PATCH request to:", `/listings/${id}`);

        try {
            // Send PATCH request to backend
            const res = await serverFetch.patch(`/listings/${id}`, {
                body: uploadFormData,
            });

            console.log("Response status:", res.status, res.statusText);

            if (!res.ok) {
                let errorData;
                try {
                    errorData = await res.json();
                } catch {
                    errorData = { message: await res.text() };
                }

                console.error("Server error response:", errorData);
                return {
                    success: false,
                    message: errorData.message || `Server error: ${res.status} ${res.statusText}`,
                };
            }

            const result = await res.json();
            console.log("Update successful:", result);

            // Revalidate relevant paths
            revalidatePath("/dashboard/guide/tours");
            revalidatePath("/tours");
            revalidatePath(`/tours/${id}`);
            revalidatePath(`/dashboard/guide/tours/${id}`);

            return {
                success: true,
                message: result.message || "Tour updated successfully!",
                data: result.data,
            };
        } catch (fetchError: any) {
            console.error("Fetch error:", fetchError);
            return {
                success: false,
                message: `Network error: ${fetchError.message || "Failed to connect to server"}`,
            };
        }
    } catch (error: any) {
        // Handle Next.js redirects
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        console.error("Update tour error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message || "Unknown error occurred"
                    : "Failed to update tour. Please try again.",
        };
    }
};