/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateTour } from "@/services/tours/updateTour";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useRef, startTransition } from "react";
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
    FileText,
    Upload,
    X,
} from "lucide-react";
import { TourCategory } from "@/zod/tour.validation";
import Image from "next/image";

type Props = {
    tour: any;
};

const tourCategoryOptions = Object.values(TourCategory);
const MAX_IMAGES = 3;

export default function EditTourForm({ tour }: Props) {
    const [state, formAction, pending] = useActionState(
        updateTour,
        { success: false, message: "" }
    );
    const router = useRouter();

    // State for file upload
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Clean up preview URLs on unmount
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    // Handle success/error states
    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            // Clean up preview URLs before navigation
            previews.forEach(url => URL.revokeObjectURL(url));
            setTimeout(() => {
                router.push("/dashboard/guide/tours");
                router.refresh();
            }, 1500);
        }

        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state.success, state.message, router, previews]);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files).slice(0, MAX_IMAGES);

        // Revoke previous preview URLs
        previews.forEach(url => URL.revokeObjectURL(url));

        // Create new previews
        const urls = files.map((file) => URL.createObjectURL(file));

        setSelectedImages(files);
        setPreviews(urls);
    };

    const handleRemoveImage = (index: number) => {
        // Revoke the object URL to prevent memory leak
        URL.revokeObjectURL(previews[index]);

        const newFiles = [...selectedImages];
        newFiles.splice(index, 1);
        setSelectedImages(newFiles);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Append tour ID
        if (tour?.id) {
            formData.append("id", tour.id);
        }

        // Append new images (these will REPLACE all existing images)
        selectedImages.forEach((file) => {
            if (file instanceof File) {
                formData.append("files", file);
            }
        });

        console.log("Submitting update with:", {
            tourId: tour?.id,
            selectedImages: selectedImages.length,
        });

        startTransition(() => {
            formAction(formData);
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCancel = () => {
        // Clean up preview URLs before navigating away
        previews.forEach(url => URL.revokeObjectURL(url));
        router.push("/dashboard/guide/tours");
    };

    // Guard clause if tour is null
    if (!tour) {
        return (
            <div className="max-w-6xl mx-auto text-center py-12">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tour Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Unable to load tour data. Please try again.
                </p>
                <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    Back to Tours
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
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

            <form onSubmit={handleSubmit} className="space-y-8">
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
                                label="Duration"
                                placeholder="3"
                                icon="clock"
                                min="1"
                            />
                            <Select
                                name="durationType"
                                defaultValue={tour.durationType || "hours"}
                                label="Duration Type"
                                options={["hours", "days"]}
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

                    {/* Image Upload Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <Upload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tour Images</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {selectedImages.length > 0
                                        ? `Uploading ${selectedImages.length} new images will replace all existing images`
                                        : `Current images will remain. Upload new ones to replace them.`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Current Images Display */}
                        {selectedImages.length === 0 && tour.images && tour.images.length > 0 && (
                            <div className="mb-8">
                                <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                    Current Images ({tour.images.length}/{MAX_IMAGES})
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tour.images.map((src: string, i: number) => (
                                        <div key={`existing-${i}`} className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                            <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                                                <Image
                                                    src={src}
                                                    alt={`Current image ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                {i === 0 && (
                                                    <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                                                        Cover
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 bg-white dark:bg-gray-900">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    Current Image {i + 1}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Will be replaced if you upload new images
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File Upload Area */}
                        <div className="mb-6">
                            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                {selectedImages.length > 0
                                    ? `New Images to Upload (${selectedImages.length}/${MAX_IMAGES})`
                                    : `Upload New Images (max ${MAX_IMAGES})`
                                }
                            </label>
                            <div className="relative">
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                    <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        PNG, JPG, WEBP up to 10MB each
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleUploadClick}
                                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                                    >
                                        Choose Files
                                    </button>
                                    {selectedImages.length > 0 && tour.images && tour.images.length > 0 && (
                                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-4">
                                            <AlertCircle className="w-4 h-4 inline mr-1" />
                                            These images will replace {tour.images.length} existing images
                                        </p>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFilesChange}
                                    className="hidden"
                                    id="image-upload-edit"
                                />
                            </div>
                        </div>

                        {/* New Image Previews */}
                        {previews.length > 0 && (
                            <div>
                                <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                    Selected Images ({selectedImages.length}/{MAX_IMAGES})
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {previews.map((src, i) => (
                                        <div key={`new-${i}`} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                            <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                                                <Image
                                                    src={src}
                                                    alt={`Preview ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                {i === 0 && (
                                                    <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                                                        Will be cover
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(i)}
                                                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                                        title="Remove image"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-white dark:bg-gray-900">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {selectedImages[i]?.name || `Image ${i + 1}`}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {(selectedImages[i]?.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Warning when no images */}
                        {selectedImages.length === 0 && (!tour.images || tour.images.length === 0) && (
                            <div className="rounded-xl p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                                            No images currently
                                        </p>
                                        <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                                            Your tour will be displayed without images. Upload at least one image for better visibility.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                options={tourCategoryOptions}
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
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left:0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
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