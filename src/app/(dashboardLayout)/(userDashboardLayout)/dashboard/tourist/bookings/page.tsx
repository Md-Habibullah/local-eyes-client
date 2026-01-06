/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from "@/components/shared/EmptyState";
import { serverFetch } from "@/lib/server-fetch";
import { getBookings } from "@/services/tourist/getBookings";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function TouristBookingsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Number(searchParams.page || 1);
    const result = await getBookings(page);

    if (!result) {
        return <EmptyState icon={AlertCircle} title="Failed to load bookings." />;
    }

    if (result && result.error) {
        return <EmptyState icon={AlertCircle} title={result.error} />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">My Bookings</h1>

            {result.data.length === 0 && (
                <p className="text-muted-foreground">No bookings found.</p>
            )}

            {result.data.map((booking: any) => (
                <div
                    key={booking.id}
                    className="border rounded-lg p-4 flex justify-between"
                >
                    <div>
                        <h3 className="font-medium">{booking.tour.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {booking.tour.location}
                        </p>
                        <p className="text-xs mt-1">
                            {new Date(booking.date).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="text-right space-y-2">
                        <p className="font-semibold">৳ {booking.totalAmount}</p>

                        <span className="text-xs px-2 py-1 rounded bg-muted">
                            {booking.status}
                        </span>

                        <div className="flex gap-2 justify-end">
                            <Link
                                href={`/dashboard/tourist/bookings/${booking.id}`}
                                className="text-xs underline"
                            >
                                Details
                            </Link>

                            {booking.status === "PENDING" && (
                                <form
                                    action={async () => {
                                        "use server";
                                        await serverFetch.patch(
                                            `/bookings/${booking.id}/cancel`
                                        );
                                    }}
                                >
                                    <button className="text-xs text-red-600">
                                        Cancel
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="flex gap-2">
                {page > 1 && (
                    <Link href={`?page=${page - 1}`}>Prev</Link>
                )}
                {page * result.meta.limit < result.meta.total && (
                    <Link href={`?page=${page + 1}`}>Next</Link>
                )}
            </div>
        </div>
    );
}
