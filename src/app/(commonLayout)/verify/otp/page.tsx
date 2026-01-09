
import VerifyOTPForm from "@/components/modules/auth/VerifyOTPForm";
import { Shield, Mail, Clock } from "lucide-react";
import Link from "next/link";

export default async function OTPVerificationPage({ searchParams }: { searchParams: Promise<{ email: string }> }) {
    const { email } = await searchParams;
    console.log(email)

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Invalid Request</h2>
                    <p className="text-muted-foreground">
                        Please start the verification process from the beginning.
                    </p>
                    <Link
                        href="/my-profile/verify-otp"
                        className="inline-block mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    const maskedEmail = email.replace(/(.{2})(.*)(?=@)/, (match, first, middle) => {
        return first + '*'.repeat(middle.length);
    });

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
                            Enter Verification Code
                        </h1>
                        <p className="text-muted-foreground">
                            We&apos;ve sent a 6-digit code to your email
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                        {/* Email Info */}
                        <div className="mb-8 p-4 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">Code sent to</p>
                                    <p className="font-medium truncate">{maskedEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timer Warning */}
                        <div className="mb-6 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                                        Code expires in 10 minutes
                                    </p>
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                        Enter the code before it expires
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* OTP Form */}
                        <VerifyOTPForm email={email} />

                        {/* Divider */}
                        <div className="my-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-card text-muted-foreground">
                                        Didn&apos;t receive the code?
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Back Link */}
                        <div className="text-center">
                            <Link
                                href="/verify"
                                className="text-primary hover:underline font-medium text-sm"
                            >
                                ← go back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}