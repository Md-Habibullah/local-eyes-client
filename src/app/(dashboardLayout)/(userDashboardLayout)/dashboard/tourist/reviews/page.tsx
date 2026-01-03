export default function TouristReviewsPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">My Reviews</h1>

            <div className="rounded-lg border bg-background p-4">
                <p className="text-muted-foreground text-sm">
                    You haven’t submitted any reviews yet.
                </p>
            </div>
        </div>
    );
}
