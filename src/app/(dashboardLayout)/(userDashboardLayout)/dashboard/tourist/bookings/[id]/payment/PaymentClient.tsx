/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CreditCard,
    Shield,
    Lock,
    CheckCircle,
    AlertCircle,
    Clock,
    DollarSign,
    Calendar,
    Users,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { initiatePayment } from "@/services/payment/payment.action";

type PaymentClientProps = {
    booking: any;
    bookingId: string;
};

export default function PaymentClient({ booking, bookingId }: PaymentClientProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await initiatePayment(bookingId);

            if (result.success && result.data?.paymentUrl) {
                // Redirect to SSLCommerz payment gateway
                window.location.href = result.data.paymentUrl;
            } else {
                setError(result.message || "Failed to initiate payment");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push(`/dashboard/tourist/bookings/${bookingId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Link
                            href={`/dashboard/tourist/bookings/${bookingId}`}
                            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                Complete Payment
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Secure payment for your booking
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                            {/* Payment Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Payment Details
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Complete your payment to confirm the booking
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>

                            {/* Booking Summary */}
                            <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-900 dark:text-white">Booking Summary</h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">#{bookingId.slice(0, 8)}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Tour:</span>
                                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                                            {booking.tour?.title}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {new Date(booking.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {booking.participants} person(s)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Payment Method
                                </h3>
                                <div className="p-4 border-2 border-green-500 rounded-xl bg-green-50 dark:bg-green-900/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    SSLCommerz
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Secure payment gateway
                                                </p>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Security Assurance */}
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                            100% Secure Payment
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Your payment information is encrypted and transmitted securely using SSL technology.
                                            We do not store your credit card details on our servers.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5" />
                                            Proceed to Payment
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Tour Price</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        ৳ {booking.totalAmount}
                                    </span>
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
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            ৳ {booking.totalAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notes */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                    Important Notes
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></div>
                                        <span>Payment must be completed before the tour date</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></div>
                                        <span>Refunds are processed within 7-10 business days</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5"></div>
                                        <span>Contact support for any payment issues</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Payment Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 border border-blue-200 dark:border-blue-800/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Payment Time</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">2-3 minutes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border border-purple-200 dark:border-purple-800/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Security</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">SSL Encrypted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}