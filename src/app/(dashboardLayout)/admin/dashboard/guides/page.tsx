/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from "@/components/shared/EmptyState";
import { getGuides } from "@/services/guide/getGuides";
import { AlertCircle, User, Mail, MapPin, Phone, Globe, Award, DollarSign, Star, Calendar, Users, CheckCircle, XCircle, Shield, Tag, Clock } from "lucide-react";
import Image from "next/image";

const GuidesPage = async () => {
    const guides = await getGuides();

    if (!guides) {
        return <EmptyState icon={AlertCircle} title="Failed to load guides." />;
    }

    if (guides && guides.error) {
        return <EmptyState icon={AlertCircle} title={guides.error} />;
    }

    // Filter out only users who have guide profiles
    const guideUsers = guides.filter((g: any) => g.guide);

    // Calculate stats from data (no logic changes, just display calculations)
    const totalGuides = guideUsers.length;
    const verifiedGuides = guideUsers.filter((g: any) => g.guide?.isVerified).length;
    const activeGuides = guideUsers.filter((g: any) => g.status === 'ACTIVE').length;
    const averageDailyRate = guideUsers.length > 0
        ? guideUsers.reduce((sum: number, g: any) => sum + (g.guide?.dailyRate || 0), 0) / guideUsers.length
        : 0;

    // Get all languages from guide profiles
    const allLanguages = guideUsers.flatMap((g: any) => g.guide?.languages || []);
    const allExpertise = guideUsers.flatMap((g: any) => g.guide?.expertise || []);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Guides
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and view all tour guide profiles
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-blue-600 dark:text-blue-400">{totalGuides}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Guides</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Verified Guides</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {verifiedGuides}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Guides</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {activeGuides}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Daily Rate</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${averageDailyRate.toFixed(0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {[...new Set(allLanguages)].length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guideUsers.map((user: any) => {
                        const guide = user.guide;
                        if (!guide) return null;

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
                                            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-100 dark:border-blue-900/30">
                                                {guide.profilePhoto ? (
                                                    <Image
                                                        src={guide.profilePhoto}
                                                        alt={guide.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1">
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
                                                    {statusStyle.icon}
                                                    <span>{user.status}</span>
                                                </div>
                                            </div>
                                            {guide.isVerified && (
                                                <div className="absolute -top-1 -left-1">
                                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <Shield className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Basic Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {guide.name || 'Unnamed Guide'}
                                                </h3>
                                                <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                                    <span className="font-bold text-amber-700 dark:text-amber-300">
                                                        ${guide.dailyRate || 0}
                                                    </span>
                                                    <span className="text-xs text-amber-600 dark:text-amber-400 ml-1">/day</span>
                                                </div>
                                            </div>
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
                                        {guide.address && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm truncate">{guide.address}</span>
                                            </div>
                                        )}

                                        {guide.contactNumber && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Phone className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm">{guide.contactNumber}</span>
                                            </div>
                                        )}

                                        {guide.gender && (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <User className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm capitalize">{guide.gender.toLowerCase()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    {guide.bio && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {guide.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* Languages & Expertise */}
                                    <div className="space-y-3">
                                        {guide.languages && guide.languages.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Globe className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Languages</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {guide.languages.map((lang: string, index: number) => (
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

                                        {guide.expertise && guide.expertise.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Award className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {guide.expertise.map((exp: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs"
                                                        >
                                                            {exp}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                {guide.isVerified ? (
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                                        <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Verified Guide</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                        <Clock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Unverified</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Tag className="w-3 h-3 text-gray-400" />
                                                <span className="text-gray-600 dark:text-gray-400">ID:</span>
                                                <span className="font-mono text-gray-800 dark:text-gray-300">
                                                    {user.id.slice(0, 8)}...
                                                </span>
                                            </div>
                                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
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
                {guideUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Guides Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">No guide accounts have been created yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidesPage;