"use server";

import { serverFetch } from "@/lib/server-fetch";

export const generateTourDescription = async (payload: {
    title: string;
    city: string;
    category: string;
}) => {
    try {
        const res = await serverFetch.post("/ai/generate-tour-description", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return {
            success: false,
            message: "Failed to generate description",
        };
    }
};