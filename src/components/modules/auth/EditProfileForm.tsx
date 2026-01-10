/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    User, Mail, MapPin, Phone, Globe,
    Award, DollarSign, Camera, X,
    Upload, Save, ArrowLeft, Languages,
    Heart, Sparkles, Loader2
} from "lucide-react";
import Image from "next/image";
import { serverFetch } from "@/lib/server-fetch";

type ProfileData = {
    id: string;
    email: string;
    role: string;
    profile?: {
        name?: string;
        gender?: string;
        profilePhoto?: string;
        bio?: string;
        address?: string;
        contactNumber?: string;
        languages?: string[];
        preferences?: string[];
        expertise?: string[];
        dailyRate?: number;
    };
};

type EditProfileFormProps = {
    initialData: ProfileData;
};

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Initialize form with data from server
    const [formData, setFormData] = useState({
        name: initialData.profile?.name || "",
        gender: initialData.profile?.gender || "",
        bio: initialData.profile?.bio || "",
        address: initialData.profile?.address || "",
        contactNumber: initialData.profile?.contactNumber || "",
        languages: initialData.profile?.languages?.join(", ") || "",
        preferences: initialData.profile?.preferences?.join(", ") || "",
        expertise: initialData.profile?.expertise?.join(", ") || "",
        dailyRate: initialData.profile?.dailyRate?.toString() || "",
    });

    // Language options
    const languageOptions = [
        "English", "Spanish", "French", "German", "Chinese",
        "Japanese", "Korean", "Arabic", "Hindi", "Bengali",
        "Russian", "Portuguese", "Italian", "Dutch", "Turkish"
    ];

    // Preference options (for tourists)
    const preferenceOptions = [
        "Adventure", "Cultural", "Food & Dining", "Historical",
        "Nature & Wildlife", "Beach & Relaxation", "Urban Exploration",
        "Photography", "Shopping", "Nightlife", "Family Friendly",
        "Luxury", "Budget", "Solo Travel", "Group Travel"
    ];

    // Expertise options (for guides)
    const expertiseOptions = [
        "Mountain Guide", "City Tour", "Historical Expert", "Food Expert",
        "Photography Guide", "Adventure Sports", "Cultural Guide",
        "Wildlife Expert", "Art & Architecture", "Language Specialist",
        "Hiking Expert", "Diving Instructor", "Ski Instructor",
        "Archaeology", "Local History"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("Image size should be less than 5MB");
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewImage(null);
    };

    const handleMultiSelect = (field: string, value: string) => {
        const currentValues = formData[field as keyof typeof formData].toString()
            .split(",")
            .map(v => v.trim())
            .filter(v => v);

        if (currentValues.includes(value)) {
            const newValues = currentValues.filter(v => v !== value);
            setFormData(prev => ({
                ...prev,
                [field]: newValues.join(", ")
            }));
        } else {
            const newValues = [...currentValues, value];
            setFormData(prev => ({
                ...prev,
                [field]: newValues.join(", ")
            }));
        }
    };

    const isSelected = (field: string, value: string) => {
        const values = formData[field as keyof typeof formData].toString()
            .split(",")
            .map(v => v.trim());
        return values.includes(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();

            // Build the JSON data exactly as backend expects
            const jsonData: any = {};

            if (formData.name) jsonData.name = formData.name;
            if (formData.gender) jsonData.gender = formData.gender;
            if (formData.bio) jsonData.bio = formData.bio;
            if (formData.address) jsonData.address = formData.address;
            if (formData.contactNumber) jsonData.contactNumber = formData.contactNumber;

            // Handle arrays
            if (formData.languages) {
                jsonData.languages = formData.languages
                    .split(",")
                    .map(l => l.trim())
                    .filter(l => l);
            }

            if (initialData.role === "TOURIST" && formData.preferences) {
                jsonData.preferences = formData.preferences
                    .split(",")
                    .map(p => p.trim())
                    .filter(p => p);
            }

            if (initialData.role === "GUIDE") {
                if (formData.expertise) {
                    jsonData.expertise = formData.expertise
                        .split(",")
                        .map(e => e.trim())
                        .filter(e => e);
                }
                if (formData.dailyRate) {
                    jsonData.dailyRate = parseFloat(formData.dailyRate);
                }
            }

            // Add the JSON data as string
            formDataToSend.append("data", JSON.stringify(jsonData));

            // Add file if selected
            if (selectedFile) {
                formDataToSend.append("file", selectedFile);
            }

            // Make the API call with credentials
            // const response = await fetch(`https://local-eyes-server.vercel.app/api/v1/users/${initialData.id}`, {
            //     method: "PATCH",
            //     credentials: "include", // This sends cookies automatically
            //     body: formDataToSend,
            //     // Note: Don't set Content-Type header for FormData
            //     // Don't set Authorization header if using cookies
            // });
            const response = await serverFetch.patch(`/users/${initialData.id}`, {
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success("Profile updated successfully!");

                // Refresh and redirect
                router.push("/my-profile");
                router.refresh();
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.back()}
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
                                <p className="text-gray-600 dark:text-gray-400">Update your personal information</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full">
                                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                    {initialData.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Profile Photo Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Photo</h2>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Current/Preview Image */}
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                                    {previewImage ? (
                                        <Image
                                            src={previewImage}
                                            alt="Preview"
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : initialData.profile?.profilePhoto ? (
                                        <Image
                                            src={initialData.profile.profilePhoto}
                                            alt={initialData.profile.name || "Profile"}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                            <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    )}
                                </div>

                                {previewImage && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Upload Controls */}
                            <div className="flex-1 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Upload New Photo
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <label className="flex-1 cursor-pointer">
                                            <div className="px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Upload className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-600 dark:text-gray-400">Choose file</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>

                                        {selectedFile && (
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <p className="font-medium">{selectedFile.name}</p>
                                                <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Recommended: Square image, at least 400x400 pixels
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className="pl-10 h-11"
                                        required
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Gender
                                </label>
                                <div className="relative">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-10 py-2.5 h-11 appearance-none bg-white dark:bg-gray-800"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contact Number
                                </label>
                                <div className="relative">
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        placeholder="+1 (234) 567-8900"
                                        className="pl-10 h-11"
                                    />
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <div className="relative">
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Your address"
                                        className="pl-10 h-11"
                                    />
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">About You</h2>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bio / Introduction
                            </label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself, your interests, and what makes you unique..."
                                rows={4}
                                className="min-h-[100px]"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Share your story to connect better with others
                            </p>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Languages</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {languageOptions.map((lang) => (
                                    <button
                                        key={lang}
                                        type="button"
                                        onClick={() => handleMultiSelect("languages", lang)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected("languages", lang)
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Selected Languages
                                </label>
                                <Input
                                    name="languages"
                                    value={formData.languages}
                                    onChange={handleChange}
                                    placeholder="English, Spanish, French..."
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role-specific Sections */}
                    {initialData.role === "TOURIST" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Travel Preferences</h2>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {preferenceOptions.map((pref) => (
                                        <button
                                            key={pref}
                                            type="button"
                                            onClick={() => handleMultiSelect("preferences", pref)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected("preferences", pref)
                                                ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                }`}
                                        >
                                            {pref}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your Preferences
                                    </label>
                                    <Input
                                        name="preferences"
                                        value={formData.preferences}
                                        onChange={handleChange}
                                        placeholder="Adventure, Cultural, Food & Dining..."
                                        className="h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {initialData.role === "GUIDE" && (
                        <>
                            {/* Expertise */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Expertise & Skills</h2>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {expertiseOptions.map((exp) => (
                                            <button
                                                key={exp}
                                                type="button"
                                                onClick={() => handleMultiSelect("expertise", exp)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isSelected("expertise", exp)
                                                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                    }`}
                                            >
                                                {exp}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Your Expertise
                                        </label>
                                        <Input
                                            name="expertise"
                                            value={formData.expertise}
                                            onChange={handleChange}
                                            placeholder="Mountain Guide, City Tour, Historical Expert..."
                                            className="h-11"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Daily Rate */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Rate</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Daily Rate (USD)
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="dailyRate"
                                                name="dailyRate"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={formData.dailyRate}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="pl-10 h-11"
                                            />
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                                            <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                                Set your daily rate for tour guiding services
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Email (Read-only) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h2>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-900 dark:text-white font-medium">{initialData.email}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Email cannot be changed. Contact support if needed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                    Saving Changes...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </span>
                            )}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isLoading}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;