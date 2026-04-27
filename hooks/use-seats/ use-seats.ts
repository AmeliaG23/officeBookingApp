import { SeatsContext } from "@/context/seats-context";
import { useContext } from "react";

export function useSeats() {
  const context = useContext(SeatsContext);

  if (!context) {
    throw new Error("useSeats must be used within SeatsProvider");
  }

  return context;
}
