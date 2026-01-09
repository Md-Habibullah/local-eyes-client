/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * Server action to block a User
 */
export const blockUser = async (userId: string) => {
    try {
        console.log("D", userId)
        const response = await serverFetch.patch(`/users/${userId}/block`);

        if (!response.ok) {
            let errorMessage = "Failed to block user";

            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;

                if (response.status === 403) {
                    errorMessage = "You don't have permission to block this user";
                } else if (response.status === 404) {
                    errorMessage = "User not found";
                }
            } catch {
                errorMessage = response.statusText || errorMessage;
            }

            throw new Error(errorMessage);
        }

        revalidatePath('/dashboard/admin/Users');

        return {
            success: true,
            message: "User blocked successfully",
        };
    } catch (error: any) {
        console.error("Block User error:", error);
        return {
            success: false,
            message: error.message || "Failed to block User. Please try again.",
        };
    }
};

/**
 * Server action to unblock a User
 */
export const unblockUser = async (userId: string) => {
    try {
        const response = await serverFetch.patch(`/users/${userId}/unblock`);

        if (!response.ok) {
            let errorMessage = "Failed to unblock User";

            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;

                if (response.status === 403) {
                    errorMessage = "You don't have permission to unblock this User";
                } else if (response.status === 404) {
                    errorMessage = "User not found";
                }
            } catch {
                errorMessage = response.statusText || errorMessage;
            }

            throw new Error(errorMessage);
        }

        revalidatePath('/dashboard/admin/Users');

        return {
            success: true,
            message: "User unblocked successfully",
        };
    } catch (error: any) {
        console.error("Unblock User error:", error);
        return {
            success: false,
            message: error.message || "Failed to unblock User. Please try again.",
        };
    }
};