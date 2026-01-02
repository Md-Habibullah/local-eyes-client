// import { Booking } from "@/types";
// import StatusBadge from "@/components/shared/stats/StatusBadge";

// interface RecentBookingsProps {
//     bookings: Booking[];
// }

// {/* <EmptyState
//     title="No bookings yet"
//     description="Start exploring tours and book your first experience."
//     icon={CalendarCheck}
//     actionLabel="Browse Tours"
//     onAction={() => router.push("/tours")}
// /> */}

// const RecentBookings = ({ bookings }: RecentBookingsProps) => {
//     return (
//         <div className="rounded-lg border">
//             <table className="w-full text-sm">
//                 <thead>
//                     <tr className="border-b bg-muted">
//                         <th className="p-3 text-left">Tour</th>
//                         <th className="p-3">Date</th>
//                         <th className="p-3">Status</th>
//                         <th className="p-3">Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking) => (
//                         <tr key={booking.id} className="border-b">
//                             <td className="p-3">{booking.tour.title}</td>
//                             <td className="p-3">
//                                 {new Date(booking.date).toLocaleDateString()}
//                             </td>
//                             <td className="p-3 text-center">
//                                 <StatusBadge status={booking.status} />
//                             </td>
//                             <td className="p-3 text-right">
//                                 ${booking.totalAmount}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default RecentBookings;
