import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { CalendarEvent } from "../types/types";

dayjs.extend(isSameOrAfter);

export const filterEvents = (
  events: CalendarEvent[],
  startDate: Dayjs,
  endDate: Dayjs
): CalendarEvent[] => {
  return events.filter((x) => {
    const eventDay = x.start.startOf("day");

    return eventDay.isSameOrAfter(startDate) && eventDay.isBefore(endDate);
  });
};
