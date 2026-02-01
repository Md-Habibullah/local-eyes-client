"use client";

import { useState, startTransition, useRef } from "react";
import { TourCategory } from "@/zod/tour.validation";
import { useActionState } from "react";
import Image from "next/image";
import { Upload, X, MapPin, Users, Clock, DollarSign, Tag } from "lucide-react";

type ActionState = {
    success: boolean;
    message?: string;
};

type Props = {
    action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
};

const MAX_IMAGES = 3;

const TourForm = ({ action }: Props) => {
    const [state, formAction, isPending] = useActionState(action, { success: false });
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files).slice(0, MAX_IMAGES);
        setSelectedImages(files);

        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const handleRemoveImage = (index: number) => {
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
        formData.delete("images");
        selectedImages.forEach((file) => formData.append("images", file));
        startTransition(() => {
            formAction(formData);
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Tour Experience</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Fill in the details below to create an unforgettable tour for your guests
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Form Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Basic Information Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Essential details about your tour</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                name="title"
                                label="Tour Title"
                                placeholder="Sunset Kayaking Adventure"
                                required
                                icon="text"
                            />
                            <Select
                                name="category"
                                label="Category"
                                options={Object.values(TourCategory)}
                                required
                            />
                            <Input
                                name="city"
                                label="City"
                                placeholder="New York"
                                required
                                icon="location"
                            />
                            <Input
                                name="country"
                                label="Country"
                                placeholder="United States"
                                icon="location"
                            />
                        </div>
                    </div>

                    {/* Pricing & Capacity Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pricing & Capacity</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Set your rates and group limits</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Input
                                name="price"
                                label="Price per person"
                                placeholder="99.99"
                                type="number"
                                required
                                icon="dollar"
                                min="0"
                                step="0.01"
                            />
                            <Input
                                name="maxGroupSize"
                                label="Max Group Size"
                                placeholder="12"
                                type="number"
                                required
                                icon="users"
                                min="1"
                            />
                            <Input
                                name="duration"
                                label="Duration"
                                placeholder="3"
                                type="number"
                                required
                                icon="clock"
                                min="1"
                            />
                            <Input
                                name="durationType"
                                label="Duration Unit"
                                placeholder="hours"
                                icon="time"
                            />
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Details</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Where guests will meet you</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                name="meetingPoint"
                                label="Meeting Point"
                                placeholder="Central Park West & 72nd Street"
                                required
                                icon="pin"
                            />
                        </div>
                    </div>

                    {/* Description & Itinerary */}
                    <div className="mb-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Textarea
                                name="description"
                                label="Tour Description"
                                placeholder="Describe the experience, what makes it special, what guests can expect..."
                                required
                                rows={6}
                            />
                            <Textarea
                                name="itinerary"
                                label="Detailed Itinerary"
                                placeholder="• 2:00 PM - Meet at location
• 2:30 PM - Safety briefing
• 3:00 PM - Begin adventure
• 5:00 PM - Sunset viewing
• 6:00 PM - Return and wrap up"
                                required
                                rows={6}
                            />
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <Upload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tour Images</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Upload up to {MAX_IMAGES} high-quality images. First image will be the cover.
                                </p>
                            </div>
                        </div>

                        {/* File Upload Area */}
                        <div className="mb-6">
                            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                Select Images
                            </label>
                            <div className="relative">
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                    <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        PNG, JPG, WEBP up to 200KB each
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleUploadClick}
                                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                                    >
                                        Choose Files
                                    </button>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFilesChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                            </div>
                        </div>

                        {/* Image Previews */}
                        {previews.length > 0 && (
                            <div>
                                <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                    Selected Images ({selectedImages.length}/{MAX_IMAGES})
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {previews.map((src, i) => (
                                        <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
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
                                                        Cover
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(i)}
                                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
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
                    </div>
                </div>

                {/* Status Messages */}
                {state.message && (
                    <div className={`rounded-xl p-4 ${state.success ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                        <p className={`text-sm font-medium ${state.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                            {state.message}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        {isPending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Tour...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Publish Tour
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TourForm;

/* ---------------- Components ---------------- */

function Input({
    label,
    icon,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon?: 'text' | 'dollar' | 'users' | 'clock' | 'location' | 'pin' | 'time';
}) {
    const iconMap = {
        text: <Tag className="w-5 h-5 text-gray-400" />,
        dollar: <DollarSign className="w-5 h-5 text-gray-400" />,
        users: <Users className="w-5 h-5 text-gray-400" />,
        clock: <Clock className="w-5 h-5 text-gray-400" />,
        location: <MapPin className="w-5 h-5 text-gray-400" />,
        pin: <MapPin className="w-5 h-5 text-gray-400" />,
        time: <Clock className="w-5 h-5 text-gray-400" />
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
                    className={`w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all ${icon ? 'pl-10' : ''}`}
                />
            </div>
        </div>
    );
}

function Textarea({
    label,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                {...props}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all resize-none"
            />
        </div>
    );
}

function Select({
    label,
    options,
    ...props
}: {
    label: string;
    options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <select
                    {...props}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all appearance-none pr-10"
                >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt} className="py-2">{opt}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}