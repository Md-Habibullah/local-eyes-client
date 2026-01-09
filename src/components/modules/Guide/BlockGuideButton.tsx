/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Shield, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { blockUser } from "@/services/guide/blockUser";

type BlockGuideButtonProps = {
    userId: string;
    userName: string;
};

export default function BlockGuideButton({
    userId,
    userName,
}: BlockGuideButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleBlock = async () => {
        setLoading(true);
        try {
            const res = await blockUser(userId);
            toast.success(res.message || "Guide blocked successfully");
        } catch (err: any) {
            toast.error(err.message || "Failed to block guide");
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
                bg-linear-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
            >
                <Shield className="w-4 h-4" />
                Block
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h3 className="text-lg font-bold">Block Guide</h3>
                        </div>

                        <p className="text-sm mb-4">
                            Are you sure you want to block{" "}
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
                                onClick={handleBlock}
                                disabled={loading}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Confirm Block
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
