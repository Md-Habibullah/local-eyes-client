
import EmptyState from "@/components/shared/EmptyState";
import { getTourByID } from "@/services/tours/getTourById";
import { getCurrentUser } from "@/services/auth/getProfileData";
import { AlertCircle } from "lucide-react";
import EditTourForm from "@/components/modules/Tour/EditTourForm";

export default async function EditTourPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const tour = await getTourByID(id);
    if (!tour) {
        return <EmptyState icon={AlertCircle} title="Tour not found" />;
    }

    const userRes = await getCurrentUser();
    const user = userRes?.data;

    console.log("user", user, "tour", tour)

    const isOwner =
        user?.role === "GUIDE" && tour?.guide?.id === user?.profile?.id;

    if (!isOwner) {
        return (
            <EmptyState
                icon={AlertCircle}
                title="You are not allowed to edit this tour"
            />
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold">Edit Tour</h1>

            <EditTourForm tour={tour} />
        </div>
    );
}