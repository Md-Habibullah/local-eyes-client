/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from "@/components/shared/EmptyState";
import { getGuides } from "@/services/guide/getGuides";
import { AlertCircle } from "lucide-react";

const GuidesPage = async () => {
    const guides = await getGuides();

    if (!guides) {
        return <EmptyState icon={AlertCircle} title="Failed to load guides." />;
    }

    if (guides && guides.error) {
        return <EmptyState icon={AlertCircle} title={guides.error} />;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Guides</h1>

            {guides.map((g: any) => (
                <div key={g.id} className="border p-4 rounded">
                    <p>{g.email}</p>
                    <p>Status: {g.status}</p>
                </div>
            ))}
        </div>
    );
};

export default GuidesPage;
