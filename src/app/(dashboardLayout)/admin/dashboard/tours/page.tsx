/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getTours } from "@/services/tours/getTours";
import { AlertCircle } from "lucide-react";


const AdminToursPage = async () => {
    const tours = await getTours();

    if (!tours) {
        return <EmptyState icon={AlertCircle} title="Failed to load tours." />;
    }

    if (tours && tours.error) {
        return <EmptyState icon={AlertCircle} title={tours.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">All Tours</h1>

            {tours.map((tour: any) => (
                <div key={tour.id} className="border p-4 rounded">
                    <p>{tour.title}</p>
                    <p>{tour.city}</p>
                    <p>${tour.price}</p>
                </div>
            ))}
        </div>
    );
};

export default AdminToursPage;
