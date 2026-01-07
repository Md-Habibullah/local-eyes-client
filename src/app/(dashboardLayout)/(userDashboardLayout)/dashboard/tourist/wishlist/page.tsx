/* eslint-disable @typescript-eslint/no-explicit-any */
import RemoveWishlistButton from "@/components/modules/Home/RemoveWishlistButton";
import EmptyState from "@/components/shared/EmptyState";
import { getWishlist } from "@/services/tourist/getWishlist";
import { AlertCircle, Heart, MapPin, User, Star, Calendar, DollarSign, ArrowRight, Sparkles, Compass } from "lucide-react";
import Link from "next/link";

const WishlistPage = async () => {
    const wishlistRes = await getWishlist();
    const wishlist = wishlistRes.data;

    if (!wishlist.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-pink-950/20 p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-pink-600 dark:text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                            Save your favorite tours here to plan your next adventure!
                        </p>
                        <Link
                            href="/tours"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                        >
                            <Compass className="w-4 h-4" />
                            Explore Tours
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-pink-950/20 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                        My Wishlist
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Your saved adventures waiting to be experienced
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-pink-200 dark:border-pink-800/30">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-pink-500" />
                                    <span className="font-medium text-pink-600 dark:text-pink-400">
                                        <span className="text-amber-600 dark:text-amber-400">{wishlist.length}</span> saved tours
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {wishlist.length}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Category</p>
                                    <p className="text-lg font-bold mt-1 text-gray-900 dark:text-white">
                                        Adventure
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Price</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        ৳ 1,250
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Best Rated</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        4.8/5
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item: any) => (
                        <WishlistCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Action Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ready for Adventure?</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Turn your wishlist into reality. Book your dream tours now!
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/tours"
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                            >
                                <Compass className="w-4 h-4" />
                                Explore More Tours
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Separate component for Wishlist Card to fix type issues
interface WishlistCardProps {
    item: any;
}

const WishlistCard = ({ item }: WishlistCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-pink-300 dark:text-pink-700/50" />
                </div>
                {/* Remove Button - Wrap in div for styling */}
                <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <RemoveWishlistButton tourId={item.tour.id} />
                    </div>
                </div>
                {/* Tour Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-pink-700 dark:text-pink-300">
                        Popular
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Tour Title and Location */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {item.tour.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{item.tour.city}</span>
                    </div>
                </div>

                {/* Guide Info */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Guide</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {item.tour.guide.name}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-semibold text-gray-900 dark:text-white">4.8</span>
                            </div>
                            <p className="text-xs text-gray-500">Rating</p>
                        </div>
                    </div>
                </div>

                {/* Tour Details */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">3 hours</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">From</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">৳ 850</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link
                        href={`/tours/${item.tour.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity text-sm"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="px-4 py-3 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 text-blue-700 dark:text-blue-400 font-medium rounded-full border border-blue-200 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;