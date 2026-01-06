"use client";

import { changePassword } from "@/services/auth/auth.service";
import { useState, startTransition, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";

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
    const [showConfirm, setShowConfirm] = useState(false); // ✅ For confirm password

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
    };

    // Toast notifications
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Password changed!");
        } else if (!state?.success && state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Current Password</label>
                <div className="relative">
                    <input
                        type={showOld ? "text" : "password"}
                        name="oldPassword"
                        required
                        className="w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    >
                        {showOld ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        required
                        minLength={6}
                        className="w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    >
                        {showNew ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* Confirm Password ✅ */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Confirm New Password</label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        required
                        minLength={6}
                        className="w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    >
                        {showConfirm ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
            >
                {isPending ? "Updating..." : "Change Password"}
            </button>
        </form>
    );
}
