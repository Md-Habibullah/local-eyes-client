/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getTours } from "@/services/tours/getTours";
import { AlertCircle, MapPin, Calendar, Users, DollarSign, Clock, Star, Globe, Tag, ImageIcon, Compass, Layers, TrendingUp } from "lucide-react";
import Image from "next/image";
import DeleteTourButton from "../../../../../components/modules/Tour/DeleteTourButton";

const AdminToursPage = async () => {
    const tours = await getTours();

    if (!tours) {
        return <EmptyState icon={AlertCircle} title="Failed to load tours." />;
    }

    if (tours && tours.error) {
        return <EmptyState icon={AlertCircle} title={tours.error} />;
    }

    // Calculate stats
    const uniqueDestinations = [...new Set(tours.map((t: any) => t.city))].length;
    const averagePrice = tours.length > 0
        ? Math.round(tours.reduce((sum: number, t: any) => sum + t.price, 0) / tours.length)
        : 0;
    const topRating = tours.length > 0
        ? Math.max(...tours.map((t: any) => t.ratingsAverage || 0)).toFixed(1)
        : '0.0';
    const activeTours = tours.filter((t: any) => t.isActive !== false).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/10 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                                    <Compass className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Tours Management
                                </h1>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                                Manage and monitor all tour packages in the system
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                                        <Layers className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{tours.length}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Tours</div>
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
                                    <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                    {uniqueDestinations}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destinations</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Unique locations</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                                    ${averagePrice}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg. Price</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Per tour average</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-xl">
                                    <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                                    {topRating}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Top Rated</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Highest rating</div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                                    {activeTours}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active Tours</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Currently available</div>
                        </div>
                    </div>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tours.map((tour: any) => (
                        <div
                            key={tour.id}
                            className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden flex flex-col h-full"
                        >
                            {/* Image Section - Fixed height */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 overflow-hidden">
                                {tour?.images?.[0] ? (
                                    <Image
                                        src={tour.images[0]}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                )}

                                {/* Price Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${tour.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${tour.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800/30' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600/30'}`}>
                                        {tour.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content Section - Flexible but consistent */}
                            <div className="p-5 flex-1 flex flex-col">
                                {/* Title and Category */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 h-14">
                                        {tour.title}
                                    </h3>
                                    {tour.category && (
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{tour.category}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span className="font-medium truncate">{tour.city}</span>
                                        {tour.country && (
                                            <span className="text-gray-500 dark:text-gray-400 truncate">, {tour.country}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Tour Details - Fixed height grid */}
                                <div className="mb-5 space-y-3">
                                    {tour.duration && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4 shrink-0" />
                                            <span className="text-sm">{tour.duration}</span>
                                        </div>
                                    )}

                                    {tour.maxGroupSize && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Users className="w-4 h-4 shrink-0" />
                                            <span className="text-sm">Max {tour.maxGroupSize} people</span>
                                        </div>
                                    )}

                                    {tour.ratingsAverage && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Star className="w-4 h-4 text-amber-500 fill-current shrink-0" />
                                            <span className="text-sm">
                                                <span className="font-semibold">{tour.ratingsAverage}</span>
                                                <span className="text-gray-400">/5</span>
                                                {tour.ratingsQuantity && (
                                                    <span className="text-gray-400 ml-1">({tour.ratingsQuantity})</span>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Description Preview - Fixed height */}
                                {tour.description && (
                                    <div className="mb-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex-1">
                                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">Description</div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                            {tour.description}
                                        </p>
                                    </div>
                                )}

                                {/* Delete Tour Button - Always at bottom */}
                                <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                    <DeleteTourButton
                                        tourId={tour.id}
                                        tourTitle={tour.title}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {tours.length === 0 && (
                    <div className="text-center py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">No Tours Available</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            There are currently no tours in the system. Tours will appear here once they are created.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminToursPage;