import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { ICalendarEvent } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { placeholderProjects } from "./useCalendarProjects";

dayjs.extend(isSameOrAfter);

const placeholderEvents: ICalendarEvent[] = [
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Tue Nov 07 2023 01:15:53 GMT+0000"),
    end: dayjs("Tue Nov 07 2023 03:15:00 GMT+0000"),
    project: placeholderProjects[0],
  },
  {
    id: uuidv4(),
    description: "Standup meeting",
    start: dayjs("Thu Nov 09 2023 03:30:53 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 05:02:28 GMT+0000"),
    project: placeholderProjects[1],
  },
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Thu Nov 09 2023 07:12:06 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 09:04:28 GMT+0000"),
    project: placeholderProjects[2],
  },
];

export const useCalendarEvents = (weekDates: Dayjs[]) => {
  const [events, setEvents] = useState(placeholderEvents);

  const getCalendarEvents = (): ICalendarEvent[] => {
    const startOfWeek = weekDates[0];
    const endOfWeek = weekDates[6];

    return events.filter((x) => {
      const eventDay = x.start.startOf("day");

      return (
        eventDay.isSameOrAfter(startOfWeek) && eventDay.isBefore(endOfWeek)
      );
    });
  };

  const updateEvent = (event: ICalendarEvent) => {
    setEvents((currentState) => {
      return currentState.slice().map((x) => (x.id === event.id ? event : x));
    });
  };

  const addEvent = (event: ICalendarEvent) => {
    setEvents((currentState) => {
      return [...currentState, event];
    });
  };

  const deleteEvent = (event: ICalendarEvent) => {
    setEvents((currentState) => {
      return [...currentState].filter((x) => x.id !== event.id);
    });
  };

  return {
    events: getCalendarEvents(),
    allEvents: events,
    updateEvent,
    addEvent,
    deleteEvent
  };
};
