"use client";

import { addToWishlist } from "@/services/tourist/addToWishlist";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function WishlistButton({
    tourId,
    initialAdded,
}: {
    tourId: string;
    initialAdded: boolean;
}) {
    const [pending, startTransition] = useTransition();
    const [added, setAdded] = useState(initialAdded);

    const handleWishlist = () => {
        if (added) return;

        startTransition(async () => {
            const res = await addToWishlist(tourId);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            setAdded(true);
            toast.success(res.message);
        });
    };

    return (
        <button
            onClick={handleWishlist}
            disabled={pending || added}
            className="text-sm border px-4 py-2 rounded"
        >
            {added ? "❤️ Added" : "🤍 Wishlist"}
        </button>
    );
}
