/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import TourImages from "./TourImages";
import { MapPin, Star, Clock, Users, TrendingUp, Heart, Eye, Calendar } from "lucide-react";

const TourCard = ({ tour }: any) => {
    return (
        <Link
            href={`/tours/${tour.id}`}
            className="group block"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <TourImages images={tour.images} />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {tour.isFeatured && (
                            <div className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                            </div>
                        )}
                        {tour.isActive === false && (
                            <div className="px-2 py-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs font-bold rounded-full">
                                Inactive
                            </div>
                        )}
                    </div>

                    {/* Bottom Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-white font-bold text-lg">${tour.price}</div>
                            <div className="flex items-center gap-1 text-white">
                                <Star className="w-4 h-4 fill-current text-yellow-400" />
                                <span className="font-bold">{tour.ratingsAverage?.toFixed(1) || '0.0'}</span>
                                <span className="text-sm opacity-90">({tour.ratingsQuantity || 0})</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                            <Eye className="w-5 h-5 text-gray-800" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75">
                            <Heart className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tour.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">
                            {tour.city}
                            {tour.country ? `, ${tour.country}` : ""}
                        </span>
                    </div>

                    {/* Tour Details */}
                    <div className="space-y-2 mb-4">
                        {tour.duration && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">{tour.duration}</span>
                            </div>
                        )}

                        {tour.maxGroupSize && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">Max {tour.maxGroupSize} people</span>
                            </div>
                        )}

                        {tour.startDates && tour.startDates.length > 0 && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">
                                    {new Date(tour.startDates[0]).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Category & Difficulty */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tour.category && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                {tour.category}
                            </span>
                        )}
                        {tour.difficulty && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tour.difficulty === 'easy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                                tour.difficulty === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                }`}>
                                {tour.difficulty}
                            </span>
                        )}
                    </div>

                    {/* Description Preview */}
                    {tour.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {tour.description}
                        </p>
                    )}

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-medium">ID: </span>
                            {tour.id?.slice(0, 8)}...
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <TrendingUp className="w-3 h-3" />
                            <span>{tour.bookings?.length || 0} bookings</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TourCard;