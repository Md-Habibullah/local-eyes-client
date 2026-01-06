/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export type GuideEarning = {
    guideId: string;
    name: string;
    profilePhoto?: string | null;
    dailyRate: number;
    totalUnpaidEarning: number;
    totalCompletedBookings: number;
};

export const getGuideEarnings = async (): Promise<GuideEarning[]> => {
    try {
        const res = await serverFetch.get("/guides/earnings");

        if (!res.ok) {
            throw new Error(`Failed to fetch guide earnings: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message || "Failed to fetch guide earnings");
        }

        return data.data as GuideEarning[];
    } catch (error: any) {
        console.error("[getGuideEarnings]", error);
        return [];
    }
};
