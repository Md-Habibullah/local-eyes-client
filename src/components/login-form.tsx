/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Eye, EyeOff, Lock, Mail, Mountain, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(loginUser, null);

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

    const handleGoogleLogin = () => {
        window.location.href = `https://local-eyes-server.vercel.app/api/v1/auth/google`;
    };

    return (
        <div className="w-full">
            <form action={formAction} className="space-y-6">
                {redirect && <input type="hidden" name="redirect" value={redirect} />}

                {/* Welcome Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
                </div>

                <FieldGroup>
                    <div className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <FieldLabel htmlFor="email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className={`pl-10 h-12 rounded-xl ${getFieldError("email") ? "border-red-500" : ""}`}
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            {getFieldError("email") && (
                                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                                    {getFieldError("email")}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <FieldLabel htmlFor="password" className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`pl-10 pr-10 h-12 rounded-xl ${getFieldError("password") ? "border-red-500" : ""}`}
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {getFieldError("password") && (
                                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                                    {getFieldError("password")}
                                </p>
                            )}
                        </div>
                    </div>
                </FieldGroup>

                {/* Forgot Password */}
                <div className="flex justify-end">
                    <Link
                        href="/forget-password"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                {/* <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div> */}

                {/* Google Login */}
                {/* <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full h-12 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.1 0 5.3 1.2 6.9 2.2l5.1-5.1C33.1 4.2 28.9 2.5 24 2.5 14.7 2.5 6.8 9.1 4.2 17.8l6 4.7C11.8 13.4 17.4 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.8c-.6 3-2.3 5.5-4.9 7.2l7.7 6c4.5-4.2 7.1-10.4 7.1-17.7z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.5 28.5c-1-3-1-6.2 0-9.2l-6-4.7C2.7 18.5 2 21.2 2 24s.7 5.5 2 9.2l6-4.7z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 46.5c5.2 0 9.5-1.7 12.7-4.6l-7.7-6c-2.2 1.5-5 2.4-8 2.4-6.1 0-11.2-4-13-9.5l-6 4.7c2.6 8.6 10.5 15.2 19 15.2z"
                        />
                    </svg>
                    Continue with Google
                </Button> */}

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
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