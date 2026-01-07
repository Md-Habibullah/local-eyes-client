/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// app/review/[id]/ReviewForm.tsx
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/tourist/createReview";
import { Star, ArrowLeft, AlertCircle, CheckCircle, MessageSquare, Sparkles, Calendar, MapPin, User } from "lucide-react";

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
    booking: any;
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
        initialState
    );

    // Handle success state with useEffect
    useEffect(() => {
        if (formState?.success) {
            const timer = setTimeout(() => {
                router.push("/dashboard/tourist/bookings");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [formState?.success, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-950/20 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.back()}
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    Share Your Experience
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Your feedback helps other travelers and guides
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full border border-amber-200 dark:border-amber-800/30">
                            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="font-medium text-amber-700 dark:text-amber-400">Leave a Review</span>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {booking?.tour?.title}
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(booking?.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span>{booking?.tour?.location || booking?.tour?.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <User className="w-4 h-4" />
                                        <span>Guide: {booking?.guide?.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-full">
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                    Booking #{bookingId.slice(-8)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Success Message */}
                            {formState?.success && (
                                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-emerald-200 dark:border-emerald-800/30">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                                                Review Submitted Successfully!
                                            </h3>
                                            <p className="text-emerald-700 dark:text-emerald-400">
                                                {formState?.message || "Thank you for sharing your experience!"}
                                            </p>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2">
                                                Redirecting to bookings in 3 seconds...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form
                                action={formAction}
                                className="p-6 space-y-6"
                                key={formState?.success ? "reset" : "form"}
                            >
                                {/* Hidden booking ID field */}
                                <input
                                    type="hidden"
                                    name="bookingId"
                                    value={bookingId}
                                    readOnly
                                />

                                {/* Rating Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="rating" className="block text-lg font-semibold text-gray-900 dark:text-white">
                                            Overall Rating
                                        </label>
                                        <span className="text-sm text-red-500">* Required</span>
                                    </div>

                                    <div className="space-y-3">
                                        <select
                                            id="rating"
                                            name="rating"
                                            required
                                            className={`w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition appearance-none ${formState?.errors?.rating ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            defaultValue=""
                                        >
                                            <option value="">Select your rating</option>
                                            {[1, 2, 3, 4, 5].map(r => (
                                                <option key={r} value={r}>
                                                    {r} Star{r > 1 ? 's' : ''} - {r === 1 ? "Poor" : r === 2 ? "Fair" : r === 3 ? "Good" : r === 4 ? "Very Good" : "Excellent"}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Star Preview */}
                                        <div className="flex justify-center gap-1 py-3">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    className={`w-8 h-8 ${star <= 3 ? "text-amber-500" : "text-gray-300 dark:text-gray-600"} transition-colors`}
                                                />
                                            ))}
                                        </div>

                                        {formState?.errors?.rating && (
                                            <div className="flex items-center gap-2 text-red-500 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {formState.errors.rating[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Comment Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="comment" className="block text-lg font-semibold text-gray-900 dark:text-white">
                                            Detailed Experience
                                        </label>
                                        <span className="text-sm text-red-500">* Required</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="absolute left-4 top-4">
                                                <MessageSquare className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                placeholder="Share your detailed experience with this tour and guide. What did you enjoy most? Any suggestions for improvement?"
                                                required
                                                rows={6}
                                                className={`w-full border rounded-xl px-12 py-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none ${formState?.errors?.comment ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-gray-300 dark:border-gray-600"
                                                    }`}
                                                defaultValue=""
                                            />
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div>
                                                {formState?.errors?.comment && (
                                                    <div className="flex items-center gap-2 text-red-500">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {formState.errors.comment[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                Minimum 10 characters
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* General Error Message */}
                                {formState?.message && !formState?.success && !formState?.errors?.rating && !formState?.errors?.comment && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-red-700 dark:text-red-300 font-medium">Submission Error</p>
                                                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{formState.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isPending || formState?.success}
                                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all ${isPending ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {isPending ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting Review...
                                            </>
                                        ) : (
                                            <>
                                                <Star className="w-5 h-5" />
                                                Submit Review
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        disabled={isPending}
                                        className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Tips & Guide Info */}
                    <div className="space-y-6">
                        {/* Tips Card */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review Tips</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Helpful guidelines</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">1</span>
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Be honest about your experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">2</span>
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Include specific details about the tour</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">3</span>
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Mention what you enjoyed most</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">4</span>
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Provide constructive feedback</span>
                                </li>
                            </ul>
                        </div>

                        {/* Guide Info Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Guide Information</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                                    <User className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{booking?.guide?.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Tour Guide</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Your review helps {booking?.guide?.name} improve their services and helps future travelers make informed decisions.
                            </p>
                        </div>

                        {/* Importance Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-2xl border border-blue-200 dark:border-blue-800/30 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Why Your Review Matters</h3>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Reviews build trust in the travel community. Your honest feedback helps:
                            </p>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Future travelers choose the right tours
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Guides improve their services
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Maintain quality standards
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;