"use client";

import StatsCard from "@/components/shared/stats/StatsCard";
import {
    CalendarCheck,
    Clock,
    Heart,
    Star
} from "lucide-react";

interface TouristStatsProps {
    totalBookings: number;
    completedTours: number;
    wishlistCount: number;
    reviewsGiven: number;
}

const TouristStats = ({
    totalBookings,
    completedTours,
    wishlistCount,
    reviewsGiven,
}: TouristStatsProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Bookings"
                value={totalBookings}
                icon={CalendarCheck}
            />
            <StatsCard
                title="Completed Tours"
                value={completedTours}
                icon={Clock}
            />
            <StatsCard
                title="Wishlist"
                value={wishlistCount}
                icon={Heart}
            />
            <StatsCard
                title="Reviews Given"
                value={reviewsGiven}
                icon={Star}
            />
        </div>
    );
};

export default TouristStats;
