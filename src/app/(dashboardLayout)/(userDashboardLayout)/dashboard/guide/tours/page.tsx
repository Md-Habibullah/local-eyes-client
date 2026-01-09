/* eslint-disable @typescript-eslint/no-explicit-any */
import TourCard from "@/components/modules/Tour/TourCard";
import EmptyState from "@/components/shared/EmptyState";
import { getMyTours } from "@/services/guide/getMyTours";
import { AlertCircle, MapPin, Plus, Filter, Search, Grid, List, Star, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

const ToursPage = async () => {
    const tours = await getMyTours()

    if (!tours || tours.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/20 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-blue-400 dark:text-blue-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tours Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        You haven&apos;t created any tours yet. Start by creating your first tour package.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all hover:shadow-lg">
                        <Plus className="w-5 h-5" />
                        <Link href={'/dashboard/guide/tours/create'}>
                            Create Your First Tour
                        </Link>
                    </button>
                </div>
            </div>
        );
    }

    if (tours && (tours as any).error) {
        return <EmptyState icon={AlertCircle} title={(tours as any).error} />;
    }

    // Calculate stats
    const totalEarnings = tours.reduce((sum: number, tour: any) => sum + (tour.price || 0), 0);
    const averageRating = tours.length > 0
        ? (tours.reduce((sum: number, tour: any) => sum + (tour.ratingsAverage || 0), 0) / tours.length).toFixed(1)
        : '0.0';
    const topDestination = tours.length > 0
        ? Object.entries(
            tours.reduce((acc: any, tour: any) => {
                acc[tour.city] = (acc[tour.city] || 0) + 1;
                return acc;
            }, {})
        ).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'None'
        : 'None';

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/20 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Explore Tours
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage and promote your tour packages
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <span className="font-medium text-blue-600 dark:text-blue-400">{tours.length}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Total Tours</span>
                            </div>
                            <Link
                                href="/dashboard/guide/tours/create"
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all hover:shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                Create Tour
                            </Link>
                        </div>
                    </div>

                    {/* Stats & Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${totalEarnings.toLocaleString()}
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {averageRating}/5
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Destination</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                        {topDestination}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {tours.filter((t: any) => t.isFeatured).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="search"
                                        placeholder="Search tours by title, location, or description..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                                <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <button className="p-2 rounded-lg bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400">
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tours.map((tour: any) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>

                {/* Load More */}
                {tours.length > 12 && (
                    <div className="text-center mt-8">
                        <button className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 transition-colors">
                            Load More Tours
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToursPage;