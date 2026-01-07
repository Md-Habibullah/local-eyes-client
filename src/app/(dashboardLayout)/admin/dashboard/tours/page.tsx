/* eslint-disable @typescript-eslint/no-explicit-any */

import EmptyState from "@/components/shared/EmptyState";
import { getTours } from "@/services/tours/getTours";
import { AlertCircle, MapPin, Calendar, Users, DollarSign, Clock, Star, Globe, Tag } from "lucide-react";

const AdminToursPage = async () => {
    const tours = await getTours();

    if (!tours) {
        return <EmptyState icon={AlertCircle} title="Failed to load tours." />;
    }

    if (tours && tours.error) {
        return <EmptyState icon={AlertCircle} title={tours.error} />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                All Tours
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and view all available tour packages
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-blue-600 dark:text-blue-400">{tours.length}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Tours</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Destinations</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {[...new Set(tours.map((t: any) => t.city))].length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Price</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${tours.length > 0 ? Math.round(tours.reduce((sum: number, t: any) => sum + t.price, 0) / tours.length) : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Rated</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {tours.length > 0 ? Math.max(...tours.map((t: any) => t.ratingsAverage || 0)).toFixed(1) : '0.0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Tours</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {tours.filter((t: any) => t.isActive !== false).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tours.map((tour: any) => (
                        <div
                            key={tour.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 overflow-hidden">
                                {tour.image ? (
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MapPin className="w-12 h-12 text-blue-300 dark:text-blue-600" />
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
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tour.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                        {tour.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Title and Category */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
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
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-4">
                                    <MapPin className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{tour.city}</span>
                                    {tour.country && (
                                        <span className="text-gray-500 dark:text-gray-400">, {tour.country}</span>
                                    )}
                                </div>

                                {/* Tour Details */}
                                <div className="space-y-3 mb-6">
                                    {tour.duration && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm">{tour.duration}</span>
                                        </div>
                                    )}

                                    {tour.maxGroupSize && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Users className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm">Max {tour.maxGroupSize} people</span>
                                        </div>
                                    )}

                                    {tour.ratingsAverage && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                                            <span className="text-sm">
                                                <span className="font-semibold">{tour.ratingsAverage}</span>
                                                <span className="text-gray-400">/5</span>
                                                {tour.ratingsQuantity && (
                                                    <span className="text-gray-400 ml-1">({tour.ratingsQuantity} reviews)</span>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Description Preview */}
                                {tour.description && (
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {tour.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {tours.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tours Available</h3>
                        <p className="text-gray-500 dark:text-gray-400">Create your first tour to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminToursPage;