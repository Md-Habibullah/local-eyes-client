"use client";

import { changePassword } from "@/services/auth/auth.service";
import { useState, startTransition, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Loader2, CheckCircle, XCircle, Check, X, Shield } from "lucide-react";

const initialState = {
    success: false,
    message: "",
    formData: { oldPassword: "", newPassword: "", confirmPassword: "" },
    errors: [],
};

export default function ChangePasswordForm() {
    const [state, formAction, isPending] = useActionState(changePassword, initialState);
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password don't match");
            return;
        }

        if (passwordStrength < 50) {
            toast.error("Please use a stronger password");
            return;
        }

        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
    };

    // Toast notifications
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Password changed successfully!");
        } else if (!state?.success && state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    // Password strength calculator
    useEffect(() => {
        const calculateStrength = (password: string) => {
            let strength = 0;
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            setPasswordStrength(strength);
        };

        calculateStrength(newPassword);
    }, [newPassword]);

    const getStrengthColor = () => {
        if (passwordStrength >= 75) return "bg-emerald-500";
        if (passwordStrength >= 50) return "bg-amber-500";
        if (passwordStrength >= 25) return "bg-orange-500";
        return "bg-red-500";
    };

    const getStrengthText = () => {
        if (passwordStrength >= 75) return "Strong";
        if (passwordStrength >= 50) return "Moderate";
        if (passwordStrength >= 25) return "Weak";
        return "Very Weak";
    };

    // Password match checker
    const passwordsMatch = newPassword === confirmPassword;
    const showMatchError = confirmPassword.length > 0 && !passwordsMatch;
    const showMatchSuccess = confirmPassword.length > 0 && passwordsMatch;

    // Password requirements checker
    const requirements = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        special: /[^A-Za-z0-9]/.test(newPassword),
    };

    const allRequirementsMet = Object.values(requirements).every(req => req);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Current Password
                </label>
                <div className="relative">
                    <input
                        type={showOld ? "text" : "password"}
                        name="oldPassword"
                        required
                        placeholder="Enter your current password"
                        className="w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 outline-none transition-all"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    New Password
                </label>
                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        required
                        minLength={6}
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 outline-none transition-all"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                    <div className="space-y-3">
                        {/* Strength Meter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                                <span className={`font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                                    {getStrengthText()}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                    style={{ width: `${passwordStrength}%` }}
                                />
                            </div>
                        </div>

                        {/* Requirements List */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Requirements:</p>
                            <div className="space-y-1.5">
                                <div className={`flex items-center gap-2 text-sm ${requirements.length ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {requirements.length ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" />
                                    )}
                                    <span>At least 8 characters</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${requirements.uppercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {requirements.uppercase ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" />
                                    )}
                                    <span>Contains uppercase letter</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${requirements.number ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {requirements.number ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" />
                                    )}
                                    <span>Contains number</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${requirements.special ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {requirements.special ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" />
                                    )}
                                    <span>Contains special character</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm New Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        required
                        minLength={6}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-gray-800 border ${showMatchError
                            ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                            : showMatchSuccess
                                ? 'border-emerald-500 dark:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-500'
                                : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-600'
                            } rounded-xl focus:ring-2 outline-none transition-all`}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>

                    {/* Match Indicator */}
                    {confirmPassword.length > 0 && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2">
                            {showMatchSuccess ? (
                                <Check className="w-5 h-5 text-emerald-500" />
                            ) : showMatchError ? (
                                <X className="w-5 h-5 text-red-500" />
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Password Match Feedback */}
                {confirmPassword.length > 0 && (
                    <div className={`flex items-center gap-2 text-sm font-medium ${passwordsMatch ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                        {passwordsMatch ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Passwords match</span>
                            </>
                        ) : (
                            <>
                                <X className="w-4 h-4" />
                                <span>Passwords don&apos;t match</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending || !allRequirementsMet || showMatchError}
                className="w-full px-6 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating Password...
                    </>
                ) : (
                    <>
                        <Shield className="w-5 h-5" />
                        Change Password
                    </>
                )}
            </button>

            {/* Validation Summary */}
            <div className="space-y-2">
                {!allRequirementsMet && newPassword && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            Please meet all password requirements to continue.
                        </p>
                    </div>
                )}

                {showMatchError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-700 dark:text-red-300">
                            New password and confirm password must match.
                        </p>
                    </div>
                )}
            </div>

            {/* Success/Error Messages */}
            {state?.success && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-emerald-800 dark:text-emerald-300">Password Updated!</p>
                            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                                Your password has been successfully changed.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!state?.success && state?.message && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <div>
                            <p className="font-medium text-red-800 dark:text-red-300">Unable to Update</p>
                            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                {state.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}