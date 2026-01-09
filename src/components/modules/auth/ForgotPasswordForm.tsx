"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const ForgetPasswordForm = () => {
    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("https://local-eyes-server.vercel.app/api/v1/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsSuccess(true);
                toast.success("OTP sent successfully! Check your email.");

                // Redirect to OTP page after 2 seconds
                // setTimeout(() => {
                //     router.push(`/forgot-password/otp?email=${encodeURIComponent(email)}`);
                // }, 2000);
            } else {
                toast.error(data.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Success Message */}
            {isSuccess && (
                <div className="mb-6 p-5 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl animate-in fade-in slide-in-from-top-5 duration-300">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-800 mb-1">OTP Sent Successfully!</h3>
                            <p className="text-emerald-700 text-sm">
                                We&apos;ve sent a password reset OTP to <span className="font-medium">{email}</span>.
                                Redirecting to OTP verification...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
                <p className="text-gray-600">
                    Enter your email address and we&apos;ll send you an OTP to reset your password
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading || isSuccess}
                            className="pl-11 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Enter the email address associated with your account
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending request...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Get reset link
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>

                {/* Tips */}
                <div className="p-4 bg-linear-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">What to expect:</p>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Check your inbox for a 6-digit OTP</li>
                                <li>• OTP is valid for 10 minutes</li>
                                <li>• If you don&apos;t see it, check your spam folder</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Back to Login */}
                <div className="text-center pt-4">
                    <p className="text-gray-600">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ForgetPasswordForm;