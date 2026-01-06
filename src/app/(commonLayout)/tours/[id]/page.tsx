import WishlistButton from "@/components/modules/Home/WishlistButton";
import EmptyState from "@/components/shared/EmptyState";
import { checkWishlist } from "@/services/tourist/checkWishlist";
import { getTourByID } from "@/services/tours/getTourById";
import { AlertCircle } from "lucide-react";
import { getCurrentUser } from "@/services/auth/getProfileData";
import Link from "next/link";

export default async function TourDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const tour = await getTourByID(id);
    if (!tour) {
        return <EmptyState icon={AlertCircle} title="Tour not found" />;
    }

    if (tour.error) {
        return <EmptyState icon={AlertCircle} title={tour.error} />;
    }

    const userResponse = await getCurrentUser();
    const user = userResponse?.data;
    const role = user?.role;

    let wishlistExists = false;

    if (role === "TOURIST") {
        const wishlist = await checkWishlist(tour.id);
        wishlistExists = wishlist?.exists || false;
    }

    const isGuideOwner =
        role === "GUIDE" && tour?.guide?.id === user?.profile?.id;

    return (
        <div className="space-y-4 mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold">{tour?.title}</h1>
            <p>{tour?.description}</p>

            <div className="flex gap-4 text-sm">
                <span>📍 {tour?.city}</span>
                <span>💰 ${tour?.price}</span>
            </div>

            {/* 🎯 TOURIST */}
            {role === "TOURIST" && (
                <WishlistButton
                    tourId={tour.id}
                    initialAdded={wishlistExists}
                />
            )}

            {/* 🎯 GUIDE (owner only) */}
            {isGuideOwner && (
                <Link
                    href={`/tours/${tour.id}/edit`}
                    className="inline-flex rounded bg-blue-600 px-4 py-2 text-white text-sm"
                >
                    Edit Tour
                </Link>
            )}
        </div>
    );
}