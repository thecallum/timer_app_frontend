import { CalendarEvent } from "@/features/calendar/types/types";
import { ICalendarFiveMinuteSlot, ParallelEventSlot } from "./types";
import { generateFiveMinuteSlots } from "./generateFiveMinuteSlots";

const fiveMinuteSlots = generateFiveMinuteSlots();

export const matchEventsToTimeSlots = (
  events: CalendarEvent[]
): ICalendarFiveMinuteSlot[] => {
  return fiveMinuteSlots.map((slot) => ({
    ...slot,
    // map events that occur within this timeslot
    eventIds: findParallelEvents(slot, events).map((x) => x.id),
  }));
};

const findParallelEvents = (
  slot: ParallelEventSlot,
  events: CalendarEvent[]
) => {
  return events.filter(
    (x) =>
      (slot.endTimeInSeconds >= x.startTimeInSeconds &&
        slot.endTimeInSeconds <= x.endTimeInSeconds) ||
      (slot.startTimeInSeconds >= x.startTimeInSeconds &&
        slot.startTimeInSeconds <= x.endTimeInSeconds)
  );
};
