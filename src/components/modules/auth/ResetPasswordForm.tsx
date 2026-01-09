"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, CheckCircle, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [formData, setFormData] = useState({
        email: email || "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
    const [tokenExpired, setTokenExpired] = useState(false);

    // Validate token on mount
    useEffect(() => {
        if (!token || !email) {
            setTokenExpired(true);
            toast.error("Invalid or expired reset link");
            return;
        }

        // Check if token looks valid (basic check)
        if (token && email) {
            setIsTokenValid(true);
        }
    }, [token, email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 8) errors.push("Password must be at least 8 characters");
        if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
        if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
        if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
        if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character");
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            passwordErrors.forEach(error => toast.error(error));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("https://local-eyes-server.vercel.app/api/v1/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsSuccess(true);
                toast.success("Password reset successfully!");

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                if (response.status === 403) {
                    setTokenExpired(true);
                    toast.error("Reset link has expired. Please request a new one.");
                } else {
                    toast.error(data.message || "Failed to reset password. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // If token is expired/invalid
    if (tokenExpired) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
                <p className="text-gray-600 mb-6">
                    This password reset link has expired or is invalid.
                </p>
                <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-sky-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                >
                    Request New Reset Link
                </Link>
            </div>
        );
    }

    // If token is still validating
    if (isTokenValid === null) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <p className="text-gray-600">Validating reset link...</p>
            </div>
        );
    }

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
                            <h3 className="font-semibold text-emerald-800 mb-1">Password Reset Successful!</h3>
                            <p className="text-emerald-700 text-sm">
                                Your password has been updated successfully. Redirecting to login...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
                <p className="text-gray-600">
                    Enter your new password below
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Display (read-only) */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 font-medium">{formData.email}</p>
                    </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading || isSuccess}
                            className="pl-11 pr-10 h-12 rounded-xl"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isLoading || isSuccess}
                            className="pl-11 pr-10 h-12 rounded-xl"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-linear-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100">
                    <p className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                        <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-emerald-600' : ''}`}>
                            {formData.password.length >= 8 ? '✓' : '○'} At least 8 characters
                        </li>
                        <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                            {/[A-Z]/.test(formData.password) ? '✓' : '○'} One uppercase letter
                        </li>
                        <li className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                            {/[a-z]/.test(formData.password) ? '✓' : '○'} One lowercase letter
                        </li>
                        <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                            {/[0-9]/.test(formData.password) ? '✓' : '○'} One number
                        </li>
                        <li className={`flex items-center gap-2 ${/[!@#$%^&*]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                            {/[!@#$%^&*]/.test(formData.password) ? '✓' : '○'} One special character
                        </li>
                    </ul>
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
                            Resetting Password...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Reset Password
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>

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

export default ResetPasswordForm;