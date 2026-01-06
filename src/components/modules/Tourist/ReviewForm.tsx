"use client";

// app/review/[id]/ReviewForm.tsx
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/tourist/createReview";

// Form validation state type
interface FormState {
    success?: boolean;
    message?: string;
    errors?: {
        rating?: string[];
        comment?: string[];
    };
}

// Main form component props
interface ReviewFormProps {
    bookingId: string;
    booking: { tour: { title: string } }
}

const ReviewForm = ({ bookingId, booking }: ReviewFormProps) => {
    const router = useRouter();

    // Initial form state
    const initialState: FormState = {
        success: false,
        message: "",
        errors: {}
    };

    // Use useActionState for form submission
    const [formState, formAction, isPending] = useActionState<FormState, FormData>(
        async (prevState: FormState, formData: FormData) => {
            try {
                const result = await createReview(prevState, formData);
                return result;
            } catch (error) {
                console.error("Form submission error:", error);
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "An unexpected error occurred",
                    errors: {}
                };
            }
        },
        initialState // Provide initial state
    );

    // Handle success state with useEffect
    useEffect(() => {
        if (formState?.success) {
            // Show success message for 3 seconds then redirect
            const timer = setTimeout(() => {
                router.push("/dashboard/tourist");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [formState?.success, router]);

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                {/* Success Message */}
                {formState?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-5 duration-300">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-green-700 font-medium">
                                {formState?.message || "Review submitted successfully!"}
                            </p>
                        </div>
                        <p className="text-green-600 text-sm mt-1">
                            Redirecting to dashboard in 3 seconds...
                        </p>
                    </div>
                )}

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        Leave a Review
                    </h1>
                    <p className="text-gray-600">
                        Share your experience with this booking
                    </p>
                </div>

                <form
                    action={formAction}
                    className="space-y-6"
                    key={formState?.success ? "reset" : "form"} // Reset form on success
                >
                    {/* Hidden booking ID field */}
                    <input
                        type="hidden"
                        name="bookingId"
                        value={bookingId}
                        readOnly
                    />

                    {/* Booking ID Display */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Tour title</p>
                        <p className="font-mono font-medium text-gray-800">{booking?.tour?.title}</p>
                    </div>

                    {/* Rating Field */}
                    <div className="space-y-2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating *
                        </label>
                        <div className="relative">
                            <select
                                id="rating"
                                name="rating"
                                required
                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none ${formState?.errors?.rating ? "border-red-500" : "border-gray-300"
                                    }`}
                                defaultValue=""
                            >
                                <option value="">Select a rating</option>
                                {[1, 2, 3, 4, 5].map(r => (
                                    <option key={r} value={r}>
                                        {r} {r === 1 ? "★ Poor" : r === 5 ? "★ Excellent" : "★".repeat(r)}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        {formState?.errors?.rating && (
                            <p className="text-red-500 text-sm mt-1">{formState.errors.rating[0]}</p>
                        )}
                    </div>

                    {/* Comment Field */}
                    <div className="space-y-2">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Your Experience *
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            placeholder="Share your detailed experience with this booking..."
                            required
                            rows={5}
                            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none ${formState?.errors?.comment ? "border-red-500" : "border-gray-300"
                                }`}
                            defaultValue=""
                        />
                        <div className="flex justify-between items-center">
                            <div>
                                {formState?.errors?.comment && (
                                    <p className="text-red-500 text-sm">{formState.errors.comment[0]}</p>
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                                Minimum 10 characters
                            </span>
                        </div>
                    </div>

                    {/* Error Message (Non-field specific errors) */}
                    {formState?.message && !formState?.success && !formState?.errors?.rating && !formState?.errors?.comment && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-5 duration-300">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <p className="text-red-700 font-medium">Something went wrong</p>
                                    <p className="text-red-600 text-sm mt-1">{formState.message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${isPending ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : "Submit Review"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isPending}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Form Help Text */}
                    <div className="text-sm text-gray-500 pt-4 border-t">
                        <p>Your review helps others make better decisions. Please be honest and constructive.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;