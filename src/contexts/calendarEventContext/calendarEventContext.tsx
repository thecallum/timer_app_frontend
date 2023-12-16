import { createContext, useReducer } from "react";
import { CalendarEvent } from "../../features/calendar/types/types";
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

// enum DayOfWeek {
//   Sunday = 1,
//   Monday = 2,
//   Tuesday = 3,
//   Wednesday = 4,
//   Thursday = 5,
//   Friday = 6,
//   Saturday = 7,
// }

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    events: placeholderEvents,
  });

  const getEvents = () => {
    interface IGroupedEvent {
      startTimeInSeconds: number;
      endTimeInSeconds: number;
      columnCount: number;
    }

    const eventsPerFiveMinutes: {
      [key: number]: IGroupedEvent[];
    } = {};

    for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
    // for (const dayOfWeek in DayOfWeek) {
      const events: IGroupedEvent[] = [];

      const eventsToday = state.events.filter(
        (x) => x.dayOfWeek === dayOfWeek
      );

      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
          // const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

          // const parallelEvents: string[] = []

          // const now = dayjs();
          // const [hours, minutes] = timeString.split(':').map(Number);
          // const start = now.hour(hour).minute(minute).second(0).millisecond(0);
          // const end = start.add(5, "minute")

          // console.log({ start, end })

          const startTimeInSeconds = (hour * 60 + minute) * 60;
          const endTimeInSeconds = startTimeInSeconds + 300;

          // console.log(startTimeInSeconds, endTimeInSeconds)

          const parallelEvents = eventsToday
            .filter((x) => {
              return (
                (endTimeInSeconds >= x.startTimeInSeconds &&
                  endTimeInSeconds <= x.endTimeInSeconds) ||
                (startTimeInSeconds >= x.startTimeInSeconds &&
                  startTimeInSeconds <= x.endTimeInSeconds)
              );
            })
            // .filter(x => {
            //   return x.startTimeInSeconds >= startTimeInSeconds
            // })
            .map((x) => x.id);

          // timeEvents.push({ time: formattedTime, events: [] });

          events.push({
            startTimeInSeconds,
            endTimeInSeconds,
            columnCount: parallelEvents.length,
          });
        }
      }

      // console.log({ dayOfWeek }, DayOfWeek[dayOfWeek]);

      eventsPerFiveMinutes[dayOfWeek] = events;
      // eventsPerFiveMinutes[dayOfWeek] = events

      // = events;

    }
    console.log({ eventsPerFiveMinutes: eventsPerFiveMinutes })
    // console.log({ eventsPerFiveMinutes: eventsPerFiveMinutes[DayOfWeek.Monday]})

    // =======================

    const parallelEventsById: {
      [key: string]: {
        events: string[];
        columnCount: number;
      };
    } = {};

    // 1. Calculate parallel events
    state.events.forEach((event) => {
      const parallelEvents = state.events
        .filter((x) => x.dayOfWeek === event.dayOfWeek) // same column
        .filter((x) => {
          return (
            (event.endTimeInSeconds >= x.startTimeInSeconds &&
              event.endTimeInSeconds <= x.endTimeInSeconds) ||
            (event.startTimeInSeconds >= x.startTimeInSeconds &&
              event.startTimeInSeconds <= x.endTimeInSeconds)
          );
        });

      const eventsById = parallelEvents.map((x) => x.id);

      // 2. Work out the expected width

      // not expected width, column count (use highest common denominator)
      // const yee =
      // filter all of the rows that contain this event

      // DayOfWeek[dayOfWeek as keyof typeof DayOfWeek]

      // const dow = DayOfWeek[event.dayOfWeek]
      // const dow = DayOfWeek[DayOfWeek[event.dayOfWeek] as keyof typeof DayOfWeek]

      const containingRows = eventsPerFiveMinutes[event.dayOfWeek]
      .filter(
        (x) => {

          const result =  (
event.startTimeInSeconds < x.endTimeInSeconds && event.endTimeInSeconds > x.startTimeInSeconds
            
            // (event.endTimeInSeconds >= x.startTimeInSeconds &&
            //   event.endTimeInSeconds <= x.endTimeInSeconds) ||
            // (event.startTimeInSeconds >= x.startTimeInSeconds &&
            //   event.startTimeInSeconds <= x.endTimeInSeconds)
          );

          // console.log(event.description, event.startTimeInSeconds, x.startTimeInSeconds, result)

          return result;
        }
      )
      // .map(x => x.columnCount)

      const largestColumnCount = Math.max(...containingRows.map(x => x.columnCount))

      console.log(event.description, { largestColumnCount, containingRows });

      // const expectedWidth = 1 / eventsById.length;

      // 3. Work out allocated width (if left over space, use that)

      parallelEventsById[event.id] = {
        events: eventsById,
        columnCount: largestColumnCount
        // expectedWidth: 1 / largestColumnCount,
      };
    });

    return state.events.map((event) => {
      const parallelEvents = parallelEventsById[event.id];

      // calculate initial width fraction
      // const widthFraction = 1 / parallelEvents.length;

      // map ids
      // event.
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
