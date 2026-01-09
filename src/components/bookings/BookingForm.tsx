'use client';

import { useState } from 'react';
import { Calendar, Users, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createBooking } from '@/services/bookings/createBooking';

interface BookingFormProps {
    tourId: string;
    tourPrice: number;
    tourMaxGroupSize: number;
}

export function BookingForm({
    tourId,
    tourPrice,
    tourMaxGroupSize
}: BookingFormProps) {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Calculate min date (tomorrow) and max date (1 year from now)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    const minDate = tomorrow.toISOString().split('T')[0];
    const maxDate = oneYearFromNow.toISOString().split('T')[0];

    // Calculate total price (moved to client component)
    const calculateTotalPrice = (people: number) => {
        return tourPrice * people;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date) {
            toast.error('Please select a date');
            return;
        }

        if (numberOfPeople < 1) {
            toast.error('Please select at least 1 person');
            return;
        }

        if (numberOfPeople > tourMaxGroupSize) {
            toast.error(`Maximum ${tourMaxGroupSize} people per booking`);
            return;
        }

        setIsLoading(true);

        try {
            const bookingData = {
                tourId,
                date,
                numberOfPeople,
            };

            const result = await createBooking(bookingData);

            toast.success('Booking confirmed! Redirecting to your booking...');

            // Redirect to booking confirmation page
            setTimeout(() => {
                router.push(`/dashboard/tourist/bookings/${result.id}`);
            }, 1500);

        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to create booking');
        } finally {
            setIsLoading(false);
        }
    };

    const totalPrice = calculateTotalPrice(numberOfPeople);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-3">
                <label className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Select Date
                </label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                    required
                    className="h-12 text-lg border-primary/20 focus:border-primary/40 bg-white/5"
                    disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                    Available dates from {minDate} to {maxDate}
                </p>
            </div>

            {/* Number of People */}
            <div className="space-y-3">
                <label className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Number of People
                </label>
                <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg border-primary/20 overflow-hidden">
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-12 px-4 border-r border-primary/20 rounded-none"
                            onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                            disabled={numberOfPeople <= 1 || isLoading}
                        >
                            -
                        </Button>
                        <div className="h-12 px-6 flex items-center justify-center min-w-12 font-bold text-lg">
                            {numberOfPeople}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-12 px-4 border-l border-primary/20 rounded-none"
                            onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                            disabled={numberOfPeople >= tourMaxGroupSize || isLoading}
                        >
                            +
                        </Button>
                    </div>
                    <span className="text-muted-foreground">
                        Max: {tourMaxGroupSize} people per booking
                    </span>
                </div>
            </div>

            {/* Price Summary */}
            <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <h4 className="font-bold text-lg mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Price Summary
                </h4>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            ${tourPrice} × {numberOfPeople} person{numberOfPeople > 1 ? 's' : ''}
                        </span>
                        <span className="font-medium">${tourPrice * numberOfPeople}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Service fee</span>
                        <span>$5.00</span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold text-primary">
                                ${totalPrice + 5}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading || !date}
                className="w-full h-14 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing Booking...
                    </>
                ) : (
                    'Confirm'
                )}
            </Button>

            {/* Security Note */}
            <p className="text-center text-sm text-muted-foreground">
                Your payment is secure and encrypted. By booking, you agree to our Terms of Service.
            </p>
        </form>
    );
}