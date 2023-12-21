import { createContext, useReducer } from "react";
import { CalendarEvent } from "../../features/calendar/types/types";
import { placeholderEvents } from "./placeholderEvents";
import { getEvents } from "./getEvents";

interface IEventState {
  events: CalendarEvent[];
}

interface ICalendarEventContext {
  state: IEventState;
  actions: {
    updateEvent: (event: CalendarEvent) => void;
    addEvent: (event: CalendarEvent) => void;
    deleteEvent: (event: CalendarEvent) => void;
  };
}

export const CalendarEventContext = createContext<
  ICalendarEventContext | undefined
>(undefined);

interface Props {
  children: JSX.Element;
}

// calendar event - add the following properties
// could be a domain class, idk

// To calculate parallel events
// startInMinutes
// endInMinutes

// To know which how many events line up, and change the width
// how can we automatically update these?
// Perhaps if we use useReducer, the reducer can also update the parallel events for these
// parallelEvents (either a number, or the list of events. But listing related events might be dificult. Unless we pass the ids)

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

  const value: ICalendarEventContext = {
    state: {
      events: getEvents(state.events),
    },
    actions: {
      updateEvent,
      addEvent,
      deleteEvent,
    },
  };

  return (
    <CalendarEventContext.Provider value={value}>
      {children}
    </CalendarEventContext.Provider>
  );
};
