/* eslint-disable @typescript-eslint/no-explicit-any */

import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { getGuideStats } from "@/services/guide/getGuideStats";
import { AlertCircle } from "lucide-react";

const GuideDashboardPage = async () => {
    const stats = await getGuideStats();

    if (!stats) {
        return <EmptyState icon={AlertCircle} title="Failed to load stats." />;
    }

    if (stats && (stats as any).error) {
        return <EmptyState icon={AlertCircle} title={(stats as any).error} />;
    }

    const pieData = [
        { name: "Pending Requests", value: stats.pending || 0 },
        { name: "Completed Tours", value: stats.completed || 0 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Guide Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Stat title="Total Bookings" value={stats.totalBookings} />
                <Stat title="Pending Requests" value={stats.pending} />
                <Stat title="Completed Tours" value={stats.completed} />
                <Stat title="Total Earnings" value={`$${stats.earnings}`} />
            </div>

            {/* Pie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChartCard
                    title="Tour Status Overview"
                    data={pieData}
                />
            </div>
        </div>
    );
};

const Stat = ({ title, value }: any) => (
    <div className="border rounded p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default GuideDashboardPage;
