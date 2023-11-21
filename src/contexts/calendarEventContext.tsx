import { createContext, useState, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { ICalendarEvent } from "../features/calendar/types/types";
import { v4 as uuidv4 } from "uuid";
import { placeholderProjects } from "../features/calendar/hooks/useCalendarProjects";

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

interface ICalendarEventContext {
  events: ICalendarEvent[];
  getCalendarEvents: (weeks: Dayjs[]) => ICalendarEvent[];
  updateEvent: (event: ICalendarEvent) => void;
  addEvent: (event: ICalendarEvent) => void;
  deleteEvent: (event: ICalendarEvent) => void;
}

const CalendarEventContext = createContext<ICalendarEventContext | undefined>(undefined);

interface Props {
  children: JSX.Element;
}

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  const [events, setEvents] = useState(placeholderEvents);

  const getCalendarEvents = (weekDates: Dayjs[]): ICalendarEvent[] => {
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

  const value: ICalendarEventContext = {
    events,
    getCalendarEvents,
    updateEvent,
    addEvent,
    deleteEvent,
  };

  return (
    <CalendarEventContext.Provider value={value}>
      {children}
    </CalendarEventContext.Provider>
  );
};

export const useCalendarEvents = () => {
  const context = useContext(CalendarEventContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
