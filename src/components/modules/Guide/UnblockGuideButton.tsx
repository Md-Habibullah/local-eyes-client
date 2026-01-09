/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ShieldOff, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { unblockUser } from "@/services/guide/blockUser";

type UnblockGuideButtonProps = {
    userId: string;
    userName: string;
};

export default function UnblockGuideButton({
    userId,
    userName,
}: UnblockGuideButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleUnblock = async () => {
        setLoading(true);
        try {
            const res = await unblockUser(userId);
            toast.success(res.message || "Guide unblocked successfully");
        } catch (err: any) {
            toast.error(err.message || "Failed to unblock guide");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
                <ShieldOff className="w-4 h-4" />
                Unblock
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <h3 className="text-lg font-bold">Unblock</h3>
                        </div>

                        <p className="text-sm mb-4">
                            Restore access for{" "}
                            <span className="font-semibold">{userName}</span>?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="flex-1 border rounded-lg px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUnblock}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Confirm Unblock
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
