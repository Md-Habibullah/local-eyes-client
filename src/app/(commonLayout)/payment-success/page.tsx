"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Home, Calendar } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const transactionId = searchParams.get("tran_id");

    useEffect(() => {
        // Auto-redirect to bookings page after 5 seconds
        const timer = setTimeout(() => {
            setIsRedirecting(true);
            router.push("/dashboard/tourist/bookings");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950/20 flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Payment Successful! 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your payment has been processed successfully. Your booking is now confirmed.
                    </p>

                    {/* Transaction Details */}
                    {transactionId && (
                        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                Transaction ID
                            </p>
                            <p className="font-mono text-lg font-bold text-gray-900 dark:text-white break-all">
                                {transactionId}
                            </p>
                        </div>
                    )}

                    {/* Loading Indicator */}
                    <div className="mb-6">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 animate-pulse w-3/4"></div>
                        </div>
                        {isRedirecting ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Redirecting to bookings...
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                You will be redirected in 5 seconds
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/dashboard/tourist/bookings"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Calendar className="w-5 h-5" />
                            View Bookings
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/tours"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Browse More Tours
                        </Link>
                    </div>

                    {/* Support Message */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Need help?{" "}
                            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}