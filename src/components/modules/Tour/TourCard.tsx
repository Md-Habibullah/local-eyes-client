/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import TourImages from "./TourImages";

const TourCard = ({ tour }: any) => {
    return (
        <Link
            href={`/tours/${tour.id}`}
            className="border rounded-lg p-4 hover:shadow transition"
        >
            <TourImages images={tour.images} />
            <h3 className="font-semibold">{tour.title}</h3>
            <p className="text-sm text-muted-foreground">
                {tour.city}
                {tour.country ? `, ${tour.country}` : ""}
            </p>
            <p className="font-bold mt-2">${tour.price}</p>
        </Link>
    );
};

export default TourCard;
