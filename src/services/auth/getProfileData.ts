'use server';

import { serverFetch } from "@/lib/server-fetch";

export async function getCurrentUser() {
    const res = await serverFetch.get('/users/me', {
        cache: "no-store",
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
        }
    });

    const data = await res.json();

    if (!res.ok || data.success === 'false') {
        return { error: data.message || "Failed to fetch user data" };
    }

    return data;
}