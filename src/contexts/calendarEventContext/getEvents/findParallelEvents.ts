import { CalendarEvent } from "@/features/calendar/types/types";
import { ICalendarFiveMinuteSlot } from "./types";

export const findParallelEventsById = (
  events: CalendarEvent[],
  timeSlots: ICalendarFiveMinuteSlot[]
) => {
  const parallelEvents: {
    [key: string]: string[];
  } = {};

  events.forEach((event) => {
    parallelEvents[event.id] = findParallelEvents(event, timeSlots);
  });

  return parallelEvents;
};

const findParallelEvents = (
  event: CalendarEvent,
  timeSlots: ICalendarFiveMinuteSlot[]
) => {
  const timeSlotsContainingThisEvent = timeSlots.filter(
    (row) =>
      event.startTimeInSeconds < row.endTimeInSeconds &&
      event.endTimeInSeconds > row.startTimeInSeconds
  );

  // extract the parallelIds for each of these timeslots
  // giving us a list of all events that conflict with this event
  return timeSlotsContainingThisEvent.map((row) => row.eventIds).flat();
};
