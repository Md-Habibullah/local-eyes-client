"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function cancelBookingAction(bookingId: string) {
    await serverFetch.patch(`/bookings/${bookingId}/cancel`);
    revalidatePath("/dashboard/tourist/bookings");
}
