import { getGuideEarnings } from "@/services/admin/getGuidesEarnings";
import Image from "next/image";

export default async function AdminGuideEarningsPage() {
    const guides = await getGuideEarnings();

    if (guides.length === 0) {
        return <p>No unpaid earnings found for verified guides.</p>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Guide Earnings</h1>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 text-left">Guide</th>
                        <th className="p-2 text-left">Daily Rate</th>
                        <th className="p-2 text-left">Pending Earnings</th>
                        <th className="p-2 text-left">Completed Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    {guides.map((g) => (
                        <tr key={g.guideId} className="border-t">
                            <td className="p-2 flex items-center gap-2">
                                {g.profilePhoto && (
                                    <Image
                                        src={g.profilePhoto}
                                        alt={g.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full object-cover"
                                    />
                                )}
                                {g.name}
                            </td>
                            <td className="p-2">${g.dailyRate}</td>
                            <td className="p-2">${g.totalUnpaidEarning}</td>
                            <td className="p-2">{g.totalCompletedBookings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
