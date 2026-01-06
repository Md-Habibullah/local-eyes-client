/* eslint-disable @typescript-eslint/no-explicit-any */
import RemoveWishlistButton from "@/components/modules/Home/RemoveWishlistButton";
import EmptyState from "@/components/shared/EmptyState";
import { getWishlist } from "@/services/tourist/getWishlist";
import { AlertCircle } from "lucide-react";

const WishlistPage = async () => {
    const wishlistRes = await getWishlist();
    const wishlist = wishlistRes.data;

    if (!wishlist.length) {
        return <EmptyState icon={AlertCircle} title="Wishlist is empty" />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Wishlist</h1>

            {wishlist.map((item: any) => (
                <div
                    key={item.id}
                    className="border p-4 rounded flex justify-between items-center"
                >
                    <div>
                        <h3 className="font-medium">{item.tour.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {item.tour.city}
                        </p>
                        <p className="text-sm">
                            Guide: {item.tour.guide.name}
                        </p>
                    </div>

                    <RemoveWishlistButton tourId={item.tour.id} />
                </div>
            ))}
        </div>
    );
};

export default WishlistPage;
