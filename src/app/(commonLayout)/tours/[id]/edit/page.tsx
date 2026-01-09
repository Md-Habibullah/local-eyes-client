import EmptyState from "@/components/shared/EmptyState";
import { getTourByID } from "@/services/tours/getTourById";
import { getCurrentUser } from "@/services/auth/getProfileData";
import { AlertCircle, ArrowLeft, Pencil } from "lucide-react";
import EditTourForm from "@/components/modules/Tour/EditTourForm";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default async function EditTourPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const tour = await getTourByID(id);
    if (!tour) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto text-center">
                    <EmptyState
                        icon={AlertCircle}
                        title="Tour not found"
                        description="The tour you're looking for doesn't exist or has been removed."
                    />
                    <div className="mt-6">
                        <Link href="/dashboard/guide/tours">
                            <Button className="w-full sm:w-auto">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const userRes = await getCurrentUser();
    const user = userRes?.data;

    const isOwner =
        user?.role === "GUIDE" && tour?.guide?.id === user?.profile?.id;

    if (!isOwner) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto text-center">
                    <EmptyState
                        icon={AlertCircle}
                        title="Access Denied"
                        description="You don't have permission to edit this tour. Only the tour guide can make changes."
                    />
                    <div className="mt-6">
                        <Link href="/tours">
                            <Button className="w-full sm:w-auto">
                                View All Tours
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Navigation Header */}
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href="/dashboard/guide/tours"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-medium">Back to Tours</span>
                        </Link>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                <Pencil className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    Edit Tour
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span className="text-sm">Editing:</span>
                                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                                        {tour.title}
                                    </span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="text-sm">
                                        ID: <code className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded text-xs font-mono">
                                            {id.slice(0, 8)}...
                                        </code>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`self-start px-3 py-1.5 rounded-full text-sm font-medium ${tour.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                            {tour.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${typeof tour.price === 'number' ? tour.price.toFixed(2) : '0.00'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">per person</div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {tour.duration} {tour.durationType || 'hours'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">total time</div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {tour.maxGroupSize || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">max guests</div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {tour.city}{tour.country ? `, ${tour.country}` : ''}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {tour.meetingPoint || 'Meeting point not specified'}
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Edit Tour Details
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Update any information below. Changes will be saved when you click &quot;Save Changes&quot;.
                            </p>
                        </div>
                        <EditTourForm tour={tour} />
                    </div>

                    {/* Footer Note */}
                    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 md:px-8 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>Your changes will be reviewed and may take a few minutes to appear live.</span>
                        </p>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Need help with editing?
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                    <span>Ensure all required fields are filled out correctly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                    <span>Prices and capacity changes may affect existing bookings</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                    <span>Contact support if you need to make significant changes to booked tours</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}