"use client";

import { updateBookingStatus } from "@/services/guide/updateBookingStatus";
import { useTransition } from "react";
import { toast } from "sonner";

export default function BookingActionButtons({
    bookingId,
    status,
}: {
    bookingId: string;
    status: string;
}) {
    const [pending, startTransition] = useTransition();

    if (status !== "PENDING") return null;

    const handleAction = (newStatus: "CONFIRMED" | "CANCELLED") => {
        startTransition(async () => {
            const res = await updateBookingStatus(bookingId, newStatus);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            window.location.reload();
        });
    };

    return (
        <div className="flex gap-2">
            <button
                disabled={pending}
                onClick={() => handleAction("CONFIRMED")}
                className="px-3 py-1 rounded bg-green-600 text-white text-sm"
            >
                Confirm
            </button>

            <button
                disabled={pending}
                onClick={() => handleAction("CANCELLED")}
                className="px-3 py-1 rounded bg-red-600 text-white text-sm"
            >
                Reject
            </button>
        </div>
    );
}