import { Moment } from "moment";

const unavailableDates = (date: Moment) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    date.isBefore(today, "day") ||
    date.isoWeekday() === 6 ||
    date.isoWeekday() === 7
  );
};

export default unavailableDates;
