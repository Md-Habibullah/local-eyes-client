/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getTourists } from "@/services/tourist/getTourists";
import { AlertCircle } from "lucide-react";


const TouristsPage = async () => {
    const tourists = await getTourists();
    if (!tourists) {
        return <EmptyState icon={AlertCircle} title="Failed to load tourists." />;
    }

    if (tourists && tourists.error) {
        return <EmptyState icon={AlertCircle} title={tourists.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Tourists</h1>

            {tourists.map((t: any) => (
                <div key={t.id} className="border p-4 rounded">
                    <p>{t.email}</p>
                    <p>Status: {t.status}</p>
                </div>
            ))}
        </div>
    );
};

export default TouristsPage;
