/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Shield, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";

const LoginForm = ({ redirect, onFillCredentials }: { redirect?: string; onFillCredentials?: (email: string, password: string) => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(loginUser, null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error?.message;
        }
        return null;
    };

    useEffect(() => {
        if (state && !state.success && state.message) toast.error(state.message);
    }, [state]);

    const handleDemoLogin = (email: string, password: string) => {
        if (emailRef.current) {
            emailRef.current.value = email;
            emailRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (passwordRef.current) {
            passwordRef.current.value = password;
            passwordRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
        emailRef.current?.focus();
    };

    const handleGoogleLogin = () => {
        window.location.href = "https://local-eyes-server.vercel.app/api/v1/auth/google";
    };

    return (
        <div className="w-full">
            <form action={formAction} className="space-y-6">
                {redirect && <input type="hidden" name="redirect" value={redirect} />}

                <div className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </label>
                        <div className="relative">
                            <Input
                                ref={emailRef}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className={`pl-10 h-12 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500 ${getFieldError("email")
                                    ? "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
                                    : "dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                                    }`}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        {getFieldError("email") && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                                {getFieldError("email")}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Lock className="w-4 h-4" />
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`pl-10 pr-10 h-12 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500 ${getFieldError("password")
                                    ? "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
                                    : "dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                                    }`}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {getFieldError("password") && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                                {getFieldError("password")}
                            </p>
                        )}
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                    <Link
                        href="/forget-password"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 dark:from-blue-500 dark:to-sky-600 dark:hover:from-blue-600 dark:hover:to-sky-700 text-white font-semibold transition-all duration-200"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Sign In
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Google Login Button */}
                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full h-12 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium transition-all duration-200 flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </Button>

                {/* Demo Login Section - Simple and Clean */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                        Quick login for testing:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("super@gmail.com", "123456")}
                            className="px-4 py-2 text-sm bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" />
                            Admin
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDemoLogin("tourist@gmail.com", "123456")}
                            className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <User className="w-4 h-4" />
                            Tourist
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDemoLogin("habibullah15160@gmail.com", "123456")}
                            className="px-4 py-2 text-sm bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <MapPin className="w-4 h-4" />
                            Guide
                        </button>
                    </div>
                    <p className="text-xs text-red-400 dark:text-red-400 text-center mt-2">
                        Do not misuse these credentials.
                    </p>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;