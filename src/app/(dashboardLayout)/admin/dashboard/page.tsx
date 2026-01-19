/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { serverFetch } from "@/lib/server-fetch";
import { AlertCircle, Users, Calendar, Ticket, DollarSign, TrendingUp, BarChart3, Eye, Package, CreditCard, PieChart } from "lucide-react";

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
    <div className="space-y-8 p-6 bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of your platform performance</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Real-time Analytics</span>
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Booking Payment Status</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Distribution of paid vs unpaid bookings</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="h-72">
            <PieChartCard
              title=""
              data={pieData}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500 dark:bg-blue-400' : 'bg-emerald-500 dark:bg-emerald-400'}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl shadow-xl border border-gray-800 dark:border-gray-700 p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Performance Summary</h3>
            <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-gray-800/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <div>
                <p className="text-gray-300 dark:text-gray-400 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalBookings > 0
                    ? ((stats.paidBookings / stats.totalBookings) * 100).toFixed(1)
                    : '0'}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-400" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <div>
                <p className="text-gray-300 dark:text-gray-400 text-sm">Avg. Revenue per Booking</p>
                <p className="text-2xl font-bold mt-1">
                  ${stats.paidBookings > 0 ? (stats.revenue / stats.paidBookings).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-gray-300 dark:text-gray-400 text-sm">Paid Bookings</p>
                </div>
                <p className="text-2xl font-bold mt-1">{stats.paidBookings}</p>
              </div>
              <div className="p-4 bg-white/10 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-gray-300 dark:text-gray-400 text-sm">Unpaid Bookings</p>
                </div>
                <p className="text-2xl font-bold mt-1">{stats.unpaidBookings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Quick Insights</h3>
          <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Booking to Payment Ratio</p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-200 mt-2">
              {stats.totalBookings > 0
                ? ((stats.paidBookings / stats.totalBookings) * 100).toFixed(1)
                : '0'}%
            </p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Active Users</p>
            <p className="text-lg font-bold text-emerald-900 dark:text-emerald-200 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Revenue Growth</p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-200 mt-2">+22.7%</p>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Growth</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">+12.5%</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly active user increase</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tour Completion</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">94%</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Successful tour completion rate</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Booking Value</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">$245.50</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Average booking amount</p>
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
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium text-sm">+{trend}%</span>
        </div>
      )}
    </div>

    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{title}</p>

    <div className="mt-4 h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full bg-linear-to-r ${color} rounded-full`}
        style={{ width: '75%' }}
      />
    </div>
  </div>
);

export default AdminDashboardPage;