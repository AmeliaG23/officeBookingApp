import { Moment } from "moment";

const unavailableDates = (date: Moment) => {
  return date.isoWeekday() === 6 || date.isoWeekday() === 7;
};

export default unavailableDates;
