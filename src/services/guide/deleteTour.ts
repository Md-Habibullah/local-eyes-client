/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * Server action to delete a tour
 */
export const deleteTour = async (tourId: string) => {
    try {
        const response = await serverFetch.delete(`/listings/${tourId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete tour");
        }

        // Revalidate the tours pages
        revalidatePath('/dashboard/admin/tours');
        revalidatePath('/dashboard/guide/tours');
        revalidatePath('/tours');

        return {
            success: true,
            message: "Tour deleted successfully",
        };
    } catch (error: any) {
        console.error("Delete tour error:", error);
        return {
            success: false,
            message: error.message || "Failed to delete tour. Please try again.",
        };
    }
};

/**
 * Server action to toggle tour status (active/inactive)
 */
export const toggleTourStatus = async (tourId: string, isActive: boolean) => {
    try {
        const response = await serverFetch.patch(`/listings/${tourId}`, {
            body: JSON.stringify({ isActive: !isActive }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update tour status");
        }

        // Revalidate the tours pages
        revalidatePath('/dashboard/admin/tours');

        return {
            success: true,
            message: `Tour ${!isActive ? 'activated' : 'deactivated'} successfully`,
        };
    } catch (error: any) {
        console.error("Toggle tour status error:", error);
        return {
            success: false,
            message: error.message || "Failed to update tour status. Please try again.",
        };
    }
};