/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { isWishlisted } from "@/services/tourist/isWishlisted";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function TourCard({ tour }: { tour: any }) {
    const userInfo = await getUserInfo();

    const alreadyAdded =
        userInfo?.role === "TOURIST" ? await isWishlisted(tour.id) : false;

    return (
        <div className="relative z-10 border rounded p-4 space-y-2">
            <h3 className="font-semibold">{tour.title}</h3>
            <p className="text-sm text-muted-foreground">{tour.city}</p>
            <p>${tour.price}</p>

            <div className="flex justify-between items-center">
                <Link
                    href={`/tours/${tour.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                    View Details
                </Link>

                {userInfo?.role === "TOURIST" && (
                    <WishlistButton
                        tourId={tour.id}
                        initialAdded={alreadyAdded}
                    />
                )}
            </div>
        </div>
    );
}
