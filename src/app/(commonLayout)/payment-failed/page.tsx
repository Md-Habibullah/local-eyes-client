"use client";

import { XCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-900 dark:to-rose-950/20 flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
                    {/* Error Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center">
                        <XCircle className="w-12 h-12 text-white" />
                    </div>

                    {/* Error Message */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Payment Failed
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We couldn&apos;t process your payment. Please try again or contact support if the issue persists.
                    </p>

                    {/* Warning Box */}
                    <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                                Your card has not been charged. Please check your payment details and try again.
                            </p>
                        </div>
                    </div>

                    {/* Possible Issues */}
                    <div className="mb-6 text-left">
                        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Possible reasons:
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Insufficient funds in your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Incorrect card details entered</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Card expiration date has passed</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Temporary network issue</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/dashboard/tourist/bookings"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </Link>
                        <Link
                            href="/contact"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Contact Support
                        </Link>
                    </div>

                    {/* Try Again */}
                    <div className="mt-6">
                        <Link
                            href="/dashboard/tourist/bookings"
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                            Try payment again →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}