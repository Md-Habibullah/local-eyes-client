/* eslint-disable @typescript-eslint/no-explicit-any */
import BlockGuideButton from "@/components/modules/Guide/BlockGuideButton";
import UnblockGuideButton from "@/components/modules/Guide/UnblockGuideButton";
import EmptyState from "@/components/shared/EmptyState";
import { getGuides } from "@/services/guide/getGuides";
import { AlertCircle, User, Mail, MapPin, Phone, Globe, Award, DollarSign, Star, Calendar, Users, CheckCircle, XCircle, Shield, Tag, Clock, Briefcase, Languages, Award as AwardIcon, Sparkles, BarChart3, Eye } from "lucide-react";
import Image from "next/image";

const GuidesPage = async () => {
    const guides = await getGuides();

    if (!guides) {
        return <EmptyState icon={AlertCircle} title="Failed to load guides." />;
    }

    if (guides && guides.error) {
        return <EmptyState icon={AlertCircle} title={guides.error} />;
    }

    // Calculate stats
    const totalGuides = guides.length || 0;
    const verifiedGuides = guides.filter((g: any) => g.isVerified).length;
    const activeGuides = guides.filter((g: any) => g.status === 'ACTIVE').length;
    const averageDailyRate = guides.length > 0
        ? guides.reduce((sum: number, g: any) => sum + (g.dailyRate || 0), 0) / guides.length
        : 0;

    // Get all languages from guides
    const allLanguages = guides.flatMap((g: any) => g.languages || []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/10 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Tour Guides Directory
                                </h1>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                                Professional guide management dashboard with comprehensive insights and controls
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalGuides}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Guides</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-xl">
                                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                    {verifiedGuides}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verified Guides</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Certified professionals</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-xl">
                                    <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                                    {activeGuides}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active Guides</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Currently available</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                                    ${averageDailyRate.toFixed(0)}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg. Daily Rate</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Per guide average</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl">
                                    <Languages className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                                    {[...new Set(allLanguages)].length}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Languages</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Unique language skills</div>
                        </div>
                    </div>
                </div>

                {/* Guides Grid - All cards will have same height */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide: any) => {
                        const statusConfig = {
                            'ACTIVE': {
                                bg: 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5',
                                text: 'text-emerald-700 dark:text-emerald-400',
                                border: 'border-emerald-500/20',
                                icon: <CheckCircle className="w-4 h-4" />
                            },
                            'INACTIVE': {
                                bg: 'bg-gradient-to-r from-gray-500/10 to-gray-500/5',
                                text: 'text-gray-700 dark:text-gray-400',
                                border: 'border-gray-500/20',
                                icon: <Clock className="w-4 h-4" />
                            },
                            'BLOCKED': {
                                bg: 'bg-gradient-to-r from-red-500/10 to-red-500/5',
                                text: 'text-red-700 dark:text-red-400',
                                border: 'border-red-500/20',
                                icon: <XCircle className="w-4 h-4" />
                            },
                        };

                        const statusStyle = statusConfig[guide.status as keyof typeof statusConfig] || statusConfig.ACTIVE;

                        return (
                            <div
                                key={guide.id}
                                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden flex flex-col h-full"
                            >
                                {/* Card content with consistent padding */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Profile Header - Fixed height */}
                                    <div className="flex items-start gap-4 mb-5">
                                        {/* Profile Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden border-3 border-white dark:border-gray-800 shadow-md">
                                                {guide.profilePhoto ? (
                                                    <Image
                                                        src={guide.profilePhoto}
                                                        alt={guide.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={`absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                                {statusStyle.icon}
                                                <span className="whitespace-nowrap">{guide.status || 'ACTIVE'}</span>
                                            </div>
                                        </div>

                                        {/* Guide Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                                        {guide.name || 'Unnamed Guide'}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                            {guide.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="px-2.5 py-1 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-lg border border-amber-500/20">
                                                        <div className="text-base font-bold text-amber-700 dark:text-amber-400">
                                                            ${guide.dailyRate || 0}
                                                        </div>
                                                        <div className="text-xs text-amber-600/70 dark:text-amber-400/70">per day</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Join Date and Verification */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>Joined {new Date(guide.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</span>
                                                </div>
                                                {guide.isVerified && (
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-full">
                                                        <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information - Consistent height */}
                                    <div className="mb-4">
                                        <div className="grid grid-cols-1 gap-2">
                                            {guide.address && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300 truncate">{guide.address}</span>
                                                </div>
                                            )}

                                            {guide.contactNumber && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300">{guide.contactNumber}</span>
                                                </div>
                                            )}

                                            {guide.gender && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300 capitalize">{guide.gender.toLowerCase()}</span>
                                                </div>
                                            )}

                                            {guide.rating && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        <span className="font-medium">{guide.rating}</span>
                                                        <span className="text-gray-500 ml-1">/5 rating</span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bio - Limited height with scroll if needed */}
                                    {guide.bio && (
                                        <div className="mb-4 flex-1 min-h-[60px] max-h-[80px] overflow-y-auto">
                                            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Bio</div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                                {guide.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* Skills Section - Consistent spacing */}
                                    <div className="mb-5 space-y-3">
                                        {/* Languages */}
                                        {guide.languages && guide.languages.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Languages className="w-3.5 h-3.5 text-blue-500" />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Languages</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {guide.languages.slice(0, 3).map((lang: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-500/20"
                                                        >
                                                            {lang}
                                                        </span>
                                                    ))}
                                                    {guide.languages.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                                            +{guide.languages.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Expertise */}
                                        {guide.expertise && guide.expertise.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AwardIcon className="w-3.5 h-3.5 text-purple-500" />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Expertise</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {guide.expertise.slice(0, 3).map((exp: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gradient-to-r from-purple-500/10 to-purple-500/5 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-500/20"
                                                        >
                                                            {exp}
                                                        </span>
                                                    ))}
                                                    {guide.expertise.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                                            +{guide.expertise.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer with Action Button - Always at bottom */}
                                    <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <Tag className="w-3 h-3" />
                                                <span className="font-mono">{guide.id.slice(0, 6)}...</span>
                                            </div>

                                            {/* Action Button - Always in same position */}
                                            <div className="w-32">
                                                {guide.user.status === 'ACTIVE' ? (
                                                    <BlockGuideButton
                                                        userId={guide.userId}
                                                        userName={guide.name || "Unnamed Guide"}
                                                    />
                                                ) : (
                                                    <UnblockGuideButton
                                                        userId={guide.userId}
                                                        userName={guide.name || "Unnamed Guide"}
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
                {guides.length === 0 && (
                    <div className="text-center py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                            <Briefcase className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">No Guides Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            There are currently no guide accounts registered in the system. Guides will appear here once they complete their registration.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidesPage;