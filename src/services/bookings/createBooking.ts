'use server';

import { serverFetch } from '@/lib/server-fetch';
import { revalidatePath } from 'next/cache';

interface CreateBookingParams {
    tourId: string;
    date: string;
    numberOfPeople: number;
}

export async function createBooking(data: CreateBookingParams) {
    try {
        console.log(data)
        const response = await serverFetch.post('/bookings', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create booking');
        }

        const result = await response.json();
        console.log("BookingResponse", result)

        revalidatePath("/dashboard/guide/bookings");
        revalidatePath("/dashboard/tour/bookings");

        return result.data;
    } catch (error) {
        console.error('Booking creation error:', error);
        throw error;
    }
}