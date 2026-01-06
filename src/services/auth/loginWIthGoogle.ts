/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";

/**
 * Server action to initiate Google OAuth login
 */
export const loginWithGoogle = async () => {
    try {
        // Your backend route that starts Google OAuth
        const res = await serverFetch.get("/auth/google");
        console.log(res)

        if (!res.ok) {
            throw new Error("Failed to initiate Google login");
        }

        // The backend should return the Google redirect URL
        const { url } = await res.json();

        if (!url) throw new Error("No Google login URL returned");

        // Redirect user to Google login page
        redirect(url);
    } catch (err: any) {
        console.error("Google login failed:", err);
        throw new Error(err.message || "Google login failed");
    }
};
