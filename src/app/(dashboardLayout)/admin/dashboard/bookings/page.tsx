/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getBookings } from "@/services/bookings/getBookings";
import { AlertCircle } from "lucide-react";

const AdminBookingsPage = async () => {
    const bookings = await getBookings();

    if (!bookings) {
        return <EmptyState icon={AlertCircle} title="Failed to load bookings." />;
    }

    if (bookings && bookings.error) {
        return <EmptyState icon={AlertCircle} title={bookings.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">All Bookings</h1>

            {bookings.map((b: any) => (
                <div key={b.id} className="border p-4 rounded">
                    <p>{b.tour.title}</p>
                    <p>{b.tourist.name}</p>
                    <p>Status: {b.status}</p>
                </div>
            ))}
        </div>
    );
};

export default AdminBookingsPage;
