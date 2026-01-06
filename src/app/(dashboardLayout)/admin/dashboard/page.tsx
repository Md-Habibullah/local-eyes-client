/* eslint-disable @typescript-eslint/no-explicit-any */
import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { serverFetch } from "@/lib/server-fetch";
import { AlertCircle } from "lucide-react";

const getAdminStats = async () => {
  const [usersRes, bookingsRes, toursRes] = await Promise.all([
    serverFetch.get("/users", { cache: "no-store" }),
    serverFetch.get("/bookings", { cache: "no-store" }),
    serverFetch.get("/tours", { cache: "no-store" }),
  ]);

  const users = (await usersRes.json()).data || [];
  const bookings = (await bookingsRes.json()).data || [];
  const tours = (await toursRes.json()).data || [];

  const paidBookings = bookings.filter((b: any) => b.isPaid);

  return {
    totalUsers: users.length,
    totalTours: tours.length,
    totalBookings: bookings.length,
    revenue: paidBookings.reduce(
      (sum: number, b: any) => sum + b.totalAmount,
      0
    ),
    paidBookings: paidBookings.length,
    unpaidBookings: bookings.length - paidBookings.length,
  };
};

const AdminDashboardPage = async () => {
  const stats = await getAdminStats();

  if (!stats) {
    return <EmptyState icon={AlertCircle} title="Failed to load stats." />;
  }

  if (stats && (stats as any).error) {
    return <EmptyState icon={AlertCircle} title={(stats as any).error} />;
  }

  const pieData = [
    { name: "Paid Bookings", value: stats.paidBookings },
    { name: "Unpaid Bookings", value: stats.unpaidBookings },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Users" value={stats.totalUsers} />
        <Stat title="Tours" value={stats.totalTours} />
        <Stat title="Bookings" value={stats.totalBookings} />
        <Stat title="Revenue" value={`$${stats.revenue}`} />
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCard
          title="Booking Payment Status"
          data={pieData}
        />
      </div>
    </div>
  );
};

const Stat = ({ title, value }: { title: string; value: any }) => (
  <div className="border rounded p-4">
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboardPage;
