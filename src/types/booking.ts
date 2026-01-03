export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Booking {
    id: string;
    tour: {
        id: string;
        title: string;
        location: string;
    };
    date: string;
    status: BookingStatus;
    totalPrice: number;
}
