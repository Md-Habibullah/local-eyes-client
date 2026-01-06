/* eslint-disable @typescript-eslint/no-explicit-any */
import TourCard from "@/components/modules/Tour/TourCard";
import EmptyState from "@/components/shared/EmptyState";
import { getMyTours } from "@/services/guide/getMyTours";
import { AlertCircle } from "lucide-react";

const ToursPage = async () => {
    const tours = await getMyTours()

    if (!tours || tours.length === 0) {
        return <EmptyState icon={AlertCircle} title="No tours found." />;
    }

    if (tours && (tours as any).error) {
        return <EmptyState icon={AlertCircle} title={(tours as any).error} />;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 space-y-6">
            <h1 className="text-3xl font-bold">Explore Tours</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {tours.map((tour: any) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
};

export default ToursPage;