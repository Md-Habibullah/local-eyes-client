"use server";

import { serverFetch } from "@/lib/server-fetch";

type ContactState = {
    success?: boolean;
    error?: string;
};

export const submitContact = async (
    prevState: ContactState | null,
    formData: FormData
): Promise<ContactState> => {
    try {
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!email || !message) {
            return { error: "Email and message are required" };
        }

        const res = await serverFetch.post("/contact", {
            body: JSON.stringify({ email, message }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (!res.ok || result.success === 'false') {
            return { error: result.message || "Failed to register contact" };
        }

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { error: "Something went wrong" };
    }
};
