// import { serverFetch } from "@/lib/serverFetch";

import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { getBookingById } from "@/services/tourist/getBookingById";
import { AlertCircle, Calendar, Clock, DollarSign, MapPin, User, CheckCircle, XCircle, Clock as ClockIcon, ArrowLeft, Star, FileText, Award, Navigation, Phone, Mail, Globe, CreditCard } from "lucide-react";
import Link from "next/link";

const BookingDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const booking = await getBookingById(id);
    const isReviewAllowed = booking?.status === "COMPLETED";
    const isPaymentAvailable = booking?.status === "CONFIRMED"; // Add payment check

    if (!booking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <EmptyState
                        icon={AlertCircle}
                        title="Failed to load booking"
                        description="We couldn't retrieve the booking details. Please try again later."
                    />
                </div>
            </div>
        );
    }

    if (booking && booking.error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <EmptyState
                        icon={AlertCircle}
                        title={booking.error}
                        description="There was an issue loading this booking. Please check the booking ID and try again."
                    />
                </div>
            </div>
        );
    }

    // Status configuration
    const getStatusConfig = (status: string) => {
        const config = {
            PENDING: {
                bg: "bg-amber-50 dark:bg-amber-900/20",
                text: "text-amber-700 dark:text-amber-400",
                border: "border-amber-200 dark:border-amber-800/30",
                icon: ClockIcon,
                label: "Pending Confirmation",
                description: "Waiting for guide confirmation"
            },
            CONFIRMED: {
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                text: "text-emerald-700 dark:text-emerald-400",
                border: "border-emerald-200 dark:border-emerald-800/30",
                icon: CheckCircle,
                label: "Confirmed",
                description: "Your tour is confirmed and ready"
            },
            COMPLETED: {
                bg: "bg-blue-50 dark:bg-blue-900/20",
                text: "text-blue-700 dark:text-blue-400",
                border: "border-blue-200 dark:border-blue-800/30",
                icon: CheckCircle,
                label: "Completed",
                description: "Tour successfully completed"
            },
            CANCELLED: {
                bg: "bg-red-50 dark:bg-red-900/20",
                text: "text-red-700 dark:text-red-400",
                border: "border-red-200 dark:border-red-800/30",
                icon: XCircle,
                label: "Cancelled",
                description: "This booking has been cancelled"
            }
        };
        return config[status as keyof typeof config] || config.PENDING;
    };

    const statusConfig = getStatusConfig(booking?.status || "PENDING");
    const StatusIcon = statusConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard/tourist/bookings"
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                    Booking Details
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Booking ID: {booking?.id}
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-medium">{statusConfig.label}</span>
                        </div>
                    </div>

                    {/* Booking Overview Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tour Date</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(booking?.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {booking?.time || "09:00 AM"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            ৳ {booking?.totalAmount}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                        <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {booking?.participants || 1} person(s)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <StatusIcon className="w-4 h-4" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {statusConfig.description}
                                    </p>
                                </div>

                                {/* Pay Now Button (Only for confirmed bookings) */}
                                {isPaymentAvailable && (
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2"
                                    >
                                        <Link href={`/dashboard/tourist/bookings/${booking?.id}/payment`}>
                                            <CreditCard className="w-4 h-4" />
                                            Pay Now
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Tour Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tour Information Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tour Information</h2>
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {booking?.tour?.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {booking?.tour?.description || "Explore this amazing tour with our expert guide."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {booking?.tour?.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {booking?.tour?.duration || "3 hours"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {booking?.tour?.highlights && (
                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Tour Highlights</h4>
                                        <ul className="space-y-2">
                                            {booking.tour.highlights.split(',').map((highlight: string, index: number) => (
                                                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    {highlight.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Guide Information Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Guide Information</h2>
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center flex-shrink-0">
                                    <User className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {booking?.guide?.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">Certified Tour Guide</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">4.8</span>
                                            <span className="text-gray-500">/5</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Phone className="w-4 h-4" />
                                            <span>{booking?.guide?.phone || "+1 (234) 567-8900"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span>{booking?.guide?.email || "guide@example.com"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Globe className="w-4 h-4" />
                                            <span>English, Spanish</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Award className="w-4 h-4" />
                                            <span>5 years experience</span>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                                        {booking?.guide?.bio || "Experienced tour guide with extensive knowledge of local history and culture."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions & Summary */}
                    <div className="space-y-6">
                        {/* Review Action Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leave a Review</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Share your experience with the guide
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {isReviewAllowed
                                        ? "Your tour has been completed. Please share your experience to help other travelers."
                                        : "Reviews can only be submitted after the tour is completed."
                                    }
                                </p>

                                <Button
                                    asChild
                                    disabled={!isReviewAllowed}
                                    className={`w-full flex items-center justify-center gap-2 ${!isReviewAllowed
                                        ? "opacity-50 pointer-events-none"
                                        : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                                        }`}
                                >
                                    <Link href={`/dashboard/tourist/bookings/${booking?.id}/review`}>
                                        <Star className="w-4 h-4" />
                                        {isReviewAllowed ? "Write a Review" : "Review Unavailable"}
                                    </Link>
                                </Button>

                                {!isReviewAllowed && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        Available after tour completion
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payment Action Card (Only for confirmed bookings) */}
                        {isPaymentAvailable && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-sm border border-green-200 dark:border-green-800/30 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Payment</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Secure payment to confirm your booking
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-400">Amount Due</span>
                                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                ৳ {booking?.totalAmount}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Payment must be completed before the tour date
                                        </p>
                                    </div>

                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center justify-center gap-2"
                                    >
                                        <Link href={`/dashboard/tourist/bookings/${booking?.id}/payment`}>
                                            <CreditCard className="w-5 h-5" />
                                            Pay Now
                                        </Link>
                                    </Button>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        Secure payment powered by SSL encryption
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Booking Summary Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Tour Price</span>
                                    <span className="font-medium text-gray-900 dark:text-white">৳ {booking?.totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Booking Fee</span>
                                    <span className="font-medium text-gray-900 dark:text-white">৳ 50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                    <span className="font-medium text-gray-900 dark:text-white">৳ 30</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">৳ {booking?.totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1" asChild>
                                        <Link href={`/tours/${booking?.tour?.id}`}>
                                            <FileText className="w-4 h-4 mr-2" />
                                            Tour Details
                                        </Link>
                                    </Button>
                                    {/* <Button variant="outline" className="flex-1" asChild>
                                        <Link href={`/guides/${booking?.guide?.id}`}>
                                            <Navigation className="w-4 h-4 mr-2" />
                                            Guide Profile
                                        </Link>
                                    </Button> */}
                                </div>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-blue-900 to-sky-800 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Need Help?</h4>
                                    <p className="text-sm text-blue-100">Contact our support team</p>
                                </div>
                            </div>
                            <p className="text-sm text-blue-100 mb-4">
                                For any issues or questions regarding your booking, our support team is available 24/7.
                            </p>
                            <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;