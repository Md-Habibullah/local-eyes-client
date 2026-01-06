"use client";

import { removeFromWishlist } from "@/services/tourist/removeFromWishlist";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function RemoveWishlistButton({
    tourId,
}: {
    tourId: string;
}) {
    const [pending, startTransition] = useTransition();

    const handleRemove = () => {
        startTransition(async () => {
            const res = await removeFromWishlist(tourId);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            window.location.reload(); // ✅ simplest & safe
        });
    };

    return (
        <button
            onClick={handleRemove}
            disabled={pending}
            className="text-sm border px-3 py-1 rounded text-red-600 hover:bg-red-50"
        >
            <Trash2 className="w-6 h-6" />
        </button>
    );
}
