
export const dynamic = "force-dynamic";
import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { getDashboardStats } from "@/services/tourist/getDashboardStats";
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Heart,
    MapPin,
    Package,
    Plane,
    Star,
    TrendingUp,
    Trophy,
    Compass,
    Sparkles,
    Users,
    Clock
} from "lucide-react";

const TouristDashboardPage = async () => {
    const stats = await getDashboardStats();

    if (!stats) {
        return <EmptyState
            icon={AlertCircle}
            title="Failed to load stats."
            description="Unable to retrieve your dashboard information. Please try again later."
        />;
    }
    if (stats && stats.error) {
        return <EmptyState
            icon={AlertCircle}
            title={stats.error}
            description="There was an issue loading your dashboard data. Please refresh the page."
        />;
    }

    const pieData = [
        { name: "Upcoming Tours", value: stats.upcomingTours || 0 },
        { name: "Completed Tours", value: stats.completedTours || 0 },
        { name: "Wishlist Items", value: stats.wishlistCount || 0 },
    ];

    // Calculate additional metrics
    const totalBookings = stats.totalBookings || 0;
    const completionRate = totalBookings > 0
        ? ((stats.completedTours || 0) / totalBookings * 100).toFixed(1)
        : '0.0';

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                Travel Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Your travel journey overview and upcoming adventures
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-blue-200 dark:border-blue-800/30">
                                <div className="flex items-center gap-2">
                                    <Compass className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium text-blue-600 dark:text-blue-400">
                                        Explorer Level: <span className="text-amber-600 dark:text-amber-400">Adventurer</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.totalBookings || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <TrendingUp className="w-3 h-3 text-blue-500" />
                                <span className="text-blue-600 dark:text-blue-400">Your travel history</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Tours</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.upcomingTours || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
                                Exciting adventures ahead!
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tours</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.completedTours || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Completion:</span>
                                <span className="font-bold text-purple-600 dark:text-purple-400">{completionRate}%</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.wishlistCount || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Dream destinations</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts & Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Travel Distribution</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of your travel activities</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>

                        <div className="h-72">
                            <PieChartCard
                                title=""
                                data={pieData}
                            />
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            {pieData.map((item, index) => {
                                const colors = ['bg-emerald-500', 'bg-purple-500', 'bg-pink-500'];
                                const percentage = totalBookings > 0
                                    ? ((item.value / Math.max(totalBookings, 1)) * 100).toFixed(1)
                                    : '0.0';

                                return (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                                        <span className="text-sm text-gray-500">({item.value})</span>
                                        <span className="text-sm text-gray-500">{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Travel Insights */}
                    <div className="bg-linear-to-br from-blue-900 to-sky-800 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Travel Insights</h3>
                                <p className="text-blue-100 mt-1">Your personal travel statistics</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Completion Rate */}
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm">Tour Completion Rate</span>
                                    </div>
                                    <span className="text-2xl font-bold">{completionRate}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-emerald-400 to-teal-400 rounded-full"
                                        style={{ width: `${completionRate}%` }}
                                    />
                                </div>
                            </div>

                            {/* Travel Score */}
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Plane className="w-4 h-4 text-sky-400" />
                                        <span className="text-sm">Adventure Score</span>
                                    </div>
                                    <span className="text-2xl font-bold">87/100</span>
                                </div>
                                <div className="text-sm text-white/70">
                                    Based on diversity and frequency of travels
                                </div>
                            </div>

                            {/* Travel Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm">Guides Met</span>
                                    </div>
                                    <div className="text-2xl font-bold">{stats.completedTours || 0}</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm">Avg. Rating Given</span>
                                    </div>
                                    <div className="text-2xl font-bold">4.7/5</div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement Badge */}
                        <div className="mt-6 p-4 bg-linear-to-r from-sky-900/30 to-blue-900/30 rounded-xl border border-sky-700/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-r from-sky-500 to-blue-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Active Explorer</p>
                                    <p className="text-sm text-sky-100">You complete 80% of booked tours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Tours & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Upcoming Tours */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Adventures</h3>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                Next 7 Days
                            </span>
                        </div>
                        <div className="space-y-4">
                            {Array.from({ length: Math.min(3, stats.upcomingTours || 0) }).map((_, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">Mountain Expedition</p>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                <span>Sat, Dec 15</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> 9:00 AM
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">$89</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">2 hrs</p>
                                    </div>
                                </div>
                            ))}
                            {(!stats.upcomingTours || stats.upcomingTours === 0) && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No upcoming tours scheduled</p>
                                    <p className="text-sm mt-1">Book your next adventure!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Explore Tours</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">My Bookings</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                    <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Wishlist</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Reviews</span>
                                </div>
                            </button>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Activity</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span>Booked &quot;Sunset Hike&quot; tour</span>
                                    <span className="text-gray-400">2 days ago</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Added 3 items to wishlist</span>
                                    <span className="text-gray-400">1 week ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristDashboardPage;