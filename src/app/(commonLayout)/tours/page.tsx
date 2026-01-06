/* eslint-disable @typescript-eslint/no-explicit-any */
import TourCard from "@/components/modules/Home/TourCard";
import EmptyState from "@/components/shared/EmptyState";
import { getTours } from "@/services/tours/getTours";
import { AlertCircle } from "lucide-react";

export default async function ToursPage() {
    const tours = await getTours();

    if (!tours || tours.length === 0) {
        return <EmptyState icon={AlertCircle} title="No tours available" />;
    }

    if (tours && (tours as any).error) {
        return <EmptyState icon={AlertCircle} title={(tours as any).error} />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">All Tours</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tours.map((tour: any) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
}
