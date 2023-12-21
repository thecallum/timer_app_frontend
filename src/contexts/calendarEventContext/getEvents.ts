import {
  CalendarEvent,
  ICalendarEventParallelEvents,
} from "@/features/calendar/types/types";
import next from "next";

interface ICalendarFiveMinuteSlot {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
  eventIds: string[];
}

const generateFiveMinuteSlots = () => {
  const slots = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const startTimeInSeconds = (hour * 60 + minute) * 60;
      const endTimeInSeconds = startTimeInSeconds + 300;

      slots.push({ startTimeInSeconds, endTimeInSeconds });
    }
  }

  return slots;
};

const findParallelEvents = (
  slot: { startTimeInSeconds: number; endTimeInSeconds: number },
  events: CalendarEvent[]
) => {
  return events.filter((x) => {
    return (
      (slot.endTimeInSeconds >= x.startTimeInSeconds &&
        slot.endTimeInSeconds <= x.endTimeInSeconds) ||
      (slot.startTimeInSeconds >= x.startTimeInSeconds &&
        slot.startTimeInSeconds <= x.endTimeInSeconds)
    );
  });
};

const mapEventsGroupedByFiveMinutes = (allEvents: CalendarEvent[]) => {
  const slots = generateFiveMinuteSlots();

  return slots.map((slot) => ({
    ...slot,
    eventIds: findParallelEvents(slot, allEvents).map((x) => x.id),
  }));
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

const findContainingRows = (
  event: CalendarEvent,
  eventsPerFiveMinutes: ICalendarFiveMinuteSlot[]
) => {
  return eventsPerFiveMinutes.filter(
    (row) =>
      event.startTimeInSeconds < row.endTimeInSeconds &&
      event.endTimeInSeconds > row.startTimeInSeconds
  );
};

function getParallelIds(containingRows: ICalendarFiveMinuteSlot[]) {
  const parallelIds = containingRows.map((row) => row.eventIds).flat();
  return [...new Set(parallelIds)];
}

const mapParallelEventsToEventById = (
  allEvents: CalendarEvent[],
  eventsPerFiveMinutes: ICalendarFiveMinuteSlot[]
) => {
  const parallelEventsById: {
    [key: string]: ICalendarEventParallelEvents;
  } = {};

  const maxRows = findRowWithMostColumns(eventsPerFiveMinutes);

  allEvents.forEach((event) => {
    const containingRows = findContainingRows(event, eventsPerFiveMinutes);

    // find largest row
    const rowWithMostColumns = findRowWithMostColumns(containingRows);
    const largestColumnCount = rowWithMostColumns.eventIds.length;

    const parallelIds = getParallelIds(containingRows);

    parallelEventsById[event.id] = {
      columnCount: largestColumnCount,
      columnIds: [...parallelIds],
      left: 0,
      displayPosition: 0,
      width: 1 / maxRows.eventIds.length,
    };
  });

  allEvents
    .sort((a, b) => a.startTimeInSeconds - b.startTimeInSeconds)
    .forEach(({ id }) => {
      const event = parallelEventsById[id];

      const eventsByDisplayPosition: {
        [key: number]: ICalendarEventParallelEvents;
      } = event.columnIds.reduce((obj, id) => {
        const event = parallelEventsById[id];

        return {
          ...obj,
          [event.displayPosition]: event,
        };
      }, {});

      // check if display positoin 1 is taken
      const largestDisplayPositon = Math.max(
        ...Object.keys(eventsByDisplayPosition).map(Number)
      );

      const takenPositions = new Set<number>(
        Object.keys(eventsByDisplayPosition).map(Number)
      );

      for (let i = 0; i < largestDisplayPositon + 1; i++) {
        if (!takenPositions.has(i + 1)) {
          event.displayPosition = i + 1;

          if (i === 0) {
            event.left = i / event.columnCount;
          } else {
            const previousEl = eventsByDisplayPosition[i];

            event.left = previousEl.width + previousEl.left;
          }

          break;
        }
      }
    });

  return parallelEventsById;
};

export const getEvents = (allEvents: CalendarEvent[]) => {
  // lets just use 1 column for simplicity
  const mondayEvents = allEvents.filter((x) => x.dayOfWeek === 1);

  // 1. Create an object, for each day of week, add a row every 5 minutes
  const eventsPerFiveMinutes = mapEventsGroupedByFiveMinutes(mondayEvents);

  /*
      Next, take an event. Find every 5 minute slot that the event exists in.
      The size of the event can be calculate by selecting the 5 minute slot with the most parallel columns
    */

  const parallelEventsById = mapParallelEventsToEventById(
    mondayEvents,
    eventsPerFiveMinutes
  );

  return mondayEvents.map((event) => {
    const parallelEvents = parallelEventsById[event.id];

    event.parallelEvents = parallelEvents;

    return event;
  });
};
