import { createContext, useReducer } from "react";
import {
  CalendarEvent,
  ICalendarEventParallelEvents,
} from "../../features/calendar/types/types";
import { placeholderEvents } from "./placeholderEvents";
import dayjs from "dayjs";

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

interface ICalendarFiveMinuteSlot {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
  eventIds: string[];
}

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    events: placeholderEvents,
  });

  const mapEventsGroupedByFiveMinutes = () => {
    const eventsPerFiveMinutes: {
      [key: number]: ICalendarFiveMinuteSlot[];
    } = {};

    // 2. For each row, populate each calendar event that exists within that 5 minute window

    for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
      const events: ICalendarFiveMinuteSlot[] = [];

      const eventsToday = state.events.filter((x) => x.dayOfWeek === dayOfWeek);

      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
          const startTimeInSeconds = (hour * 60 + minute) * 60;
          const endTimeInSeconds = startTimeInSeconds + 300;

          const parallelEvents = eventsToday.filter((x) => {
            return (
              (endTimeInSeconds >= x.startTimeInSeconds &&
                endTimeInSeconds <= x.endTimeInSeconds) ||
              (startTimeInSeconds >= x.startTimeInSeconds &&
                startTimeInSeconds <= x.endTimeInSeconds)
            );
          });

          events.push({
            startTimeInSeconds,
            endTimeInSeconds,
            eventIds: parallelEvents.map((x) => x.id),
          });
        }
      }

      eventsPerFiveMinutes[dayOfWeek] = events;
    }

    return eventsPerFiveMinutes;
  };

  const findRowWithMostColumns = (rows: ICalendarFiveMinuteSlot[]) => {
    let largestRow: ICalendarFiveMinuteSlot = rows[0];

    if (rows.length > 1) {
      rows.forEach((row) => {
        if (row.eventIds.length > largestRow.eventIds.length) {
          largestRow = row;
        }
      });
    }

    return largestRow;
  };

  const mapParallelEventsToEventById = (eventsPerFiveMinutes: {
    [key: number]: ICalendarFiveMinuteSlot[];
  }) => {
    const parallelEventsById: {
      [key: string]: ICalendarEventParallelEvents;
    } = {};

    state.events.forEach((event) => {
      const containingRows = eventsPerFiveMinutes[event.dayOfWeek].filter(
        (x) => {
          const result =
            event.startTimeInSeconds < x.endTimeInSeconds &&
            event.endTimeInSeconds > x.startTimeInSeconds;

          return result;
        }
      );

      // find largest row
      const rowWithMostColumns = findRowWithMostColumns(containingRows);
      // const parallelIds = [...new Set(...containingRows.map(x => x.eventIds))].filter(x => x !== event.id)

        let parallelIds: string[] = []
        
        containingRows.forEach(row => {
          parallelIds.push(...row.eventIds.filter(x => x !== event.id))
        });

        parallelIds = [...new Set(parallelIds)]

        // const parallelIds: string[] = [
        //   ...containingRows.map(x => x.eventIds)
        // ]


      // console.log(containingRows.map(x => x.eventIds))
      // console.log({ parallelIds})

      const largestColumnCount = rowWithMostColumns.eventIds.length;

      parallelEventsById[event.id] = {
        columnCount: largestColumnCount,
        displayPosition:
          rowWithMostColumns.eventIds.length === 1
            ? 0
            : rowWithMostColumns.eventIds.indexOf(event.id),
            columnIds: [...parallelIds],
          columnCountOfOtherEvents: []
        // columnCountOfOtherEvents: rowWithMostColumns.map(x => x.)
      };
    });

    // calculate the column width of other columns
    Object.keys(parallelEventsById).forEach(key => {
      const event = parallelEventsById[key]

      event.columnCountOfOtherEvents = event.columnIds.map(id => {
        return parallelEventsById[id].columnCount
      })
      
    });

    return parallelEventsById;
  };

  const getEvents = () => {
    // 1. Create an object, for each day of week, add a row every 5 minutes
    const eventsPerFiveMinutes = mapEventsGroupedByFiveMinutes();

    /*
      Next, take an event. Find every 5 minute slot that the event exists in.
      The size of the event can be calculate by selecting the 5 minute slot with the most parallel columns
    */

    const parallelEventsById =
      mapParallelEventsToEventById(eventsPerFiveMinutes);

    return state.events.map((event) => {
      const parallelEvents = parallelEventsById[event.id];

      event.parallelEvents = parallelEvents;

      return event;
    });
  };

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
      events: getEvents(),
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
