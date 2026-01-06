// import { serverFetch } from "@/lib/serverFetch";

import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { getBookingById } from "@/services/tourist/getBookingById";
import { AlertCircle } from "lucide-react";
import Link from "next/link";


const BookingDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const booking = await getBookingById(id);
    const isReviewAllowed = booking?.status === "COMPLETED";
    console.log("resultFromComp", booking)

    if (!booking) {
        return <EmptyState icon={AlertCircle} title="Failed to load booking." />;
    }

    if (booking && booking.error) {
        return <EmptyState icon={AlertCircle} title={booking.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Booking Details</h1>

            <p>Status: {booking?.status}</p>
            <p>Date: {new Date(booking?.date).toDateString()}</p>
            <p>Total: ${booking?.totalAmount}</p>

            <h2 className="font-medium mt-4">Tour</h2>
            <p>{booking?.tour?.title}</p>

            <h2 className="font-medium mt-4">Guide</h2>
            <p>{booking?.guide?.name}</p>
            <Button
                asChild
                disabled={!isReviewAllowed}
                className={!isReviewAllowed ? "pointer-events-none opacity-50" : ""}
            >
                <Link href={`/dashboard/tourist/bookings/${booking?.id}/review`}>
                    Review here
                </Link>
            </Button>

        </div>
    );
};

export default BookingDetails;
