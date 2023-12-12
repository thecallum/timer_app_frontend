import { createContext, useState } from "react";
import { ICalendarEvent } from "../../features/calendar/types/types";
import { placeholderEvents } from "./placeholderEvents";

interface ICalendarEventContext {
  events: ICalendarEvent[];
  updateEvent: (event: ICalendarEvent) => void;
  addEvent: (event: ICalendarEvent) => void;
  deleteEvent: (event: ICalendarEvent) => void;
}

export const CalendarEventContext = createContext<ICalendarEventContext | undefined>(
  undefined
);

interface Props {
  children: JSX.Element;
}

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  const [events, setEvents] = useState(placeholderEvents);

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
