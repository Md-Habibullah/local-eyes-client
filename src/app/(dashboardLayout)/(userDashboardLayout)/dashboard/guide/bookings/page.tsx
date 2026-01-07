/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getBookingsForGuide } from "@/services/guide/getBookingsForGuide";
import {
    AlertCircle,
    Calendar,
    User,
    Users,
    DollarSign,
    MapPin,
    TrendingUp,
    Clock,
    Filter,
    Search,
    BarChart3,
    CheckCircle,
    Sparkles,
    ChevronRight,
    Eye,
    MessageCircle,
    Phone,
    Mail
} from "lucide-react";
import BookingActionButtons from "@/components/modules/Guide/BookingActionButtons";
import StatusBadge from "@/components/shared/stats/StatusBadge";

const GuideBookingsPage = async () => {
    const bookings = await getBookingsForGuide();

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Bookings Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Your booking requests will appear here once tourists start booking your tours.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all hover:shadow-lg">
                        Promote Your Tours
                    </button>
                </div>
            </div>
        );
    }

    // Calculate stats
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);
    const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
    const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed' || b.status === 'paid').length;
    const averageGroupSize = bookings.length > 0
        ? (bookings.reduce((sum: number, b: any) => sum + (b.numberOfPeople || 1), 0) / bookings.length).toFixed(1)
        : '0.0';

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Tour Bookings
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage your tour bookings and client requests
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-amber-600 dark:text-amber-400">{totalBookings}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Bookings</span>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium">
                                <span className="font-bold">${totalRevenue.toLocaleString()}</span>
                                <span className="ml-2 text-amber-100">Revenue</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {pendingBookings}
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {confirmedBookings}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Group Size</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {averageGroupSize}
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {totalBookings > 0 ? ((confirmedBookings / totalBookings) * 100).toFixed(0) : '0'}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="search"
                                        placeholder="Search bookings by tourist name or tour title..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                                <button className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all">
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map((booking: any) => (
                        <div
                            key={booking.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                                    {booking.tour?.title || 'Tour Booking'}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Booking #{booking.id?.slice(0, 8)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <StatusBadge status={booking.status} />
                                </div>

                                {/* Tourist & Tour Info */}
                                <div className="space-y-4 mb-6">
                                    {/* Tourist Info */}
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">{booking.tourist?.name || 'Guest'}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Tourist</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                                    <MessageCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                                    <Phone className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {booking.tourist?.email && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Mail className="w-4 h-4" />
                                                <span className="truncate">{booking.tourist.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tour Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Tour Date</span>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Group Size</span>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {booking.numberOfPeople || 1} person{booking.numberOfPeople !== 1 ? 's' : ''}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Location</span>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white truncate">
                                                {booking.tour?.city || 'Multiple'}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                            <div className="flex items-center gap-2 mb-1">
                                                <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Total</span>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                ${booking.totalAmount?.toLocaleString() || '0'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row items-center gap-3">
                                        <div className="flex-1">
                                            <BookingActionButtons
                                                bookingId={booking.id}
                                                status={booking.status}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                                                <MessageCircle className="w-4 h-4" />
                                            </button>
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Summary */}
                {bookings.length > 0 && (
                    <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Booking Performance</h3>
                                <p className="text-amber-100 mt-1">Your booking conversion insights</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl font-bold text-amber-400 mb-1">
                                    {totalBookings}
                                </div>
                                <div className="text-sm text-gray-300">Total Bookings</div>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">
                                    {totalBookings > 0 ? ((confirmedBookings / totalBookings) * 100).toFixed(0) : '0'}%
                                </div>
                                <div className="text-sm text-gray-300">Conversion Rate</div>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                    ${totalRevenue.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-300">Total Revenue</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuideBookingsPage;