/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getBookingsForGuide } from "@/services/guide/getBookingsForGuide";
import { AlertCircle } from "lucide-react";
import BookingActionButtons from "@/components/modules/Guide/BookingActionButtons";
import StatusBadge from "@/components/shared/stats/StatusBadge";

const GuideBookingsPage = async () => {
    const bookings = await getBookingsForGuide();

    if (!bookings || bookings.length === 0) {
        return <EmptyState icon={AlertCircle} title="No bookings found" />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Tour Bookings</h1>

            <div className="space-y-4">
                {bookings.map((booking: any) => (
                    <div
                        key={booking.id}
                        className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        {/* Left Info */}
                        <div className="space-y-1">
                            <h3 className="font-medium">{booking.tour.title}</h3>

                            <p className="text-sm text-muted-foreground">
                                Tourist: {booking.tourist.name}
                            </p>

                            <p className="text-sm">
                                Date:{" "}
                                {new Date(booking.date).toLocaleDateString()}
                            </p>

                            <p className="text-sm">
                                People: {booking.numberOfPeople}
                            </p>

                            <p className="text-sm font-medium">
                                Total: ${booking.totalAmount}
                            </p>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col items-start md:items-end gap-2">
                            <StatusBadge status={booking.status} />

                            <BookingActionButtons
                                bookingId={booking.id}
                                status={booking.status}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuideBookingsPage;