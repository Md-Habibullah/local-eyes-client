import { redirect } from "next/navigation";
import { getBookingById } from "@/services/tourist/getBookingById";
import { getCurrentUser } from "@/services/auth/getProfileData";
import PaymentClient from "./PaymentClient";

export default async function PaymentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Fetch booking details
    const booking = await getBookingById(id);

    // Get current user to verify ownership
    const userRes = await getCurrentUser();
    const user = userRes?.data;

    // Check if booking exists and user owns it
    if (!booking || booking.error) {
        redirect("/dashboard/tourist/bookings");
    }

    if (booking.touristId !== user?.profile?.id) {
        redirect("/dashboard/tourist/bookings");
    }

    // Check if booking is eligible for payment
    if (booking.status !== "CONFIRMED" || booking.isPaid) {
        redirect(`/dashboard/tourist/bookings/${id}`);
    }

    return (
        <PaymentClient
            booking={booking}
            bookingId={id}
        />
    );
}