import ReviewForm from "@/components/modules/Tourist/ReviewForm";
import EmptyState from "@/components/shared/EmptyState";
import { getBookingById } from "@/services/tourist/getBookingById";
import { AlertCircle } from "lucide-react";

const ReviewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const booking = await getBookingById(id);

    if (!booking) {
        return <EmptyState icon={AlertCircle} title="Failed to load booking." />;
    }

    if (booking && booking.error) {
        return <EmptyState icon={AlertCircle} title={booking.error} />;
    }

    // Validate the ID
    if (!id) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Booking</h1>
                        <p className="text-gray-600">The booking ID is missing or invalid.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <ReviewForm bookingId={id} booking={booking} />
            </div>
        </div>
    );
};

export default ReviewPage;