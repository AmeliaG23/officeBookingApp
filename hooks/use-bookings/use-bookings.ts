import { BookingsContext } from "@/context/bookings-context";
import { useContext } from "react";

export function useBookings() {
  const context = useContext(BookingsContext);

  if (!context) {
    throw new Error("useBookings must be used within BookingsProvider");
  }

  return context;
}
