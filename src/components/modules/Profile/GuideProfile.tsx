/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { User, Mail, MapPin, Phone, Globe, Star, Shield, Calendar, DollarSign, Award, Languages } from "lucide-react";

type GuideProfileProps = {
    userData: any;
};

export default function GuideProfile({ userData }: GuideProfileProps) {
    const { profile, averageRating, totalReviews } = userData;

    return (
        <section className="max-w-6xl mx-auto">
            <div className="bg-linear-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-900/10 rounded-2xl shadow-xl overflow-hidden border border-amber-100 dark:border-amber-800/30">
                {/* Header */}
                <div className="bg-linear-to-r from-amber-500 to-orange-600 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Guide Profile</h2>
                            <p className="text-amber-100 mt-1">Professional Tour Guide Details</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Profile Image & Stats */}
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                                    {profile?.profilePhoto ? (
                                        <Image
                                            src={profile.profilePhoto}
                                            alt={profile.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-amber-100 to-orange-200 dark:from-amber-800 dark:to-orange-900 flex flex-col items-center justify-center p-4">
                                            <User className="w-16 h-16 text-amber-400 dark:text-amber-300" />
                                            <span className="text-amber-600 dark:text-amber-300 text-sm mt-2">No Photo</span>
                                        </div>
                                    )}
                                </div>

                                {/* Verified Badge */}
                                {profile?.isVerified && (
                                    <div className="absolute -top-2 -right-2">
                                        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                            <Shield className="w-3 h-3" />
                                            Verified Guide
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Rating Card */}
                            <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-amber-200 dark:border-amber-800 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-500 fill-current" />
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Rating</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {averageRating.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Out of 5.0</span>
                                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                                        ({totalReviews} reviews)
                                    </span>
                                </div>
                                <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
                                        style={{ width: `${(averageRating / 5) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Daily Rate Card */}
                            <div className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                                        <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Daily Rate</p>
                                        <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                                            {profile?.dailyRate ? `$${profile.dailyRate}` : "Not set"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            {/* Personal Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoItem
                                    icon={<User className="w-5 h-5" />}
                                    label="Full Name"
                                    value={profile?.name || "-"}
                                    color="blue"
                                />
                                <InfoItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email"
                                    value={userData.email}
                                    color="purple"
                                />
                                <InfoItem
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Location"
                                    value={profile?.address || "-"}
                                    color="emerald"
                                />
                                <InfoItem
                                    icon={<User className="w-5 h-5" />}
                                    label="Gender"
                                    value={profile?.gender || "-"}
                                    color="pink"
                                />
                                <InfoItem
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Contact"
                                    value={profile?.contactNumber || "-"}
                                    color="indigo"
                                />
                                <InfoItem
                                    icon={<Calendar className="w-5 h-5" />}
                                    label="Joined"
                                    value={new Date(profile?.createdAt).toLocaleDateString()}
                                    color="gray"
                                />
                            </div>

                            {/* Expertise & Languages */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                                            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Expertise</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.expertise ? (
                                            <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                {profile.expertise}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No expertise specified</span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                                            <Languages className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Languages</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.languages?.length ? (
                                            profile.languages.map((lang: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                                                >
                                                    {lang}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No languages specified</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            {profile?.bio && (
                                <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">About Me</h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                                </div>
                            )}

                            {/* Status Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className={`px-4 py-2 rounded-full ${profile?.isVerified ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                        <span className="font-medium text-sm">
                                            {profile?.isVerified ? '✓ Verified Guide' : 'Unverified'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Active since {new Date(profile?.createdAt).getFullYear()}</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium text-sm">
                                    Professional Tour Guide
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InfoItem = ({ icon, label, value, color }: any) => {
    const colorClasses = {
        blue: "text-blue-600 dark:text-blue-400",
        purple: "text-purple-600 dark:text-purple-400",
        emerald: "text-emerald-600 dark:text-emerald-400",
        pink: "text-pink-600 dark:text-pink-400",
        indigo: "text-indigo-600 dark:text-indigo-400",
        gray: "text-gray-600 dark:text-gray-400",
    };

    return (
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800/50">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} bg-opacity-10`}>
                    {icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{value}</p>
        </div>
    );
};