/* eslint-disable @typescript-eslint/no-explicit-any */

import PieChartCard from "@/components/charts/PieChartCard";
import EmptyState from "@/components/shared/EmptyState";
import { getGuideStats } from "@/services/guide/getGuideStats";
import {
    AlertCircle,
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Star,
    MapPin,
    Clock,
    Award,
    Trophy,
    BarChart3,
    CheckCircle,
    Clock4,
    Wallet,
    Target,
    Sparkles
} from "lucide-react";

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
        { name: "Confirmed Bookings", value: (stats.totalBookings || 0) - (stats.pending || 0) - (stats.completed || 0) },
    ];

    // Calculate additional metrics
    const completionRate = stats.totalBookings > 0
        ? ((stats.completed || 0) / stats.totalBookings * 100).toFixed(1)
        : '0.0';

    const averageEarnings = stats.completed > 0
        ? (stats.earnings / stats.completed).toFixed(0)
        : '0';

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-950/20 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Guide Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Welcome back! Here&apos;s your performance overview
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-emerald-200 dark:border-emerald-800/30">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-500" />
                                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                        Performance: <span className="text-amber-600 dark:text-amber-400">Excellent</span>
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
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400">+12% from last month</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.pending || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Clock4 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                                Requires your attention
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tours</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stats.completed || 0}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Rate:</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{completionRate}%</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        ${stats.earnings?.toLocaleString() || '0'}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Avg:</span>
                                <span className="font-bold text-purple-600 dark:text-purple-400">${averageEarnings}/tour</span>
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
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tour Status Overview</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Distribution of your bookings</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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
                                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500'];
                                const percentage = stats.totalBookings > 0
                                    ? ((item.value / stats.totalBookings) * 100).toFixed(1)
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

                    {/* Performance Summary */}
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Performance Summary</h3>
                                <p className="text-emerald-100 mt-1">Your guide performance metrics</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Completion Rate */}
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm">Completion Rate</span>
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

                            {/* Average Earnings */}
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Wallet className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm">Average Earnings per Tour</span>
                                    </div>
                                    <span className="text-2xl font-bold">${averageEarnings}</span>
                                </div>
                                <div className="text-sm text-white/70">
                                    Consistent performance indicator
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm">Avg. Response Time</span>
                                    </div>
                                    <div className="text-2xl font-bold">2.4h</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm">Avg. Rating</span>
                                    </div>
                                    <div className="text-2xl font-bold">4.8/5</div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement Badge */}
                        <div className="mt-6 p-4 bg-linear-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-700/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Top Performer</p>
                                    <p className="text-sm text-amber-100">You&apos;re in the top 10% of guides this month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Upcoming Tours */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Tours</h3>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                                This Week
                            </span>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">Mountain Adventure</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow, 9:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">$120</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">2 people</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Schedule Tour</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">View Requests</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Earnings</span>
                                </div>
                            </button>
                            <button className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                    <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Reviews</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideDashboardPage;