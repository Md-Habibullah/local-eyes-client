/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Shield, Mail, MapPin, Phone, User, Crown, Calendar } from "lucide-react";

type AdminProfileProps = {
    userData: any;
};

export default function AdminProfile({ userData }: AdminProfileProps) {
    const { profile } = userData;

    return (
        <section className="max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
                            <p className="text-blue-100 mt-1">Platform Administrator Details</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                                {profile?.profilePhoto ? (
                                    <Image
                                        src={profile.profilePhoto}
                                        alt={profile.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <User className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                                    </div>
                                )}
                            </div>
                            {profile?.isSuper && (
                                <div className="absolute -top-2 -right-2">
                                    <div className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                        <Crown className="w-3 h-3" />
                                        Super Admin
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoItem
                                    icon={<User className="w-5 h-5" />}
                                    label="Name"
                                    value={profile?.name || "-"}
                                    className="bg-blue-50 dark:bg-blue-900/20"
                                />
                                <InfoItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email"
                                    value={userData.email}
                                    className="bg-purple-50 dark:bg-purple-900/20"
                                />
                                <InfoItem
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Address"
                                    value={profile?.address || "-"}
                                    className="bg-emerald-50 dark:bg-emerald-900/20"
                                />
                                <InfoItem
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Contact"
                                    value={profile?.contactNumber || "-"}
                                    className="bg-amber-50 dark:bg-amber-900/20"
                                />
                                <InfoItem
                                    icon={<Shield className="w-5 h-5" />}
                                    label="Role"
                                    value={userData.role}
                                    className="bg-indigo-50 dark:bg-indigo-900/20"
                                />
                                <InfoItem
                                    icon={<Calendar className="w-5 h-5" />}
                                    label="Joined"
                                    value={new Date(profile?.createdAt).toLocaleDateString()}
                                    className="bg-gray-50 dark:bg-gray-800"
                                />
                            </div>

                            {/* Admin Badge */}
                            <div className="mt-8 p-4 bg-linear-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                                            {profile?.isSuper ? "Super Administrator" : "Platform Administrator"}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Full system access and management privileges
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InfoItem = ({ icon, label, value, className }: any) => (
    <div className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 ${className}`}>
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{value}</p>
    </div>
);