/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const changePassword = async (_prev: any, formData: FormData) => {
    try {
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        if (!currentPassword || !newPassword) {
            return { success: false, message: "Please provide both passwords" };
        }

        const res = await serverFetch.post('/auth/change-password', {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to change password" };
        }

        return { success: true, message: data.message || "Password updated successfully" };
    } catch (err: any) {
        return { success: false, message: err.message || "Something went wrong" };
    }
};