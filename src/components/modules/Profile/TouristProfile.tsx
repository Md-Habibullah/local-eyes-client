/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { User, Mail, MapPin, Globe, Heart, Calendar, UserCircle, Languages } from "lucide-react";

type TouristProfileProps = {
    userData: any;
};

export default function TouristProfile({ userData }: TouristProfileProps) {
    const { profile } = userData;

    return (
        <section className="max-w-5xl mx-auto">
            <div className="bg-linear-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 dark:border-emerald-800/30">
                {/* Header */}
                <div className="bg-linear-to-r from-emerald-500 to-teal-600 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Tourist Profile</h2>
                            <p className="text-emerald-100 mt-1">Traveler Information & Preferences</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Profile Image */}
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
                                    <div className="w-full h-full bg-linear-to-br from-emerald-100 to-teal-200 dark:from-emerald-800 dark:to-teal-900 flex flex-col items-center justify-center p-4">
                                        <User className="w-16 h-16 text-emerald-400 dark:text-emerald-300" />
                                        <span className="text-emerald-600 dark:text-emerald-300 text-sm mt-2">No Photo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 space-y-6">
                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoItem
                                    icon={<User className="w-5 h-5" />}
                                    label="Full Name"
                                    value={profile?.name || "-"}
                                    color="blue"
                                />
                                <InfoItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Address"
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
                            </div>

                            {/* Languages & Preferences */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                                            <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Languages Spoken</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.languages?.length ? (
                                            profile.languages.map((lang: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                                >
                                                    {lang}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No languages specified</span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                                            <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Travel Preferences</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.preferences?.length ? (
                                            profile.preferences.map((pref: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
                                                >
                                                    {pref}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No preferences specified</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            {profile?.bio && (
                                <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">About</h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-sm">Member since {new Date(profile?.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                    <span className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">
                                        Active Tourist
                                    </span>
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
    };

    return (
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
                    {icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{value}</p>
        </div>
    );
};