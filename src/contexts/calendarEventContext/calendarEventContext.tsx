import { createContext, useReducer } from "react";
import { CalendarEvent } from "../../features/calendar/types/types";
import { placeholderEvents } from "./placeholderEvents";
import { getEvents } from "./getEvents";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

interface IEventState {
  events: CalendarEvent[];
}

interface ICalendarEventContext {
  getAllEvents: () => CalendarEvent[];
  getEvents: (week: number) => CalendarEvent[];
  updateEvent: (event: CalendarEvent) => void;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (event: CalendarEvent) => void;
}

export const CalendarEventContext = createContext<
  ICalendarEventContext | undefined
>(undefined);

interface Props {
  children: JSX.Element;
}

type Action =
  | { type: "update_event"; event: CalendarEvent }
  | { type: "add_event"; event: CalendarEvent }
  | { type: "delete_event"; event: CalendarEvent };

const reducer = (state: IEventState, action: Action): IEventState => {
  switch (action.type) {
    case "update_event":
      return {
        ...state,
        events: state.events.map((x) =>
          x.id === action.event.id ? action.event : x
        ),
      };

    case "add_event":
      console.log("add event", action.event);
      return {
        ...state,
        events: [...state.events, action.event],
      };

    case "delete_event":
      return {
        ...state,
        events: [...state.events.filter((x) => x.id !== action.event.id)],
      };

    default:
      return state;
  }
};

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    events: placeholderEvents,
  });

  const updateEvent = (event: CalendarEvent) => {
    dispatch({
      type: "update_event",
      event,
    });
  };

  const addEvent = (event: CalendarEvent) => {
    dispatch({
      type: "add_event",
      event,
    });
  };

  const deleteEvent = (event: CalendarEvent) => {
    dispatch({
      type: "delete_event",
      event,
    });
  };

  const filterEvents = (week: number) => {
    const today = dayjs();

    const weeksMultiplier = 7 * week;

    const startOfWeek = today.startOf("week").add(1 + weeksMultiplier, "days");
    const endOfWeek = startOfWeek.add(7, "days");

    return state.events.filter((x) => {
      return (
        x.start.startOf("day").isSameOrAfter(startOfWeek) &&
        x.start.startOf("day").isBefore(endOfWeek)
      );
    });
  };

  const value: ICalendarEventContext = {
    updateEvent,
    addEvent,
    deleteEvent,
    getAllEvents: () => getEvents(state.events),
    getEvents: (week: number) => getEvents(filterEvents(week)),
  };

  return (
    <CalendarEventContext.Provider value={value}>
      {children}
    </CalendarEventContext.Provider>
  );
};
