/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from "@/components/shared/EmptyState";
import { serverFetch } from "@/lib/server-fetch";
import { getBookings } from "@/services/tourist/getBookings";
import { AlertCircle, Calendar, MapPin, Clock, ArrowRight, XCircle, CheckCircle, Clock as ClockIcon, DollarSign, Users, ChevronLeft, ChevronRight, ExternalLink, Compass } from "lucide-react";
import Link from "next/link";

export default async function TouristBookingsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Number(searchParams.page || 1);
    const result = await getBookings(page);

    if (!result) {
        return (
            <EmptyState
                icon={AlertCircle}
                title="Failed to load bookings."
                description="We couldn't retrieve your bookings at the moment. Please try again later."
            />
        );
    }

    if (result && result.error) {
        return (
            <EmptyState
                icon={AlertCircle}
                title={result.error}
                description="There was an issue loading your bookings. Please refresh the page."
            />
        );
    }

    // Status colors and icons mapping
    const getStatusConfig = (status: string) => {
        const config = {
            PENDING: {
                bg: "bg-amber-50 dark:bg-amber-900/20",
                text: "text-amber-700 dark:text-amber-400",
                border: "border-amber-200 dark:border-amber-800/30",
                icon: ClockIcon,
                label: "Pending Confirmation"
            },
            CONFIRMED: {
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                text: "text-emerald-700 dark:text-emerald-400",
                border: "border-emerald-200 dark:border-emerald-800/30",
                icon: CheckCircle,
                label: "Confirmed"
            },
            COMPLETED: {
                bg: "bg-blue-50 dark:bg-blue-900/20",
                text: "text-blue-700 dark:text-blue-400",
                border: "border-blue-200 dark:border-blue-800/30",
                icon: CheckCircle,
                label: "Completed"
            },
            CANCELLED: {
                bg: "bg-red-50 dark:bg-red-900/20",
                text: "text-red-700 dark:text-red-400",
                border: "border-red-200 dark:border-red-800/30",
                icon: XCircle,
                label: "Cancelled"
            }
        };
        return config[status as keyof typeof config] || config.PENDING;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                My Bookings
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and track all your tour bookings in one place
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-blue-200 dark:border-blue-800/30">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium text-blue-600 dark:text-blue-400">
                                        Total: <span className="text-amber-600 dark:text-amber-400">{result.meta.total}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {result.data.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            No Bookings Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            You haven&apos;t booked any tours yet. Start exploring amazing experiences!
                        </p>
                        <Link
                            href="/tours"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                        >
                            <Compass className="w-4 h-4" />
                            Explore Tours
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Bookings Grid */}
                <div className="space-y-4">
                    {result.data.map((booking: any) => {
                        const StatusIcon = getStatusConfig(booking.status).icon;
                        const statusConfig = getStatusConfig(booking.status);

                        return (
                            <div
                                key={booking.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Left Section - Tour Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                            {/* Tour Image Placeholder */}
                                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                                            {booking.tour.title}
                                                        </h3>
                                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {booking.tour.location}
                                                            </span>
                                                            <span className="hidden sm:inline">•</span>
                                                            <span className="flex items-center gap-1">
                                                                <Users className="w-4 h-4" />
                                                                {booking.participants || 1} person(s)
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} w-fit`}>
                                                        <StatusIcon className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{statusConfig.label}</span>
                                                    </div>
                                                </div>

                                                {/* Date and Time */}
                                                <div className="flex flex-wrap items-center gap-4 mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Tour Date</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {new Date(booking.date).toLocaleDateString('en-US', {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                                                            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Time Slot</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {booking.time || "09:00 AM"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section - Actions & Price */}
                                    <div className="lg:text-right flex flex-col gap-4">
                                        {/* Price */}
                                        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3">
                                            <div className="text-left lg:text-right">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    ৳ {booking.totalAmount}
                                                </p>
                                            </div>

                                            {/* Price Details */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <DollarSign className="w-4 h-4" />
                                                <span>Paid in full</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                                            <Link
                                                href={`/dashboard/tourist/bookings/${booking.id}`}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity text-sm"
                                            >
                                                View Details
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>

                                            {booking.status === "PENDING" && (
                                                <form
                                                    action={async () => {
                                                        "use server";
                                                        await serverFetch.patch(
                                                            `/bookings/${booking.id}/cancel`
                                                        );
                                                    }}
                                                    className="flex-1"
                                                >
                                                    <button
                                                        type="submit"
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 text-red-700 dark:text-red-400 font-medium rounded-full border border-red-200 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Cancel Booking
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination - Enhanced */}
                {result.meta.total > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">
                                    {((page - 1) * result.meta.limit) + 1}
                                </span> to <span className="font-semibold text-gray-900 dark:text-white">
                                    {Math.min(page * result.meta.limit, result.meta.total)}
                                </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                    {result.meta.total}
                                </span> bookings
                            </div>

                            <div className="flex items-center gap-2">
                                {page > 1 && (
                                    <Link
                                        href={`?page=${page - 1}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Link>
                                )}

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.ceil(result.meta.total / result.meta.limit) }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === page || p === page - 1 || p === page + 1 || p === Math.ceil(result.meta.total / result.meta.limit))
                                        .map((p, index, array) => (
                                            <div key={p} className="flex items-center">
                                                {index > 0 && array[index - 1] !== p - 1 && (
                                                    <span className="px-2 text-gray-400">...</span>
                                                )}
                                                <Link
                                                    href={`?page=${p}`}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                                                        ${p === page
                                                            ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white'
                                                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {p}
                                                </Link>
                                            </div>
                                        ))}
                                </div>

                                {page * result.meta.limit < result.meta.total && (
                                    <Link
                                        href={`?page=${page + 1}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}