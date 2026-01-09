"use client";

import { addToWishlist } from "@/services/tourist/addToWishlist";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Heart, Loader2 } from "lucide-react";

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
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${added
                ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 cursor-default"
                : "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white hover:shadow-lg active:scale-95"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
            aria-label={added ? "Added to wishlist" : "Add to wishlist"}
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                </>
            ) : (
                <>
                    <Heart className={`w-4 h-4 ${added ? "fill-current" : ""}`} />
                    {added ? "Added to Wishlist" : "Add to Wishlist"}
                </>
            )}
        </button>
    );
}