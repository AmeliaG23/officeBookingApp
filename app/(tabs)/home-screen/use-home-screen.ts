import { useBookings } from "@/hooks/use-bookings/use-bookings";
import { useSeats } from "@/hooks/use-seats/ use-seats";
import { useUser } from "@/hooks/use-user/use-user";
import currentDate from "@/utils/currentDate";
import { toUTCDateTime } from "@/utils/unavailable-booking-days/toUTCDateTime";
import { useMemo, useState } from "react";

export function useHomeScreen() {
  const [selectedDate, setSelectedDate] = useState(() =>
    toUTCDateTime(currentDate),
  );
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [isDeleteBookingModalVisible, setDeleteBookingModalVisible] =
    useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const { seats } = useSeats();
  const { allBookings, deleteBooking, createBooking } = useBookings();
  const { user } = useUser();

  const onDateSelected = (date: Date) => {
    setSelectedDate(toUTCDateTime(date));
  };

  const selectedDateKey = useMemo(
    () => selectedDate.toISOString().split("T")[0],
    [selectedDate],
  );

  const bookingBySeatRef = useMemo(() => {
    const bookingsForSelectedDate = allBookings.filter(
      (booking) =>
        String(booking.bookingDate).trim().slice(0, 10) === selectedDateKey,
    );

    const bookingMap = new Map<
      string,
      { name: string; userId: string; bookingId: string }
    >();

    bookingsForSelectedDate.forEach((booking) => {
      const seatRef = String(booking.seat).trim();
      const bookingName = String(booking.name).trim();
      const bookingUserId = String(booking.userId).trim();
      const bookingId = String(booking.$id).trim();

      if (seatRef) {
        bookingMap.set(seatRef, {
          name: bookingName,
          userId: bookingUserId,
          bookingId,
        });
        bookingMap.set(seatRef, {
          name: bookingName,
          userId: bookingUserId,
          bookingId,
        });
      }
    });

    return bookingMap;
  }, [allBookings, selectedDateKey]);

  // Sorts order of seats by seat number
  const sortedSeats = useMemo(
    () =>
      seats
        .map((seat) => {
          const seatIdRef = seat.$id;
          const seatNumberRef = String(seat.seatNumber).trim();
          const bookingInfo =
            bookingBySeatRef.get(seatIdRef) ??
            bookingBySeatRef.get(seatNumberRef);
          const isBookedByCurrentUser =
            bookingInfo?.userId === String(user?.$id);

          return {
            ...seat,
            isBooked: Boolean(bookingInfo),
            isBookedByCurrentUser,
            isBookedByUser: isBookedByCurrentUser,
            name: bookingInfo?.name,
            seatId: seat.$id,
            bookingId: bookingInfo?.bookingId ?? "",
          };
        })
        .filter((seat) => {
          const matchesFloor =
            !selectedFloor || String(seat.floorNumber).trim() === selectedFloor;
          const matchesTeam =
            !selectedTeam || String(seat.teamArea).trim() === selectedTeam;
          return matchesFloor && matchesTeam;
        })
        .sort((a, b) => Number(a.seatNumber ?? 0) - Number(b.seatNumber ?? 0)),
    [seats, bookingBySeatRef, selectedFloor, selectedTeam, user?.$id],
  );

  const floorOptions = useMemo(
    () =>
      [
        ...new Set(
          seats.map((seat) => String(seat.floorNumber).trim()).filter(Boolean),
        ),
      ]
        .sort((a, b) => Number(a) - Number(b))
        .map((floor) => ({ label: `Floor ${floor}`, value: floor })),
    [seats],
  );

  const teamOptions = useMemo(
    () =>
      [
        ...new Set(
          seats.map((seat) => String(seat.teamArea).trim()).filter(Boolean),
        ),
      ]
        .sort()
        .map((team) => ({ label: team, value: team })),
    [seats],
  );

  const onSeatSelected = (
    seatId: string,
    bookingId: string,
    isBooked: boolean,
    isBookedByUser: boolean,
  ) => {
    setSelectedSeatId(seatId);
    setSelectedBookingId(bookingId);
    if (!isBooked) {
      setBookingModalVisible(true);
    } else if (isBookedByUser) {
      setDeleteBookingModalVisible(true);
    }
  };

  const onBookSeatPressed = async () => {
    if (!selectedSeatId) {
      return;
    }

    await createBooking({
      seat: selectedSeatId,
      bookingDate: selectedDate.toISOString(),
      name: user?.name || "Unknown User",
      userId: user?.$id || "unknown_user_id",
    });
    setBookingModalVisible(false);
    setSelectedSeatId("");
  };

  const onDeleteBookingPressed = async () => {
    if (!selectedBookingId) {
      return;
    }

    await deleteBooking(selectedBookingId);
    setDeleteBookingModalVisible(false);
    setSelectedBookingId("");
  };

  return {
    selectedDate,
    sortedSeats,
    floorOptions,
    teamOptions,
    selectedFloor,
    setSelectedFloor,
    selectedTeam,
    setSelectedTeam,
    isBookingModalVisible,
    setBookingModalVisible,
    isDeleteBookingModalVisible,
    setDeleteBookingModalVisible,
    onDateSelected,
    onDeleteBookingPressed,
    selectedSeatId,
    setSelectedSeatId,
    selectedBookingId,
    setSelectedBookingId,
    onSeatSelected,
    onBookSeatPressed,
  };
}
