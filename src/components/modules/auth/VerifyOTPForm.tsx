"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { resendVerificationEmail, verifyOTP } from "@/services/auth/verification.actions";
import { useRouter } from "next/navigation";

interface VerifyOTPFormProps {
    email: string;
}

export default function VerifyOTPForm({ email }: VerifyOTPFormProps) {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isExpired, setIsExpired] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [verifyError, setVerifyError] = useState<string | null>(null);
    const [resendMessage, setResendMessage] = useState<string | null>(null);
    const [resendSuccess, setResendSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setVerifyError(null);

        // Auto-focus next input
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Submit on Enter when last input is filled
        if (e.key === "Enter" && index === 5 && otp[5]) {
            e.preventDefault();
            if (!isSubmitting && fullOtp.length === 6 && !isExpired) {
                handleSubmit();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join('');
        console.log("Submitting OTP:", otpValue);

        if (otpValue.length !== 6) {
            setVerifyError("Please enter a 6-digit code");
            return;
        }

        setIsSubmitting(true);
        setVerifyError(null);

        try {
            const formData = new FormData();
            formData.append("otp", otpValue);
            // Note: No email in formData since backend only needs otp

            console.log("Calling verifyOTP with OTP:", otpValue);
            const result = await verifyOTP(null, formData);

            console.log("verifyOTP result:", result);

            if (result.success) {
                // Success - redirect or show success message
                router.push("/verify/success");
            } else {
                setVerifyError(result.message || "Verification failed");
            }
        } catch (error) {
            console.error("Verification error:", error);
            setVerifyError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (isResending || timeLeft > 0) return;

        setIsResending(true);
        setResendMessage(null);
        setResendSuccess(false);

        try {
            const formData = new FormData();
            formData.append("email", email);

            const result = await resendVerificationEmail(null, formData);

            if (result.success) {
                setResendSuccess(true);
                setResendMessage(result.message);
                setOtp(["", "", "", "", "", ""]);
                setTimeLeft(600);
                setIsExpired(false);
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            } else {
                setResendSuccess(false);
                setResendMessage(result.message);
            }
        } catch (error) {
            console.error("Resend error:", error);
            setResendSuccess(false);
            setResendMessage("Failed to resend code");
        } finally {
            setIsResending(false);
        }
    };

    const fullOtp = otp.join('');
    const isButtonEnabled = fullOtp.length === 6 && !isSubmitting && !isExpired;

    return (
        <div className="space-y-6">
            {/* OTP Inputs */}
            <div className="space-y-4">
                <label className="text-sm font-medium block">Enter 6-digit verification code</label>
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            disabled={isSubmitting || isExpired}
                            className="h-14 w-14 text-center text-2xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            aria-label={`Digit ${index + 1} of verification code`}
                        />
                    ))}
                </div>

                {/* Timer */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Code expires in{" "}
                        <span className={`font-semibold ${timeLeft < 60 ? "text-red-500" : "text-foreground"}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </p>
                </div>
            </div>

            {/* Verification Error */}
            {verifyError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive text-center flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {verifyError}
                    </p>
                </div>
            )}

            {/* Resend Messages */}
            {resendMessage && (
                <div className={`p-3 rounded-lg border ${resendSuccess
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                    : "bg-destructive/10 border-destructive/20"
                    }`}>
                    <p className={`text-sm text-center flex items-center justify-center gap-2 ${resendSuccess
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-destructive"
                        }`}>
                        {resendSuccess ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        {resendMessage}
                    </p>
                </div>
            )}

            {/* Submit Button - SIMPLE VERSION */}
            <Button
                type="button" // Changed from "submit" to "button"
                onClick={handleSubmit}
                disabled={!isButtonEnabled}
                className={`
                    w-full h-11 text-base font-semibold
                    ${!isButtonEnabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:opacity-90'
                    }
                `}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    "Verify Account"
                )}
            </Button>

            {/* Resend Button */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending || timeLeft > 0}
                    className="text-primary hover:underline font-medium disabled:text-muted-foreground disabled:cursor-not-allowed text-sm"
                >
                    {isResending ? (
                        <>
                            <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                            Resending...
                        </>
                    ) : timeLeft > 0 ? (
                        `Resend code in ${formatTime(timeLeft)}`
                    ) : (
                        "Resend verification code"
                    )}
                </button>
            </div>
        </div>
    );
}