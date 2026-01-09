/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface VerificationState {
    success?: boolean;
    message: string;
    errors?: {
        otp?: string[];
    };
    email?: string;
    timestamp?: number;
}

export async function sendVerificationEmail(
    prevState: VerificationState | null,
    formData: FormData
): Promise<VerificationState> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Authentication required. Please log in again."
            };
        }

        // Get user email from token or API
        const userResponse = await serverFetch.get("/auth/me", {
            headers: {
                "Cookie": `accessToken=${accessToken}`
            }
        });

        if (!userResponse.ok) {
            return {
                success: false,
                message: "Failed to fetch user information"
            };
        }

        const userData = await userResponse.json();
        const email = userData.data?.email || userData.email;

        if (!email) {
            return {
                success: false,
                message: "Unable to retrieve email address"
            };
        }

        console.log("Sending verification email to:", email);

        // Send verification request to backend
        const response = await serverFetch.post("/guides/verify/send-otp", {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Failed to send verification code. Please try again.";

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return {
                success: false,
                message: errorMessage
            };
        }

        // Revalidate the verification page to show updated state
        revalidatePath("/my-profile");

        // Redirect to OTP page
        redirect(`/verify/otp?email=${encodeURIComponent(email)}`);

    } catch (error: any) {
        console.error("Error sending verification email:", error);

        if (error.message && error.message.includes("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: "An error occurred while sending the verification code. Please try again later."
        };
    }
}

export async function verifyOTP(
    prevState: VerificationState | null,
    formData: FormData
): Promise<VerificationState> {
    try {
        const otp = formData.get("otp") as string;

        // Validation
        const errors: { otp?: string[] } = {};

        if (!otp) {
            errors.otp = ["OTP is required"];
        } else if (!/^\d{6}$/.test(otp)) {
            errors.otp = ["OTP must be exactly 6 digits"];
        }

        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                message: "Please fix the errors below",
                errors
            };
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const response = await serverFetch.post("/guides/verify/confirm", {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`
            },
            body: JSON.stringify({ otp }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Invalid verification code";

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return {
                success: false,
                message: errorMessage
            };
        }

        // IMPORTANT: Revalidate the profile page to show updated verification status
        revalidatePath("/my-profile");
        revalidatePath("/dashboard"); // Also revalidate dashboard if needed
        revalidatePath("/"); // Revalidate home page if verification badge appears there

        // You can also revalidate specific API routes if needed
        revalidatePath("/api/user/profile");

        // Redirect to success page
        redirect("/verify/success");

    } catch (error: any) {
        console.error("Error verifying OTP:", error);

        if (error.message && error.message.includes("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: "Verification failed. Please try again.",
            email: formData.get("email") as string
        };
    }
}

export async function resendVerificationEmail(
    prevState: VerificationState | null,
    formData: FormData
): Promise<VerificationState> {
    try {
        const email = formData.get("email") as string;

        if (!email) {
            return {
                success: false,
                message: "Email not found"
            };
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const response = await serverFetch.post("/guides/verify/resend-otp", {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Failed to resend verification code";

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return {
                success: false,
                message: errorMessage,
                email
            };
        }

        // Revalidate paths if needed
        revalidatePath("/verify/otp");

        return {
            success: true,
            message: "Verification code resent successfully!",
            email,
            timestamp: Date.now()
        };

    } catch (error: any) {
        console.error("Error resending verification:", error);
        return {
            success: false,
            message: "Failed to resend verification code",
            email: formData.get("email") as string
        };
    }
}

// Additional function to manually revalidate if needed
export async function revalidateProfile() {
    revalidatePath("/my-profile");
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile revalidated" };
}