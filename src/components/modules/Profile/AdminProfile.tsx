/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, Mail, MapPin, Phone, User, Crown, Calendar, Edit, Settings, ChevronRight } from "lucide-react";
import { useState } from "react";

type AdminProfileProps = {
    userData: any;
};

// InfoRow Component
const InfoRow = ({ icon, label, value }: any) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className="text-sm text-gray-900 dark:text-white font-medium truncate ml-2">
            {value || "Not provided"}
        </span>
    </div>
);

// InfoCard Component
const InfoCard = ({ icon, label, value, gradient, iconColor }: any) => (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${gradient} border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${iconColor}`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
);

// Mobile Admin Profile Component
const MobileAdminProfile = ({ userData }: AdminProfileProps) => {
    const { profile } = userData;
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="md:hidden">
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>

                <div className="relative flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white drop-shadow-lg">Admin Profile</h2>
                        <p className="text-blue-100/90 text-sm">Platform Administrator</p>
                    </div>

                    <Link href={'/my-profile/update'}>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm border border-white/30">
                            <Edit className="w-3 h-3" />
                            Edit
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Profile Section */}
            <div className="p-4">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800">
                                {profile?.profilePhoto ? (
                                    <Image
                                        src={profile.profilePhoto}
                                        alt={profile.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                                        <User className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                    </div>
                                )}
                            </div>
                            {profile?.isSuper && (
                                <div className="absolute -top-1 -right-1">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5">
                                        <Crown className="w-2 h-2" />
                                        Super
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                    {profile?.name || "Admin User"}
                                </h3>
                                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                                {userData.email}
                            </p>
                            <div className="mt-2">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                                    Administrator
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">24</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">98%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">2.4k</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Visits</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["overview", "privileges", "actions"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                            <div className="space-y-4">
                                <InfoRow icon={<User className="w-4 h-4" />} label="Full Name" value={profile?.name} />
                                <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={userData.email} />
                                <InfoRow icon={<MapPin className="w-4 h-4" />} label="Address" value={profile?.address} />
                                <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={profile?.contactNumber} />
                                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Joined" value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "privileges" && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Admin Privileges</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Full system access</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {["User Management", "Content Moderation", "Analytics Access", "System Settings"].map((privilege) => (
                                <div key={privilege} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{privilege}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "actions" && (
                    <div className="space-y-3">
                        <Link href="/admin/dashboard">
                            <button className="w-full p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-300 font-medium flex items-center justify-between">
                                <span>Go to Dashboard</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-400 font-medium flex items-center justify-between">
                            <span>View Analytics</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Last Updated */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Desktop Admin Profile Component
const DesktopAdminProfile = ({ userData }: AdminProfileProps) => {
    const { profile } = userData;

    return (
        <div className="hidden md:block">
            <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-950/50 overflow-hidden border border-gray-100 dark:border-gray-800">
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
                            <Link href={'/my-profile/update'}>
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-white/30">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </Link>

                            <div className="relative group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                {profile?.isSuper && (
                                    <div className="absolute -top-2 -right-2 group-hover:scale-110 transition-transform">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg border border-amber-300 dark:border-amber-500">
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
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
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
                                    label="Address"
                                    value={profile?.address || "Not provided"}
                                    gradient="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                                    iconColor="text-emerald-600 dark:text-emerald-400"
                                />
                                <InfoCard
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Contact Number"
                                    value={profile?.contactNumber || "Not provided"}
                                    gradient="from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                                    iconColor="text-amber-600 dark:text-amber-400"
                                />
                                <InfoCard
                                    icon={<Shield className="w-5 h-5" />}
                                    label="Admin Role"
                                    value={profile?.isSuper ? "Super Administrator" : "Administrator"}
                                    gradient="from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
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
                                    gradient="from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-900"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Admin Profile Component
export default function AdminProfile({ userData }: AdminProfileProps) {
    return (
        <section className="max-w-4xl mx-auto p-4">
            <MobileAdminProfile userData={userData} />
            <DesktopAdminProfile userData={userData} />
        </section>
    );
}