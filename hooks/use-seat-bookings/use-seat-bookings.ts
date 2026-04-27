// import { Colors } from "@/constants/theme";
// import { useMemo, useState } from "react";

// const formatDateKey = (date: Date) => {
//   const year = date.getFullYear();
//   const month = `${date.getMonth() + 1}`.padStart(2, "0");
//   const day = `${date.getDate()}`.padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const getBookingDateKey = (booking: Record<string, any>) => {
//   const rawDate = booking.bookingDate || booking.date;

//   if (!rawDate || typeof rawDate !== "string") {
//     return null;
//   }

//   return rawDate.slice(0, 10);
// };

// const resolveBookingSeatReference = (booking: Record<string, any>) => {
//   const seatId = booking.seatId || booking.seat_id || booking.seat;
//   const seatNumber =
//     booking.seatNumber || booking.seat_number || booking.seatPosition;

//   return {
//     seatId: seatId ? `${seatId}` : null,
//     seatNumber: seatNumber ? `${seatNumber}` : null,
//   };
// };

// const resolveBookingName = (booking: Record<string, any>) => {
//   const rawName =
//     booking.name ||
//     booking.userName ||
//     booking.username ||
//     booking.bookedByName ||
//     booking.booked_by_name;

//   if (typeof rawName === "string" && rawName.trim()) {
//     return rawName.trim();
//   }

//   return "Booked";
// };

// export function useSeatBookings(bookings: Record<string, any>[]) {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const markedDates = useMemo(() => {
//     const uniqueDates = new Set<string>();

//     bookings.forEach((booking) => {
//       const bookingDate = booking.bookingDate || booking.date;

//       if (!bookingDate) {
//         return;
//       }

//       uniqueDates.add(bookingDate.slice(0, 10));
//     });

//     return Array.from(uniqueDates).map((date) => ({
//       date,
//       dots: [{ color: Colors.blue.text }],
//     }));
//   }, [bookings]);

//   const selectedDateKey = useMemo(
//     () => formatDateKey(selectedDate),
//     [selectedDate],
//   );

//   const bookingNameBySeatRef = useMemo(() => {
//     const bookingMap = new Map<string, string>();

//     bookings.forEach((booking) => {
//       const bookingDateKey = getBookingDateKey(booking);

//       if (bookingDateKey !== selectedDateKey) {
//         return;
//       }

//       const { seatId, seatNumber } = resolveBookingSeatReference(booking);
//       const bookingName = resolveBookingName(booking);

//       if (seatId) {
//         bookingMap.set(`id:${seatId}`, bookingName);
//       }

//       if (seatNumber) {
//         bookingMap.set(`num:${seatNumber}`, bookingName);
//       }
//     });

//     return bookingMap;
//   }, [bookings, selectedDateKey]);

//   const onDateSelected = (date: any) => {
//     if (date && typeof date.toDate === "function") {
//       setSelectedDate(date.toDate());
//       return;
//     }

//     setSelectedDate(new Date(date));
//   };

//   return {
//     selectedDate,
//     selectedDateKey,
//     markedDates,
//     bookingNameBySeatRef,
//     onDateSelected,
//   };
// }
