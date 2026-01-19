/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Mail, MapPin, Globe, Heart, Calendar, UserCircle, Languages, Edit, Compass, Star, Package, Award } from "lucide-react";

type TouristProfileProps = {
    userData: any;
};

export default function TouristProfile({ userData }: TouristProfileProps) {
    const { profile } = userData;

    return (
        <section className="max-w-6xl mx-auto p-4">
            <div className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950/10 dark:to-teal-950/10 rounded-3xl shadow-2xl shadow-emerald-200/50 dark:shadow-emerald-950/50 overflow-hidden border border-emerald-100 dark:border-emerald-800/30">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-36 translate-x-36"></div>
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-28 -translate-x-28"></div>

                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Tourist Profile</h2>
                            <p className="text-emerald-100/90 mt-2">Traveler Information & Preferences</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-white/30">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>

                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                                <UserCircle className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Left Side - Profile & Stats */}
                        <div className="space-y-6">
                            {/* Profile Image */}
                            <div className="relative group">
                                <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                                    {profile?.profilePhoto ? (
                                        <Image
                                            src={profile.profilePhoto}
                                            alt={profile.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-900 flex flex-col items-center justify-center">
                                            <User className="w-20 h-20 text-emerald-400 dark:text-emerald-300" />
                                            <span className="text-emerald-600 dark:text-emerald-300 text-sm mt-2">Profile Photo</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                    <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                        <Compass className="w-3 h-3" />
                                        Explorer
                                    </div>
                                </div>
                            </div>

                            {/* Travel Stats Cards */}
                            <div className="space-y-4">
                                {/* Bookings Card */}
                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-lg dark:shadow-gray-950/30">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">Total Bookings</span>
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            0
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Upcoming: 0 • Completed: 0
                                    </div>
                                </div>

                                {/* Rating Card */}
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500" />
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">Average Rating</span>
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            0.0
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Based on 0 reviews
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl p-3 text-center">
                                        <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Countries</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-3 text-center">
                                        <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Badges</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">1</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Main Content */}
                        <div className="flex-1 space-y-6">
                            {/* Personal Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard
                                    icon={<User className="w-5 h-5" />}
                                    label="Full Name"
                                    value={profile?.name || "Not provided"}
                                    gradient="from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20"
                                    iconColor="text-blue-600 dark:text-blue-400"
                                />
                                <InfoCard
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Address"
                                    value={userData.email}
                                    gradient="from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
                                    iconColor="text-purple-600 dark:text-purple-400"
                                />
                                <InfoCard
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Location"
                                    value={profile?.address || "Not provided"}
                                    gradient="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                                    iconColor="text-emerald-600 dark:text-emerald-400"
                                />
                                <InfoCard
                                    icon={<User className="w-5 h-5" />}
                                    label="Gender"
                                    value={profile?.gender || "Not specified"}
                                    gradient="from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
                                    iconColor="text-pink-600 dark:text-pink-400"
                                />
                                <InfoCard
                                    icon={<Globe className="w-5 h-5" />}
                                    label="Nationality"
                                    value={profile?.nationality || "Not specified"}
                                    gradient="from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
                                    iconColor="text-indigo-600 dark:text-indigo-400"
                                />
                                <InfoCard
                                    icon={<Calendar className="w-5 h-5" />}
                                    label="Member Since"
                                    value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : "N/A"}
                                    gradient="from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-900"
                                    iconColor="text-gray-600 dark:text-gray-400"
                                />
                            </div>

                            {/* Languages & Preferences */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                            <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Languages Spoken</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.languages?.length ? (
                                            profile.languages.map((lang: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                                                >
                                                    {lang}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No languages specified</span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                            <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Travel Preferences</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.preferences?.length ? (
                                            profile.preferences.map((pref: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full text-sm font-medium text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
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
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <UserCircle className="w-5 h-5" />
                                    About Me
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {profile?.bio || "No biography provided yet. Share your travel interests and experiences to help guides customize tours for you!"}
                                </p>
                            </div>

                            {/* Traveler Badges */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    Traveler Badges
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/40 dark:to-teal-800/40 flex items-center justify-center mb-2">
                                            <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">New Explorer</span>
                                    </div>
                                    <div className="flex flex-col items-center opacity-40">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/20 dark:to-orange-800/20 flex items-center justify-center mb-2">
                                            <Globe className="w-6 h-6 text-amber-400 dark:text-amber-500" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">World Traveler</span>
                                    </div>
                                    <div className="flex flex-col items-center opacity-40">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-800/20 dark:to-violet-800/20 flex items-center justify-center mb-2">
                                            <Star className="w-6 h-6 text-purple-400 dark:text-purple-500" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Top Reviewer</span>
                                    </div>
                                    <div className="flex flex-col items-center opacity-40">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-800/20 dark:to-sky-800/20 flex items-center justify-center mb-2">
                                            <Heart className="w-6 h-6 text-blue-400 dark:text-blue-500" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Loyal Traveler</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-3">
                            <Link href="/dashboard/tourist">
                                <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <Link href="/tours">
                                <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    Explore Tours
                                </button>
                            </Link>
                            <Link href="/dashboard/tourist/bookings">
                                <button className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    My Bookings
                                </button>
                            </Link>
                            <Link href="/dashboard/tourist/wishlist">
                                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    Wishlist
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InfoCard = ({ icon, label, value, gradient, iconColor }: any) => (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${iconColor}`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{value}</p>
    </div>
);