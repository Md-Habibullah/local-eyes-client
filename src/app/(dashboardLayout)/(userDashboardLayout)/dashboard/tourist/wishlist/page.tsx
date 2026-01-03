/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

const getWishlist = async () => {
    const res = await serverFetch.get("/wishlist", {
        cache: "no-store",
    });
    return res.json();
};

export default async function WishlistPage() {
    const result = await getWishlist();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Wishlist</h1>

            {result.data.map((tour: any) => (
                <div key={tour.id} className="border p-4 rounded">
                    <h3>{tour.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {tour.location}
                    </p>
                </div>
            ))}
        </div>
    );
}
