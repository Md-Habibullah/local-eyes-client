/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getBookings } from "@/services/bookings/getBookings";
import { AlertCircle, Calendar, User, MapPin, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle, CreditCard, Users, Tag } from "lucide-react";

const AdminBookingsPage = async () => {
    const bookings = await getBookings();

    if (!bookings) {
        return <EmptyState icon={AlertCircle} title="Failed to load bookings." />;
    }

    if (bookings && bookings.error) {
        return <EmptyState icon={AlertCircle} title={bookings.error} />;
    }

    // Calculate stats (no logic changes, just display calculations)
    const totalBookings = bookings.length;
    const paidBookings = bookings.filter((b: any) => b.status === 'paid' || b.isPaid).length;
    const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
    const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;
    const totalRevenue = bookings
        .filter((b: any) => b.status === 'paid' || b.isPaid)
        .reduce((sum: number, b: any) => sum + (b.totalAmount || b.price || 0), 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950/20 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                All Bookings
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and monitor all tour bookings
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">{totalBookings}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Bookings</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Paid Bookings</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {paidBookings}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
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
                                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {cancelledBookings}
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${totalRevenue.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="space-y-4">
                    {bookings.map((b: any) => {
                        // Status styling
                        const statusConfig = {
                            'paid': {
                                bg: 'bg-emerald-100 dark:bg-emerald-900/20',
                                text: 'text-emerald-800 dark:text-emerald-300',
                                icon: <CheckCircle className="w-4 h-4" />
                            },
                            'confirmed': {
                                bg: 'bg-blue-100 dark:bg-blue-900/20',
                                text: 'text-blue-800 dark:text-blue-300',
                                icon: <CheckCircle className="w-4 h-4" />
                            },
                            'pending': {
                                bg: 'bg-amber-100 dark:bg-amber-900/20',
                                text: 'text-amber-800 dark:text-amber-300',
                                icon: <AlertTriangle className="w-4 h-4" />
                            },
                            'cancelled': {
                                bg: 'bg-red-100 dark:bg-red-900/20',
                                text: 'text-red-800 dark:text-red-300',
                                icon: <XCircle className="w-4 h-4" />
                            },
                            'completed': {
                                bg: 'bg-purple-100 dark:bg-purple-900/20',
                                text: 'text-purple-800 dark:text-purple-300',
                                icon: <CheckCircle className="w-4 h-4" />
                            },
                        };

                        const status = b.status?.toLowerCase() || 'pending';
                        const statusStyle = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

                        return (
                            <div
                                key={b.id}
                                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                        {/* Left Section - Tour Info */}
                                        <div className="flex-1">
                                            {/* Tour Title and Status */}
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                                                        {b.tour?.title || 'Unknown Tour'}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Tag className="w-4 h-4" />
                                                        <span className="text-sm">Booking #{b.id.slice(0, 8)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text}`}>
                                                        {statusStyle.icon}
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tour Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {b.tour?.city || 'Unknown'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Booking Date</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {new Date(b.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Tourist</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {b.tourist?.name || 'Unknown'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Group Size</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {b.participants || 1} person{b.participants !== 1 ? 's' : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Info */}
                                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                {b.totalAmount && (
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                                                        <span className="font-bold text-gray-900 dark:text-white">
                                                            ${b.totalAmount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                )}

                                                {b.paymentMethod && (
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Payment:</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {b.paymentMethod}
                                                        </span>
                                                    </div>
                                                )}

                                                {b.tourDate && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">Tour Date:</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {new Date(b.tourDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Section - Quick Actions & More Info */}
                                        <div className="lg:w-48 space-y-4">
                                            {/* Payment Status */}
                                            {b.isPaid !== undefined && (
                                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className={`w-4 h-4 ${b.isPaid ? 'text-emerald-500' : 'text-amber-500'}`} />
                                                        <span className="text-sm font-medium">
                                                            {b.isPaid ? 'Payment Completed' : 'Payment Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Booking ID */}
                                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Booking ID</p>
                                                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
                                                    {b.id}
                                                </p>
                                            </div>

                                            {/* Contact Info */}
                                            {b.tourist?.email && (
                                                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contact Email</p>
                                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                                                        {b.tourist.email}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Bookings Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">There are no bookings in the system yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookingsPage;