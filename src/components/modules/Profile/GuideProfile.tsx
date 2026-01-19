/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    User, Mail, MapPin, Phone, Star, Shield, Calendar,
    DollarSign, Award, Languages, Edit, TrendingUp,
    Users, CheckCircle, AlertCircle, ArrowRight, BadgeCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type GuideProfileProps = {
    userData: any;
};

export default function GuideProfile({ userData }: GuideProfileProps) {
    const router = useRouter();
    const { profile, averageRating, totalReviews } = userData;
    const [showVerificationAlert, setShowVerificationAlert] = useState(!profile?.isVerified);

    const handleVerifyClick = () => {
        router.push('/verify');
    };

    return (
        <section className="max-w-6xl mx-auto p-4">
            {/* Verification Alert Banner */}
            {showVerificationAlert && !profile?.isVerified && (
                <div className="mb-6 animate-fade-in">
                    <div className="bg-linear-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-r-xl p-5 shadow-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                                        <BadgeCheck className="w-5 h-5" />
                                        Get Verified as a Guide
                                    </h3>
                                    <p className="text-amber-700 dark:text-amber-300 mt-1">
                                        Complete verification to unlock full features and gain traveler trust
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                            <CheckCircle className="w-4 h-4" />
                                            Increase booking rates by 60%
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                            <CheckCircle className="w-4 h-4" />
                                            Priority in search results
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                            <CheckCircle className="w-4 h-4" />
                                            Access to premium features
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    onClick={handleVerifyClick}
                                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                                >
                                    Verify Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowVerificationAlert(false)}
                            className="absolute top-3 right-3 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                            aria-label="Close alert"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Profile Card */}
            <div className="bg-linear-to-br from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950/10 dark:to-orange-950/10 rounded-3xl shadow-2xl shadow-amber-200/50 dark:shadow-amber-950/50 overflow-hidden border border-amber-100 dark:border-amber-800/30">
                {/* Header */}
                <div className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-36 translate-x-36"></div>
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-28 -translate-x-28"></div>

                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Guide Profile</h2>
                            <p className="text-amber-100/90 mt-2">Professional Tour Guide Details</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-white/30">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="w-14 h-14 rounded-full bg-linear-to-br from-white/25 to-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                                    <Award className="w-7 h-7 text-white" />
                                </div>
                                {profile?.isVerified ? (
                                    <div className="absolute -top-2 -right-2 group-hover:scale-110 transition-transform">
                                        <div className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg border border-emerald-300 dark:border-emerald-500">
                                            <CheckCircle className="w-3 h-3" />
                                            Verified
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute -top-2 -right-2 group-hover:scale-110 transition-transform">
                                        <div
                                            onClick={handleVerifyClick}
                                            className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg border border-amber-300 dark:border-amber-500 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                        >
                                            <Shield className="w-3 h-3" />
                                            Get Verified
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
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
                                        <div className="w-full h-full bg-linear-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-800 dark:via-orange-800 dark:to-yellow-900 flex flex-col items-center justify-center">
                                            <User className="w-20 h-20 text-amber-400 dark:text-amber-300" />
                                            <span className="text-amber-600 dark:text-amber-300 text-sm mt-2">Profile Photo</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                {!profile?.isVerified && (
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                        <button
                                            onClick={handleVerifyClick}
                                            className="px-4 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-1"
                                        >
                                            <BadgeCheck className="w-3 h-3" />
                                            Verify to get badge
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Stats Cards */}
                            <div className="space-y-4">
                                {/* Rating Card */}
                                <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 shadow-lg dark:shadow-gray-950/30">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-amber-500 fill-current" />
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">Average Rating</span>
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {averageRating?.toFixed(1) || "0.0"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="text-gray-600 dark:text-gray-400">{totalReviews || 0} reviews</span>
                                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                                            ★★★★★
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
                                            style={{ width: `${((averageRating || 0) / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Daily Rate Card */}
                                <div className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Daily Rate</p>
                                                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                                    ${profile?.dailyRate || "0"}
                                                </p>
                                            </div>
                                        </div>
                                        <TrendingUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                    </div>
                                </div>

                                {/* Performance Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-linear-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl p-3 text-center">
                                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Tours</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
                                    </div>
                                    <div className="bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-3 text-center">
                                        <Star className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400">5★ Ratings</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">0</p>
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
                                    linear="from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20"
                                    iconColor="text-blue-600 dark:text-blue-400"
                                />
                                <InfoCard
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Address"
                                    value={userData.email}
                                    linear="from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
                                    iconColor="text-purple-600 dark:text-purple-400"
                                />
                                <InfoCard
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Location"
                                    value={profile?.address || "Not provided"}
                                    linear="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                                    iconColor="text-emerald-600 dark:text-emerald-400"
                                />
                                <InfoCard
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Contact Number"
                                    value={profile?.contactNumber || "Not provided"}
                                    linear="from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                                    iconColor="text-amber-600 dark:text-amber-400"
                                />
                                <InfoCard
                                    icon={<User className="w-5 h-5" />}
                                    label="Gender"
                                    value={profile?.gender || "Not specified"}
                                    linear="from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
                                    iconColor="text-pink-600 dark:text-pink-400"
                                />
                                <InfoCard
                                    icon={<Calendar className="w-5 h-5" />}
                                    label="Member Since"
                                    value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : "N/A"}
                                    linear="from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-900"
                                    iconColor="text-gray-600 dark:text-gray-400"
                                />
                            </div>

                            {/* Expertise & Languages */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Expertise & Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.expertise ? (
                                            <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                {profile.expertise}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">No expertise specified</span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                            <Languages className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Languages</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.languages?.length ? (
                                            profile.languages.map((lang: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-linear-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
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
                            <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    About Me
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {profile?.bio || "No biography provided yet. Share your experience and passion for guiding to attract more travelers!"}
                                </p>
                            </div>

                            {/* Status Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    {profile?.isVerified ? (
                                        <div className="px-5 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300">
                                            <span className="font-medium text-sm flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                Verified Guide
                                            </span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleVerifyClick}
                                            className="px-5 py-2 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors group"
                                        >
                                            <span className="font-medium text-sm flex items-center gap-2">
                                                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                Click to Verify
                                            </span>
                                        </button>
                                    )}
                                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Active since {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : "N/A"}</span>
                                    </div>
                                </div>
                                <div className="px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium text-sm shadow-lg">
                                    Professional Tour Guide
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-3">
                            <Link href="/dashboard/guide">
                                <button className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-sky-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <Link href="/dashboard/guide/tours">
                                <button className="px-5 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    My Tours
                                </button>
                            </Link>
                            <Link href="/dashboard/guide/payouts">
                                <button className="px-5 py-2.5 bg-linear-to-r from-purple-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                    Earnings
                                </button>
                            </Link>
                            {!profile?.isVerified && (
                                <button
                                    onClick={handleVerifyClick}
                                    className="px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <BadgeCheck className="w-4 h-4" />
                                    Get Verified Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InfoCard = ({ icon, label, value, linear, iconColor }: any) => (
    <div className={`p-4 rounded-xl bg-linear-to-br ${linear} border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${iconColor}`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{value}</p>
    </div>
);