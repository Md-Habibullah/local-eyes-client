import { getGuideEarnings } from "@/services/admin/getGuidesEarnings";
import Image from "next/image";
import { DollarSign, TrendingUp, CheckCircle, User, Calendar, Wallet, Star, Award, CreditCard, BarChart3 } from "lucide-react";

export default async function AdminGuideEarningsPage() {
    const guides = await getGuideEarnings();

    if (guides.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-amber-950/20 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Wallet className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Pending Earnings</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        No unpaid earnings found for verified guides at the moment.
                    </p>
                </div>
            </div>
        );
    }

    // Calculate stats (no logic changes, just display calculations)
    const totalEarnings = guides.reduce((sum, g) => sum + g.totalUnpaidEarning, 0);
    const totalCompletedBookings = guides.reduce((sum, g) => sum + g.totalCompletedBookings, 0);
    const averageDailyRate = guides.length > 0
        ? guides.reduce((sum, g) => sum + g.dailyRate, 0) / guides.length
        : 0;
    const topEarningGuide = guides.length > 0
        ? guides.reduce((max, g) => g.totalUnpaidEarning > max.totalUnpaidEarning ? g : max, guides[0])
        : null;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-amber-950/20 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Guide Earnings
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Track and manage guide earnings and payments
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-amber-600 dark:text-amber-400">{guides.length}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Active Guides</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Pending</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${totalEarnings.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Bookings</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {totalCompletedBookings}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Daily Rate</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${averageDailyRate.toFixed(0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Earner</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                        {topEarningGuide ? `$${topEarningGuide.totalUnpaidEarning}` : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earnings Table */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <BarChart3 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Guide Earnings Summary</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Total unpaid earnings: <span className="font-bold text-amber-600 dark:text-amber-400">${totalEarnings.toLocaleString()}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {guides.length} guide{guides.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                                    <th className="p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Guide</span>
                                        </div>
                                    </th>
                                    <th className="p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Rate</span>
                                        </div>
                                    </th>
                                    <th className="p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <Wallet className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Earnings</span>
                                        </div>
                                    </th>
                                    <th className="p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed Bookings</span>
                                        </div>
                                    </th>
                                    <th className="p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {guides.map((g, index) => {
                                    // Calculate earning percentage based on daily rate
                                    const earningPercentage = g.dailyRate > 0
                                        ? (g.totalUnpaidEarning / (g.dailyRate * g.totalCompletedBookings || 1)) * 100
                                        : 0;

                                    return (
                                        <tr
                                            key={g.guideId}
                                            className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                                        >
                                            {/* Guide Column */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-100 dark:border-amber-900/30">
                                                            {g.profilePhoto ? (
                                                                <Image
                                                                    src={g.profilePhoto}
                                                                    alt={g.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 flex items-center justify-center">
                                                                    <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {g.totalCompletedBookings > 10 && (
                                                            <div className="absolute -top-1 -right-1">
                                                                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                                                    <Star className="w-3 h-3 text-white" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{g.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {g.guideId.slice(0, 8)}...</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Daily Rate Column */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                        <span className="font-bold text-blue-700 dark:text-blue-300">
                                                            ${g.dailyRate}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
                                                </div>
                                            </td>

                                            {/* Pending Earnings Column */}
                                            <td className="p-4">
                                                <div>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                        ${g.totalUnpaidEarning.toLocaleString()}
                                                    </p>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="bg-linear-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                                                            style={{ width: `${Math.min(earningPercentage, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Completed Bookings Column */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{g.totalCompletedBookings}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">bookings</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status Column */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${g.totalUnpaidEarning > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                        {g.totalUnpaidEarning > 0 ? (
                                                            <div className="flex items-center gap-1">
                                                                <CreditCard className="w-3 h-3" />
                                                                <span>Payment Due</span>
                                                            </div>
                                                        ) : 'All Paid'}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{guides.length}</span> guide{guides.length !== 1 ? 's' : ''} with pending earnings
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Total Payable:</span>
                                    <span className="ml-2 font-bold text-lg text-amber-600 dark:text-amber-400">
                                        ${totalEarnings.toLocaleString()}
                                    </span>
                                </div>
                                <button className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all hover:shadow-lg">
                                    Process Payments
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}