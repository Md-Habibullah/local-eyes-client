import { ArrowLeft, Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourByID } from '@/services/tours/getTourById';
import { BookingForm } from '@/components/bookings/BookingForm';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tour = await getTourByID(id);

    return {
        title: `Book ${tour?.title || 'Tour'} | Local Guides`,
        description: `Book this amazing tour experience with our local guide`,
    };
}

export default async function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tour = await getTourByID(id);

    if (!tour) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link href={`/tours/${id}`}>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Tour Details
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Your Tour</h1>
                    <p className="text-muted-foreground mb-8">
                        Complete your booking for an unforgettable experience
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Booking Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-linear-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <Calendar className="h-6 w-6 mr-2 text-primary" />
                                    Booking Details
                                </h2>

                                <BookingForm
                                    tourId={id}
                                    tourPrice={tour.price || 50}
                                    tourMaxGroupSize={tour.maxGroupSize || 10}
                                />
                            </div>

                            {/* Payment Information */}
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                                    Payment Information
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Your payment will be processed securely. You&apos;ll receive a confirmation email with all the details.
                                </p>
                                <div className="flex items-center text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Secure payment processing with SSL encryption
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tour Summary */}
                        <div className="space-y-6">
                            {/* Tour Card */}
                            <div className="bg-linear-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="font-bold text-lg mb-4">Tour Summary</h3>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-lg">{tour.title}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {tour.description || 'Amazing tour experience'}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Duration</span>
                                            <span className="font-medium">{tour.duration || '3 hours'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Max Group</span>
                                            <span className="font-medium">{tour.maxGroupSize || 10} people</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Language</span>
                                            <span className="font-medium">{tour.language || 'English'}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold">Price per person</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ${tour.price || 50}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Guide Info */}
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="font-bold text-lg mb-4">Your Guide</h3>

                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-linear-to-r from-primary to-pink-500 flex items-center justify-center text-white font-bold">
                                        {tour.guide?.name?.charAt(0) || 'G'}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{tour.guide?.name || 'Local Guide'}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {tour.guide?.rating ? `⭐ ${tour.guide.rating.toFixed(1)}` : 'Expert Guide'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cancellation Policy */}
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="font-bold text-lg mb-4">Cancellation Policy</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                        Free cancellation up to 24 hours before
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                        Full refund for weather cancellations
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                        Reschedule anytime up to 12 hours before
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}