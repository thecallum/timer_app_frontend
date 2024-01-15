import { CalendarEvent } from "@/features/calendar/types/types";

export const groupEventsByDayOfWeek = (allEvents: CalendarEvent[]) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = [[], [], [], [], [], [], []];

  allEvents.forEach((event) => {
    eventsPerDayOfWeek[event.dayOfWeek - 1].push(event);
  });

  return eventsPerDayOfWeek;
};
