// import { useEffect, useMemo, useState } from "react";

// const getFloorValue = (seat: Record<string, any>) => {
//   return seat.floor_number;
// };

// const getTeamAreaValue = (seat: Record<string, any>) => {
//   return seat.team_name;
// };

// const getSeatNumber = (seat: Record<string, any>) => {
//   return seat.seat_number;
// };

// export function useSeatFilters(seats: Record<string, any>[]) {
//   const [selectedFloor, setSelectedFloor] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [isFloorOpen, setIsFloorOpen] = useState(false);
//   const [isAreaOpen, setIsAreaOpen] = useState(false);

//   const seatsForFloor = useMemo(
//     () =>
//       selectedFloor
//         ? seats.filter((seat) => getFloorValue(seat) === selectedFloor)
//         : seats,
//     [seats, selectedFloor],
//   );

//   const floorOptions = useMemo(() => {
//     return [...new Set(seats.map(getFloorValue).filter(Boolean))].sort(
//       (a, b) => Number(a) - Number(b),
//     );
//   }, [seats]);

//   useEffect(() => {
//     if (!selectedFloor && floorOptions.length > 0) {
//       setSelectedFloor(floorOptions[0]);
//     }
//   }, [floorOptions, selectedFloor]);

//   const areaOptions = useMemo(() => {
//     return [
//       ...new Set(seatsForFloor.map(getTeamAreaValue).filter(Boolean)),
//     ].sort((a, b) => a.localeCompare(b));
//   }, [seatsForFloor]);

//   useEffect(() => {
//     if (!selectedArea && areaOptions.length > 0) {
//       setSelectedArea(areaOptions[0]);
//       return;
//     }

//     if (selectedArea && !areaOptions.includes(selectedArea)) {
//       setSelectedArea(areaOptions[0] || "");
//     }
//   }, [areaOptions, selectedArea]);

//   const filteredSeats = useMemo(() => {
//     return seatsForFloor
//       .filter((seat) => {
//         return getTeamAreaValue(seat) === selectedArea;
//       })
//       .sort((seatA, seatB) => {
//         const aSeat = Number(getSeatNumber(seatA));
//         const bSeat = Number(getSeatNumber(seatB));

//         return aSeat - bSeat;
//       });
//   }, [seatsForFloor, selectedArea]);

//   return {
//     selectedFloor,
//     setSelectedFloor,
//     selectedArea,
//     setSelectedArea,
//     isFloorOpen,
//     setIsFloorOpen,
//     isAreaOpen,
//     setIsAreaOpen,
//     floorOptions,
//     areaOptions,
//     filteredSeats,
//     getSeatNumber,
//   };
// }
