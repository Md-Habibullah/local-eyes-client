"use client";

import { XCircle } from "lucide-react";
import { cancelBookingAction } from "@/services/tourist/cancelBooking";
import { useTransition } from "react";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await cancelBookingAction(bookingId);
                })
            }
            className="w-full flex items-center justify-center gap-2 px-4 py-2
      bg-linear-to-r from-red-50 to-red-100
      dark:from-red-900/20 dark:to-red-900/10
      text-red-700 dark:text-red-400
      font-medium rounded-full border
      border-red-200 dark:border-red-800/30
      hover:bg-red-100 dark:hover:bg-red-900/30
      transition-colors text-sm
      disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <XCircle className="w-4 h-4" />
            {isPending ? "Cancelling..." : "Cancel Booking"}
        </button>
    );
}
