/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, Mail, MapPin, Phone, User, Crown, Calendar, Edit, Settings } from "lucide-react";

type AdminProfileProps = {
    userData: any;
};

export default function AdminProfile({ userData }: AdminProfileProps) {
    const { profile } = userData;

    return (
        <section className="max-w-4xl mx-auto p-4">
            <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Admin Profile</h2>
                            <p className="text-blue-100/90 mt-2">Platform Administrator Details</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-white/30">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                {profile?.isSuper && (
                                    <div className="absolute -top-2 -right-2 group-hover:scale-110 transition-transform">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg border border-amber-300">
                                            <Crown className="w-3 h-3" />
                                            Super
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                                {profile?.profilePhoto ? (
                                    <Image
                                        src={profile.profilePhoto}
                                        alt={profile.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                                        <User className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                    <Settings className="w-3 h-3" />
                                    Administrator
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard
                                    icon={<User className="w-5 h-5" />}
                                    label="Full Name"
                                    value={profile?.name || "Not provided"}
                                    gradient="from-blue-50 to-sky-50"
                                    iconColor="text-blue-600 dark:text-blue-400"
                                />
                                <InfoCard
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Address"
                                    value={userData.email}
                                    gradient="from-purple-50 to-violet-50"
                                    iconColor="text-purple-600 dark:text-purple-400"
                                />
                                <InfoCard
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Address"
                                    value={profile?.address || "Not provided"}
                                    gradient="from-emerald-50 to-teal-50"
                                    iconColor="text-emerald-600 dark:text-emerald-400"
                                />
                                <InfoCard
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Contact Number"
                                    value={profile?.contactNumber || "Not provided"}
                                    gradient="from-amber-50 to-orange-50"
                                    iconColor="text-amber-600 dark:text-amber-400"
                                />
                                <InfoCard
                                    icon={<Shield className="w-5 h-5" />}
                                    label="Admin Role"
                                    value={profile?.isSuper ? "Super Administrator" : "Administrator"}
                                    gradient="from-indigo-50 to-blue-50"
                                    iconColor="text-indigo-600 dark:text-indigo-400"
                                />
                                <InfoCard
                                    icon={<Calendar className="w-5 h-5" />}
                                    label="Joined Date"
                                    value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : "Not available"}
                                    gradient="from-gray-50 to-slate-50"
                                    iconColor="text-gray-600 dark:text-gray-400"
                                />
                            </div>

                            {/* Admin Privileges Card */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                            Admin Privileges
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            Full system access with comprehensive management capabilities across all platform features.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                User Management
                                            </span>
                                            <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                Content Moderation
                                            </span>
                                            <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                Analytics Access
                                            </span>
                                            <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                                System Settings
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Last updated: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
                            </div>
                            <div className="flex gap-3">
                                <Link href="/admin/dashboard">
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:opacity-90 transition-opacity">
                                        Dashboard
                                    </button>
                                </Link>
                                {/* <Link href="/admin/settings">
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                                        Settings
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InfoCard = ({ icon, label, value, gradient, iconColor }: any) => (
    <div className={`p-5 rounded-2xl bg-linear-to-br ${gradient} border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${iconColor}`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
);