/* eslint-disable @typescript-eslint/no-explicit-any */

import BlockGuideButton from "@/components/modules/Guide/BlockGuideButton";
import UnblockGuideButton from "@/components/modules/Guide/UnblockGuideButton";
import EmptyState from "@/components/shared/EmptyState";
import { getTourists } from "@/services/tourist/getTourists";
import { AlertCircle, User, Mail, MapPin, Phone, Globe, Heart, Calendar, Users, CheckCircle, XCircle, Tag, Clock, Languages, Sparkles, Shield } from "lucide-react";
import Image from "next/image";

const TouristsPage = async () => {
    const tourists = await getTourists();

    if (!tourists) {
        return <EmptyState icon={AlertCircle} title="Failed to load tourists." />;
    }

    if (tourists && tourists.error) {
        return <EmptyState icon={AlertCircle} title={tourists.error} />;
    }

    // Filter out only users who have tourist profiles
    const touristUsers = tourists.filter((t: any) => t.tourist);

    // Calculate stats from data
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/10 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Tourists
                                </h1>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                Manage and view all tourist profiles
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                                        {totalTourists}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Tourists
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
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
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
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
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Preferences</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {[...new Set(allPreferences)].length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tourists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {touristUsers.map((user: any) => {
                        const tourist = user.tourist;
                        if (!tourist) return null;

                        const statusConfig = {
                            'ACTIVE': {
                                bg: 'bg-emerald-100 dark:bg-emerald-900/20',
                                text: 'text-emerald-800 dark:text-emerald-300',
                                icon: <CheckCircle className="w-3 h-3" />
                            },
                            'INACTIVE': {
                                bg: 'bg-gray-100 dark:bg-gray-700',
                                text: 'text-gray-800 dark:text-gray-300',
                                icon: <Clock className="w-3 h-3" />
                            },
                            'BLOCKED': {
                                bg: 'bg-red-100 dark:bg-red-900/20',
                                text: 'text-red-800 dark:text-red-300',
                                icon: <XCircle className="w-3 h-3" />
                            },
                        };

                        const statusStyle = statusConfig[user.status as keyof typeof statusConfig] || statusConfig.ACTIVE;

                        return (
                            <div
                                key={user.id}
                                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full"
                            >
                                {/* Card Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Profile Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        {/* Profile Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-purple-100 dark:border-purple-900/30">
                                                {tourist.profilePhoto ? (
                                                    <Image
                                                        src={tourist.profilePhoto}
                                                        alt={tourist.name}
                                                        width={56}
                                                        height={56}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                                                        <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
                                                {statusStyle.icon}
                                            </div>
                                        </div>

                                        {/* Tourist Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">
                                                        {tourist.name || 'Unnamed Tourist'}
                                                    </h3>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <Mail className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 rounded text-xs font-medium text-purple-700 dark:text-purple-400 capitalize">
                                                        {user.role}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Join Date */}
                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-2 mb-4">
                                        {tourist.address && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300 truncate text-sm">{tourist.address}</span>
                                            </div>
                                        )}

                                        {tourist.contactNumber && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">{tourist.contactNumber}</span>
                                            </div>
                                        )}

                                        {tourist.gender && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm capitalize">{tourist.gender.toLowerCase()}</span>
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
                                    <div className="space-y-3 mb-5">
                                        {tourist.languages && tourist.languages.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Languages</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {tourist.languages.slice(0, 3).map((lang: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                                                        >
                                                            {lang}
                                                        </span>
                                                    ))}
                                                    {tourist.languages.length > 3 && (
                                                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                                            +{tourist.languages.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {tourist.preferences && tourist.preferences.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Heart className="w-3.5 h-3.5 text-pink-500" />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Preferences</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {tourist.preferences.slice(0, 3).map((pref: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-0.5 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-full text-xs"
                                                        >
                                                            {pref}
                                                        </span>
                                                    ))}
                                                    {tourist.preferences.length > 3 && (
                                                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                                            +{tourist.preferences.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer with Action Button */}
                                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Tag className="w-3 h-3" />
                                                <span className="font-mono">{user.id.slice(0, 6)}...</span>
                                            </div>

                                            {/* Action Button */}
                                            <div className="w-32">
                                                {user.status === 'ACTIVE' ? (
                                                    <BlockGuideButton
                                                        userId={user.id}
                                                        userName={tourist.name || "Unnamed Tourist"}
                                                    />
                                                ) : (
                                                    <UnblockGuideButton
                                                        userId={user.id}
                                                        userName={tourist.name || "Unnamed Tourist"}
                                                    />
                                                )}
                                            </div>
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tourists Found</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No tourist accounts have been created yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TouristsPage;