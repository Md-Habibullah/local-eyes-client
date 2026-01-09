/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { serverFetch } from "@/lib/server-fetch";
import { AlertCircle, Users, Calendar, Ticket, DollarSign, TrendingUp, BarChart3 } from "lucide-react";

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
    <div className="space-y-8 p-6 bg-linear-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Overview of your platform performance</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">Real-time Analytics</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="from-blue-500 to-blue-600"
          trend={12.5}
        />
        <Stat
          title="Active Tours"
          value={stats.totalTours}
          icon={Ticket}
          color="from-emerald-500 to-emerald-600"
          trend={8.2}
        />
        <Stat
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          color="from-violet-500 to-violet-600"
          trend={15.3}
        />
        <Stat
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-amber-500 to-amber-600"
          trend={22.7}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Booking Payment Status</h3>
              <p className="text-gray-500 text-sm mt-1">Distribution of paid vs unpaid bookings</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="h-72">
            <PieChartCard
              title=""
              data={pieData}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-6">Performance Summary</h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div>
                <p className="text-gray-300 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalBookings > 0
                    ? ((stats.paidBookings / stats.totalBookings) * 100).toFixed(1)
                    : '0'}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div>
                <p className="text-gray-300 text-sm">Average Revenue per Booking</p>
                <p className="text-2xl font-bold mt-1">
                  ${stats.paidBookings > 0 ? (stats.revenue / stats.paidBookings).toFixed(2) : '0.00'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-gray-300 text-sm">Paid Bookings</p>
                <p className="text-2xl font-bold mt-1">{stats.paidBookings}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-gray-300 text-sm">Unpaid Bookings</p>
                <p className="text-2xl font-bold mt-1">{stats.unpaidBookings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700 font-medium">Booking to Payment Ratio</p>
            <p className="text-lg font-bold text-blue-900 mt-2">
              {stats.totalBookings > 0
                ? ((stats.paidBookings / stats.totalBookings) * 100).toFixed(1)
                : '0'}%
            </p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl">
            <p className="text-sm text-emerald-700 font-medium">Active Users</p>
            <p className="text-lg font-bold text-emerald-900 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <p className="text-sm text-amber-700 font-medium">Revenue Growth</p>
            <p className="text-lg font-bold text-amber-900 mt-2">+22.7%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({
  title,
  value,
  icon: Icon,
  color,
  trend
}: {
  title: string;
  value: any;
  icon: any;
  color: string;
  trend?: number;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-700 font-medium text-sm">+{trend}%</span>
        </div>
      )}
    </div>

    <p className="text-3xl font-bold text-gray-900">{value}</p>
    <p className="text-gray-500 text-sm mt-2">{title}</p>

    <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full bg-linear-to-r ${color} rounded-full`}
        style={{ width: '75%' }}
      />
    </div>
  </div>
);

export default AdminDashboardPage;