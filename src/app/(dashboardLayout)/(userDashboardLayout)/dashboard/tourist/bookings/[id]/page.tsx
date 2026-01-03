// import { serverFetch } from "@/lib/serverFetch";
import { serverFetch } from "@/lib/server-fetch";
import { Booking } from "@/types/booking";

const getBooking = async (id: string): Promise<Booking> => {
    const res = await serverFetch.get(`/bookings/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");
    const result = await res.json();
    return result.data;
};

export default async function BookingDetails({
    params,
}: {
    params: { id: string };
}) {
    const booking = await getBooking(params.id);

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">
                {booking.tour.title}
            </h1>

            <p className="text-muted-foreground">
                Location: {booking.tour.location}
            </p>

            <p>Status: {booking.status}</p>
            <p>Total: ৳ {booking.totalPrice}</p>

            {/* REVIEW */}
            {booking.status === "CONFIRMED" && (
                <form
                    action={async (formData) => {
                        "use server";
                        await serverFetch.post("/reviews", {
                            body: JSON.stringify({
                                tourId: booking.tour.id,
                                rating: Number(formData.get("rating")),
                                comment: formData.get("comment"),
                            }),
                            headers: { "Content-Type": "application/json" },
                        });
                    }}
                    className="space-y-2"
                >
                    <h3 className="font-medium">Leave a Review</h3>

                    <input
                        name="rating"
                        type="number"
                        min={1}
                        max={5}
                        placeholder="Rating (1-5)"
                        className="border p-2 w-full"
                    />

                    <textarea
                        name="comment"
                        placeholder="Your review"
                        className="border p-2 w-full"
                    />

                    <button className="px-4 py-2 bg-primary text-white rounded">
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
}
