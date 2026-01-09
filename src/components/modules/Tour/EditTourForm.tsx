/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateTour } from "@/services/tours/updateTour";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
    Tag,
    MapPin,
    DollarSign,
    Clock,
    Users,
    Calendar,
    AlertCircle,
    Save,
    ArrowLeft,
    Globe,
    Building,
    FileText
} from "lucide-react";
import { TourCategory } from "@/zod/tour.validation"; // Import the enum

type Props = {
    tour: any;
};

// Get the enum values as an array
const tourCategoryOptions = Object.values(TourCategory);

export default function EditTourForm({ tour }: Props) {
    const [state, formAction, pending] = useActionState(
        updateTour,
        { success: false, message: "" }
    );
    const router = useRouter();

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            router.push("/dashboard/guide/tours");
        }

        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state.success, state.message, router]);

    const handleCancel = () => {
        router.push("/dashboard/guide/tours");
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Tour</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Update your tour details and settings
                        </p>
                    </div>
                </div>
            </div>

            <form action={formAction} className="space-y-8">
                <input type="hidden" name="id" value={tour.id} />

                {/* Main Form Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Tour Information Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tour Information</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Basic details about your tour</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                name="title"
                                defaultValue={tour.title}
                                label="Tour Title"
                                placeholder="Exciting Adventure Tour"
                                icon="text"
                                required
                            />
                            <Input
                                name="price"
                                defaultValue={tour.price}
                                type="number"
                                label="Price per person"
                                placeholder="99.99"
                                icon="dollar"
                                min="0"
                                step="0.01"
                            />
                            <Input
                                name="duration"
                                defaultValue={tour.duration}
                                type="number"
                                label="Duration (hours)"
                                placeholder="3"
                                icon="clock"
                                min="1"
                            />
                            <Select
                                name="durationType"
                                defaultValue={tour.durationType || "hours"}
                                label="Duration Type"
                                options={["hours", "days"]} // Typically only hours or days for tours
                                icon="time"
                            />
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Details</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Where your tour takes place</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                name="city"
                                defaultValue={tour.city}
                                label="City"
                                placeholder="New York"
                                icon="building"
                            />
                            <Input
                                name="country"
                                defaultValue={tour.country}
                                label="Country"
                                placeholder="United States"
                                icon="globe"
                            />
                            <Input
                                name="meetingPoint"
                                defaultValue={tour.meetingPoint}
                                label="Meeting Point"
                                placeholder="Central Park entrance"
                                icon="pin"
                                className="md:col-span-2"
                            />
                        </div>
                    </div>

                    {/* Description & Itinerary */}
                    <div className="mb-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Textarea
                                name="description"
                                defaultValue={tour.description}
                                label="Tour Description"
                                placeholder="Describe your tour experience, what makes it special, what guests can expect..."
                                icon="text"
                                rows={6}
                            />
                            <Textarea
                                name="itinerary"
                                defaultValue={tour.itinerary}
                                label="Detailed Itinerary"
                                placeholder="• 2:00 PM - Meet at location
• 2:30 PM - Safety briefing
• 3:00 PM - Begin adventure
• 5:00 PM - Photo session
• 6:00 PM - Return and wrap up"
                                icon="list"
                                rows={6}
                            />
                        </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tour Settings</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Configure tour capacity and availability</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                name="maxGroupSize"
                                defaultValue={tour.maxGroupSize}
                                type="number"
                                label="Max Group Size"
                                placeholder="12"
                                icon="users"
                                min="1"
                            />
                            <Select
                                name="category"
                                defaultValue={tour.category}
                                label="Category"
                                options={tourCategoryOptions} // Use the imported enum values
                                icon="category"
                            />
                        </div>

                        {/* Toggle Switch */}
                        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                        <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Tour Status</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {tour.isActive ? "Tour is currently active and visible to guests" : "Tour is currently inactive and hidden"}
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        defaultChecked={tour.isActive}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 ml-14">
                                {tour.isActive
                                    ? "✓ Your tour is listed and bookable by guests"
                                    : "✗ Your tour is hidden and not visible to guests"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={pending}
                        className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        {pending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

                {/* Status Message */}
                {state.message && !state.success && (
                    <div className="rounded-xl p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                {state.message}
                            </p>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

/* ---------------- Components ---------------- */

function Input({
    label,
    icon,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon?: 'text' | 'dollar' | 'clock' | 'users' | 'pin' | 'globe' | 'building' | 'location';
}) {
    const iconMap = {
        text: <Tag className="w-5 h-5 text-gray-400" />,
        dollar: <DollarSign className="w-5 h-5 text-gray-400" />,
        clock: <Clock className="w-5 h-5 text-gray-400" />,
        users: <Users className="w-5 h-5 text-gray-400" />,
        pin: <MapPin className="w-5 h-5 text-gray-400" />,
        globe: <Globe className="w-5 h-5 text-gray-400" />,
        building: <Building className="w-5 h-5 text-gray-400" />,
        location: <MapPin className="w-5 h-5 text-gray-400" />,
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {iconMap[icon]}
                    </div>
                )}
                <input
                    {...props}
                    className={`w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all ${icon ? 'pl-10' : ''} ${props.className || ''}`}
                />
            </div>
        </div>
    );
}

function Textarea({
    label,
    icon,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    icon?: 'text' | 'list';
}) {
    const iconMap = {
        text: <FileText className="w-5 h-5 text-gray-400" />,
        list: <Calendar className="w-5 h-5 text-gray-400" />,
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-3">
                        {iconMap[icon]}
                    </div>
                )}
                <textarea
                    {...props}
                    className={`w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all resize-none ${icon ? 'pl-10' : ''}`}
                />
            </div>
        </div>
    );
}

function Select({
    label,
    options,
    icon,
    ...props
}: {
    label: string;
    options: string[];
    icon?: 'time' | 'category' | 'users';
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
    const iconMap = {
        time: <Clock className="w-5 h-5 text-gray-400" />,
        category: <Tag className="w-5 h-5 text-gray-400" />,
        users: <Users className="w-5 h-5 text-gray-400" />,
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {iconMap[icon]}
                    </div>
                )}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <select
                    {...props}
                    className={`w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all appearance-none pr-10 ${icon ? 'pl-10' : ''}`}
                >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}