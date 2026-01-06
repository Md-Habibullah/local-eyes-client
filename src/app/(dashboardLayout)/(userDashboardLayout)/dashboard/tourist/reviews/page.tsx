/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getMyReviews } from "@/services/tourist/getMyReviews";
import { AlertCircle } from "lucide-react";

const MyReviewsPage = async () => {
    const reviews = await getMyReviews();

    if (!reviews) {
        return <EmptyState icon={AlertCircle} title="Failed to load reviews." />;
    }

    if (reviews && reviews.error) {
        return <EmptyState icon={AlertCircle} title={reviews.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">My Reviews</h1>

            {reviews.length === 0 && (
                <p className="text-muted-foreground">No reviews yet</p>
            )}

            {reviews.map((r: any) => (
                <div key={r.id} className="border p-4 rounded">
                    <p className="font-medium">Rating: {r.rating}/5</p>
                    <p>{r.comment}</p>
                    <p className="text-sm text-muted-foreground">
                        {new Date(r.createdAt).toDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MyReviewsPage;
