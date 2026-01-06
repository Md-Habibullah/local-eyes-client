"use client";

import { useState, startTransition } from "react";
import { TourCategory } from "@/zod/tour.validation";
import { useActionState } from "react";
import Image from "next/image";

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

    // Handle file input change
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files).slice(0, MAX_IMAGES);
        setSelectedImages(files);

        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    // Remove an image before submit
    const handleRemoveImage = (index: number) => {
        const newFiles = [...selectedImages];
        newFiles.splice(index, 1);
        setSelectedImages(newFiles);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    // Form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Remove old images in FormData
        formData.delete("images");

        // Append selected images
        selectedImages.forEach((file) => formData.append("images", file));

        // Submit with startTransition for proper useActionState
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Create New Tour</h2>

            {/* Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" label="Title" placeholder="Exciting Adventure" required />
                <Input name="price" label="Price" placeholder="100" type="number" required />
                <Input name="duration" label="Duration" placeholder="3" type="number" required />
                <Input name="durationType" label="Duration Type" placeholder="hours" />
                <Input name="meetingPoint" label="Meeting Point" placeholder="Central Park" required />
                <Input name="maxGroupSize" label="Max Group Size" placeholder="10" type="number" required />
                <Input name="city" label="City" placeholder="New York" required />
                <Input name="country" label="Country" placeholder="USA" />
                <Select name="category" label="Category" options={Object.values(TourCategory)} required />
            </div>

            {/* Textareas */}
            <Textarea name="description" label="Description" placeholder="Describe your tour..." required />
            <Textarea name="itinerary" label="Itinerary" placeholder="Day by day plan..." required />

            {/* Image Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Images (max {MAX_IMAGES})</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                    className="block w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                />

                {/* Preview thumbnails */}
                <div className="flex flex-wrap gap-3 mt-2">
                    {previews.map((src, i) => (
                        <div key={i} className="relative w-24 h-24 rounded overflow-hidden border border-gray-700">
                            <Image src={src} alt={`Preview ${i + 1}`} fill className="object-cover" sizes="96px" />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(i)}
                                className="absolute top-1 right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs hover:bg-red-700"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Messages */}
            {state.message && (
                <p className={state.success ? "text-green-500" : "text-red-500"}>{state.message}</p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
            >
                {isPending ? "Submitting..." : "Create Tour"}
            </button>
        </form>
    );
};

export default TourForm;

/* ---------------- Components ---------------- */

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">{label}</label>
            <input
                {...props}
                className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}

function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">{label}</label>
            <textarea
                {...props}
                rows={4}
                className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}

function Select({ label, options, ...props }: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">{label}</label>
            <select
                {...props}
                className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
