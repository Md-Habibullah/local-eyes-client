
import VerifyEmailForm from "@/components/modules/auth/VerifyEmailForm";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Shield, CheckCircle, Mail, Lock } from "lucide-react";


export default async function VerifyOTPPage() {
    // Get user email from server
    const user = await getUserInfo();
    const userEmail = user?.email || "";

    const maskedEmail = userEmail ? userEmail.replace(/(.{2})(.*)(?=@)/, (match, first, middle) => {
        return first + '*'.repeat(middle.length);
    }) : "";

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary/10 to-primary/20 mb-6">
                            <Shield className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-3">
                            Verify Your Account
                        </h1>
                        <p className="text-muted-foreground">
                            Get verified to unlock all features and build trust with travelers
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                        {/* Benefits */}
                        <div className="mb-8 space-y-4">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                                Benefits of Verification
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Increase booking rates by up to 60%
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Priority placement in search results
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Access to premium features and analytics
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-card text-muted-foreground">
                                    Start Verification
                                </span>
                            </div>
                        </div>

                        {/* Email Display */}
                        {userEmail && (
                            <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Verification code will be sent to</p>
                                        <p className="font-medium truncate">{maskedEmail}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Make sure you have access to this email
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Verification Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Step 1: Request Code</h4>
                                        <p className="text-sm text-muted-foreground">Send verification to your email</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>

                            <div className="flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-muted-foreground">Step 2: Enter OTP</h4>
                                        <p className="text-sm text-muted-foreground">Verify with 6-digit code</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-muted" />
                            </div>
                        </div>

                        {/* Email Form */}
                        <VerifyEmailForm />
                    </div>

                    {/* Support Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Need help with verification?{" "}
                            <a
                                href="/help/verification"
                                className="text-primary hover:underline font-medium"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}