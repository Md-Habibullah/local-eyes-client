export const dynamic = "force-dynamic";
import Link from "next/link";
import { CheckCircle, Shield, Sparkles, ArrowRight, User } from "lucide-react";

export default function VerificationSuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-background dark:from-emerald-900/10 dark:via-background dark:to-background">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-lg mx-auto">
                    {/* ... existing success content ... */}

                    {/* Action Buttons - Updated */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/my-profile"
                            className="flex-1"
                        // This will trigger a fresh fetch of the profile
                        >
                            <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                                <User className="h-4 w-4" />
                                View Updated Profile
                            </button>
                        </Link>
                        <Link href="/dashboard/guide" className="flex-1">
                            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold rounded-xl hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                                Go to Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Your verification status has been updated. Refresh the page if you don&apos;t see changes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}