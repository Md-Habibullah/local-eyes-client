"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyPaymentStatus } from "@/services/payment/payment.action";

export default function PaymentStatusChecker() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const transactionId = searchParams.get("tran_id");

    useEffect(() => {
        if (transactionId && bookingId) {
            const checkPaymentStatus = async () => {
                try {
                    const result = await verifyPaymentStatus(bookingId);

                    if (result.success) {
                        toast.success("Payment verified successfully!");
                        // Re-fetch bookings data
                        router.refresh(); // This will trigger getBookings to re-fetch
                    }
                } catch (error) {
                    console.error("Failed to verify payment:", error);
                }
            };

            checkPaymentStatus();
        }
    }, [bookingId, transactionId, router]);

    return null; // This component doesn't render anything
}