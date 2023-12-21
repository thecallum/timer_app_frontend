import { CalendarEvent } from "@/features/calendar/types/types";

interface ICalendarFiveMinuteSlot {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
  eventIds: string[];
}

interface ICalendarEventParallelEvents {
  columnIds: string[];
  columnCount: number;
  displayPosition: number;
}

type ParallelEventSlot = {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
};

const generateFiveMinuteSlots = () => {
  const slots: ParallelEventSlot[] = [];

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
  slot: ParallelEventSlot,
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


const populateSlotsWithParallelEvents = (
  eventsToday: CalendarEvent[],
  slots: ParallelEventSlot[]
) => {
  // Iterate through each slot, and map any events

  return slots.map((slot) => ({
    ...slot,
    eventIds: findParallelEvents(slot, eventsToday).map((x) => x.id),
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
  eventsPerDayOfWeek: CalendarEvent[][],
  eventsPerFiveMinutes: ICalendarFiveMinuteSlot[][]
) => {
  const parallelEventsById: {
    [key: string]: ICalendarEventParallelEvents;
  } = {};

  for (let index = 0; index < eventsPerDayOfWeek.length; index++) {
    const eventsThisWeek = eventsPerDayOfWeek[index];

    const maxRows = findRowWithMostColumns(eventsPerFiveMinutes[index]);

    eventsThisWeek.forEach((event) => {
      const containingRows = findContainingRows(
        event,
        eventsPerFiveMinutes[index]
      );

      // find largest row
      const parallelIds = getParallelIds(containingRows);

      parallelEventsById[event.id] = {
        columnCount: maxRows.eventIds.length,
        columnIds: [...parallelIds],
        displayPosition: 0,
      };
    });

    eventsThisWeek
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

        const takenPositions = new Set<number>(
          Object.keys(eventsByDisplayPosition).map(Number)
        );

        // find the smallest, non-taken position
        for (let i = 0; i < maxRows.eventIds.length + 1; i++) {
          if (!takenPositions.has(i + 1)) {
            event.displayPosition = i + 1;

            break;
          }
        }
      });
  }

  return parallelEventsById;
};

const groupEventsByDayOfWeek = (allEvents: CalendarEvent[]) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = [[], [], [], [], [], [], []];

  allEvents.forEach((event) => {
    eventsPerDayOfWeek[event.dayOfWeek - 1].push(event);
  });

  return eventsPerDayOfWeek;
};

export const getEvents = (allEvents: CalendarEvent[]) => {
  // 1. Group events by day of week
  const eventsPerDayOfWeek = groupEventsByDayOfWeek(allEvents);

  // 2. Group each event into 5 minute slots
  const fiveMinuteSlots = generateFiveMinuteSlots();

  const parallelEventsGroupedByFiveMinuteSlots = eventsPerDayOfWeek.map(
    (eventsToday) =>
      populateSlotsWithParallelEvents(eventsToday, fiveMinuteSlots)
  );

  const parallelEventsById = mapParallelEventsToEventById(
    eventsPerDayOfWeek,
    parallelEventsGroupedByFiveMinuteSlots
  );

  return allEvents.map((event) => {
    const parallelEvents = parallelEventsById[event.id];
    const computedWidth = 1 / parallelEvents.columnCount;

    event.width = computedWidth;
    event.left = (parallelEvents.displayPosition - 1) * computedWidth;

    return event;
  });
};
