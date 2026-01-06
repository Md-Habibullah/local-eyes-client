import EmptyState from "@/components/shared/EmptyState";
import { getGuidePayouts } from "@/services/guide/getGuidePayouts";
import { AlertCircle } from "lucide-react";

const GuidePayoutsPage = async () => {
    const data = await getGuidePayouts();

    if (!data) {
        return <EmptyState icon={AlertCircle} title="No payout data available" />;
    }
    if (data && data.error) {
        return <EmptyState icon={AlertCircle} title={data.error} />;
    }

    return (
        <div className="rounded-xl border p-6 max-w-sm">
            <h2 className="text-lg font-semibold">Earnings</h2>

            <p className="text-3xl font-bold mt-3 text-green-600">
                ৳ {data.totalUnpaidEarning}
            </p>

            <p className="text-sm text-muted-foreground mt-1">
                {data.totalCompletedBookings} completed bookings
            </p>

            <p className="text-xs text-gray-500 mt-4">
                Payouts are processed manually by admin
            </p>
        </div>
    );
};

export default GuidePayoutsPage;
