import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { getDashboardStats } from "@/services/tourist/getDashboardStats";
import { AlertCircle } from "lucide-react";

const TouristDashboardPage = async () => {
    const stats = await getDashboardStats();

    if (!stats) {
        return <EmptyState icon={AlertCircle} title="Failed to load stats." />;
    }
    if (stats && stats.error) {
        return <EmptyState icon={AlertCircle} title={stats.error} />;
    }
    const pieData = [
        { name: "Upcoming Tours", value: stats.upcomingTours || 0 },
        { name: "Completed Tours", value: stats.completedTours || 0 },
        { name: "Wishlist", value: stats.wishlistCount || 0 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Tourist Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Total Bookings" value={stats.totalBookings || 0} />
                <StatCard title="Upcoming Tours" value={stats.upcomingTours || 0} />
                <StatCard title="Completed Tours" value={stats.completedTours || 0} />
                <StatCard title="Wishlist" value={stats.wishlistCount || 0} />
            </div>

            {/* Pie Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChartCard
                    title="Tour Distribution"
                    data={pieData}
                />
            </div>
        </div>
    );
};

const StatCard = ({
    title,
    value,
}: {
    title: string;
    value: number;
}) => (
    <div className="border rounded p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default TouristDashboardPage;
