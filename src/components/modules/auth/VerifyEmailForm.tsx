/* eslint-disable react/no-unescaped-entities */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { sendVerificationEmail } from "@/services/auth/verification.actions";

const initialState = {
    message: "",
    errors: undefined,
    success: undefined,
    email: "",
    timestamp: undefined,
};

export default function VerifyEmailForm() {
    const [state, formAction, isPending] = useActionState(sendVerificationEmail, initialState);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state?.success === true) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            {/* Email Info */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">We'll send verification code to</p>
                        <p className="font-medium text-primary">Your registered email address</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            The email associated with your account will be used
                        </p>
                    </div>
                </div>
            </div>

            {/* State Messages */}
            {state?.message && state?.success === false && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive text-center flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {state.message}
                    </p>
                </div>
            )}

            {showSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Verification code sent successfully!
                    </p>
                </div>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 text-base font-semibold"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Verification Code...
                    </>
                ) : (
                    "Send Verification Code"
                )}
            </Button>

            <p className="text-xs text-center text-muted-foreground px-4">
                By verifying your email, you agree to our Terms of Service and Privacy Policy.
                We'll send a 6-digit verification code to your registered email address.
            </p>
        </form>
    );
}