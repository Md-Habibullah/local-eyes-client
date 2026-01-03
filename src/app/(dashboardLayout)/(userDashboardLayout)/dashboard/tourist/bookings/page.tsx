import Link from "next/link";
// import { serverFetch } from "@/lib/serverFetch";
import { Booking } from "@/types/booking";
import { serverFetch } from "@/lib/server-fetch";

interface ApiResponse {
    data: Booking[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

const getBookings = async (page = 1): Promise<ApiResponse> => {
    const res = await serverFetch.get(`/bookings/my?page=${page}&limit=5`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
};

export default async function TouristBookingsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Number(searchParams.page || 1);
    const result = await getBookings(page);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">My Bookings</h1>

            {result.data.length === 0 && (
                <p className="text-muted-foreground">No bookings found.</p>
            )}

            {result.data.map((booking) => (
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
                        <p className="font-semibold">৳ {booking.totalPrice}</p>

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
