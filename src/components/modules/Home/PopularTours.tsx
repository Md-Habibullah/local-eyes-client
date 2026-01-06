/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

const PopularTours = async () => {
    const res = await serverFetch.get("/tours?limit=3", {
        cache: "no-store",
    });
    const tours = (await res.json()).data || [];

    return (
        <section className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Popular Tours</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {tours.map((tour: any) => (
                    <div
                        key={tour.id}
                        className="border rounded-lg p-4"
                    >
                        <h3 className="font-semibold">{tour.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {tour.location}
                        </p>
                        <p className="font-bold mt-2">${tour.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularTours;
