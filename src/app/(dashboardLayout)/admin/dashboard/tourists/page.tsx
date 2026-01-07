/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getTourists } from "@/services/tourist/getTourists";
import { AlertCircle, User, Mail, MapPin, Phone, Globe, Heart, Calendar, Users, CheckCircle, XCircle, Tag, Clock } from "lucide-react";
import Image from "next/image";

const TouristsPage = async () => {
    const tourists = await getTourists();
    console.log(tourists)

    if (!tourists) {
        return <EmptyState icon={AlertCircle} title="Failed to load tourists." />;
    }

    if (tourists && tourists.error) {
        return <EmptyState icon={AlertCircle} title={tourists.error} />;
    }

    // Filter out only users who have tourist profiles
    const touristUsers = tourists.filter((t: any) => t.tourist);

    // Calculate stats from data (no logic changes, just display calculations)
    const totalTourists = touristUsers.length;
    const activeTourists = touristUsers.filter((t: any) => t.status === 'ACTIVE').length;
    const newThisMonth = touristUsers.filter((t: any) => {
        const joinDate = new Date(t.createdAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));
        return daysDiff <= 30;
    }).length;

    // Get all languages from tourist profiles
    const allLanguages = touristUsers.flatMap((t: any) => t.tourist?.languages || []);
    const allPreferences = touristUsers.flatMap((t: any) => t.tourist?.preferences || []);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950/20 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Tourists
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and view all tourist profiles
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-purple-600 dark:text-purple-400">{totalTourists}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Tourists</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Tourists</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {activeTourists}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">New This Month</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {newThisMonth}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {[...new Set(allLanguages)].length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Preferences</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {[...new Set(allPreferences)].length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tourists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {touristUsers.map((user: any) => {
                        const tourist = user.tourist;
                        if (!tourist) return null;

                        const statusConfig = {
                            'ACTIVE': {
                                bg: 'bg-emerald-100 dark:bg-emerald-900/20',
                                text: 'text-emerald-800 dark:text-emerald-300',
                                icon: <CheckCircle className="w-4 h-4" />
                            },
                            'INACTIVE': {
                                bg: 'bg-gray-100 dark:bg-gray-700',
                                text: 'text-gray-800 dark:text-gray-300',
                                icon: <Clock className="w-4 h-4" />
                            },
                            'BLOCKED': {
                                bg: 'bg-red-100 dark:bg-red-900/20',
                                text: 'text-red-800 dark:text-red-300',
                                icon: <XCircle className="w-4 h-4" />
                            },
                        };

                        const statusStyle = statusConfig[user.status as keyof typeof statusConfig] || statusConfig.ACTIVE;

                        return (
                            <div
                                key={user.id}
                                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
                            >
                                {/* Profile Header */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        {/* Profile Image */}
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-100 dark:border-purple-900/30">
                                                {tourist.profilePhoto ? (
                                                    <Image
                                                        src={tourist.profilePhoto}
                                                        alt={tourist.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1">
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
                                                    {statusStyle.icon}
                                                    <span>{user.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Basic Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                {tourist.name || 'Unnamed Tourist'}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-sm truncate">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-3 mb-4">
                                        {tourist.address && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm truncate">{tourist.address}</span>
                                            </div>
                                        )}

                                        {tourist.contactNumber && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Phone className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm">{tourist.contactNumber}</span>
                                            </div>
                                        )}

                                        {tourist.gender && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <User className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm capitalize">{tourist.gender.toLowerCase()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    {tourist.bio && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {tourist.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* Languages & Preferences */}
                                    <div className="space-y-3">
                                        {tourist.languages && tourist.languages.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Globe className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Languages</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {tourist.languages.map((lang: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                                                        >
                                                            {lang}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {tourist.preferences && tourist.preferences.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Heart className="w-4 h-4 text-pink-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferences</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {tourist.preferences.map((pref: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-full text-xs"
                                                        >
                                                            {pref}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* User Info Footer */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <Tag className="w-3 h-3 text-gray-400" />
                                                <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                                                <span className="font-mono text-gray-800 dark:text-gray-300">
                                                    {user.id.slice(0, 8)}...
                                                </span>
                                            </div>
                                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {touristUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tourists Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">No tourist accounts have been created yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TouristsPage;