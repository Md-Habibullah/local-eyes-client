/* eslint-disable @typescript-eslint/no-explicit-any */
import WishlistButton from "@/components/modules/Home/WishlistButton";
import EmptyState from "@/components/shared/EmptyState";
import { checkWishlist } from "@/services/tourist/checkWishlist";
import { getTourByID } from "@/services/tours/getTourById";
import {
    AlertCircle,
    MapPin,
    Calendar,
    Users,
    Clock,
    DollarSign,
    Star,
    Award,
    Compass,
    Navigation,
    Shield,
    CheckCircle,
    Image as ImageIcon,
    MessageSquare,
    User,
    ArrowRight,
    Share2,
    BookOpen,
    Route,
    CalendarDays,
    Globe,
    Building,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { getCurrentUser } from "@/services/auth/getProfileData";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";
import DeleteTourButton from "@/components/modules/Tour/DeleteTourButton";
import TourImageGallery from "@/components/modules/Tour/TourImagesGallary";

export default async function TourDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const userInfo = await getUserInfo();
    const tour = await getTourByID(id);

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <EmptyState icon={AlertCircle} title="Tour not found" />
            </div>
        );
    }

    if (tour.error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <EmptyState icon={AlertCircle} title={tour.error} />
            </div>
        );
    }

    const userResponse = await getCurrentUser();
    const user = userResponse?.data;
    const role = user?.role;

    let wishlistExists = false;

    if (role === "TOURIST") {
        const wishlist = await checkWishlist(tour.id);
        wishlistExists = wishlist?.exists || false;
    }

    const isGuideOwner = role === "GUIDE" && tour?.guide?.id === user?.profile?.id;

    // Calculate average rating
    const averageRating = tour.reviews?.length > 0
        ? tour.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / tour.reviews.length
        : 0;

    // Format duration
    const formatDuration = (hours: number) => {
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;
            return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days} days`;
        }
        return `${hours} hours`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <Link href="/tours" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Tours
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium text-gray-900 dark:text-white">{tour?.city}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-500">{tour?.title}</span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tour Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            {/* Tour Title and Category */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 rounded-full">
                                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                {tour?.category}
                                            </span>
                                        </div>
                                        {tour?.isFeatured && (
                                            <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
                                                <span className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center gap-1">
                                                    <Star className="w-3 h-3" />
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                        {tour?.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {tour?.city}, {tour?.country}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-amber-500" />
                                            {averageRating.toFixed(1)} ({tour?.reviews?.length || 0} reviews)
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Key Highlights */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">${tour?.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                {formatDuration(tour?.duration || 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Group Size</p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                Up to {tour?.maxGroupSize}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">Daily</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Actions */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {/* 🎯 TOURIST - Wishlist Button */}
                                {role === "TOURIST" && (
                                    <WishlistButton
                                        tourId={tour.id}
                                        initialAdded={wishlistExists}
                                    />
                                )}

                                {/* 🎯 GUIDE (owner only) Edit Button */}
                                {isGuideOwner && (
                                    <Link
                                        href={`/tours/${tour.id}/edit`}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Edit Tour
                                    </Link>
                                )}

                                {/* Booking Button for Tourists */}
                                {role === "TOURIST" && (
                                    <Link
                                        href={`/bookings/${tour.id}`}
                                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Book Now
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tour Description</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {tour?.description}
                                </p>
                            </div>

                            {/* Itinerary */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Route className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Itinerary</h2>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {tour?.itinerary || "Detailed itinerary will be provided upon booking."}
                                </div>
                            </div>

                            {/* Meeting Point */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Navigation className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Meeting Point</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{tour?.meetingPoint}</p>
                            </div>
                            {isGuideOwner && (
                                <DeleteTourButton
                                    tourId={tour.id}
                                    tourTitle={tour.title} />
                            )}
                        </div>

                        {/* Image Gallery Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tour Gallery</h2>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {tour?.images?.length || 0} photos
                                </span>
                            </div>

                            {/* Use the Client Component */}
                            <TourImageGallery
                                images={tour?.images || []}
                                tourTitle={tour?.title || "Tour"}
                            />
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reviews</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {averageRating.toFixed(1)}
                                    </div>
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        ({tour?.reviews?.length || 0} reviews)
                                    </span>
                                </div>
                            </div>

                            {tour?.reviews?.length > 0 ? (
                                <div className="space-y-6">
                                    {tour.reviews.slice(0, 3).map((review: any) => (
                                        <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-200 to-sky-200 dark:from-blue-800/40 dark:to-sky-800/40"></div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {review.tourist?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="ml-auto flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review this tour!</p>
                                </div>
                            )}
                        </div>
                    </div>



                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Guide Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tour Guide</h2>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-800/40 dark:to-teal-800/40 flex items-center justify-center">
                                    <User className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{tour?.guide?.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional Guide</p>
                                    {tour?.guide?.dailyRate && (
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                            ${tour.guide.dailyRate}/day
                                        </p>
                                    )}
                                </div>
                            </div>

                            {tour?.guide?.bio && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {tour.guide.bio}
                                </p>
                            )}

                            {tour?.guide?.languages && tour.guide.languages.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tour.guide.languages.map((lang: string) => (
                                            <span
                                                key={lang}
                                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link
                                href={`/guides/${tour?.guide?.id}`}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                            >
                                View Profile
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Safety & Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                                <h3 className="font-bold text-gray-900 dark:text-white">Safety & Info</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Verified guide with local expertise</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Full refund 24 hours before tour</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Safety equipment provided</span>
                                </li>
                            </ul>
                        </div>

                        {/* Need Help Card */}
                        <div className="bg-gradient-to-br from-blue-900 to-sky-800 rounded-2xl shadow-xl p-6 text-white">
                            <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                            <p className="text-blue-100 mb-4">Our support team is here to help you with any questions.</p>
                            <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-sm font-medium">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}