import ReviewForm from "@/components/modules/Tourist/ReviewForm";
import EmptyState from "@/components/shared/EmptyState";
import { getBookingById } from "@/services/tourist/getBookingById";
import { AlertCircle } from "lucide-react";

const ReviewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const booking = await getBookingById(id);

    if (!booking) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <EmptyState
                        icon={AlertCircle}
                        title="Failed to load booking"
                        description="We couldn't retrieve the booking details. Please try again later."
                    />
                </div>
            </div>
        );
    }

    if (booking && booking.error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <EmptyState
                        icon={AlertCircle}
                        title={booking.error}
                        description="There was an issue loading this booking. Please check the booking ID and try again."
                    />
                </div>
            </div>
        );
    }

    // Validate the ID
    if (!id) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-800/30 p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Invalid Booking</h1>
                        <p className="text-gray-600 dark:text-gray-400">The booking ID is missing or invalid.</p>
                    </div>
                </div>
            </div>
        );
    }

    return <ReviewForm bookingId={id} booking={booking} />;
};

export default ReviewPage;