import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { ICalendarEvent } from "../types/types";
dayjs.extend(isSameOrAfter);

export const filterEvents = (
  events: ICalendarEvent[],
  startDate: Dayjs,
  endDate: Dayjs
): ICalendarEvent[] => {
  return events.filter((x) => {
    const eventDay = x.start.startOf("day");

    return eventDay.isSameOrAfter(startDate) && eventDay.isBefore(endDate);
  });
};
