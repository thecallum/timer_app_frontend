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
  left: number;
  width: number;
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

const mapEventsGroupedByFiveMinutes = (
  eventsPerDayOfWeek: CalendarEvent[][]
) => {
  const slots = generateFiveMinuteSlots();

  const slotsByDayOfWeek: {
    eventIds: string[];
    startTimeInSeconds: number;
    endTimeInSeconds: number;
  }[][] = [];

  for (let index = 0; index < eventsPerDayOfWeek.length; index++) {
    const eventsToday = eventsPerDayOfWeek[index];

    const slotsToday = slots.map((slot) => ({
      ...slot,
      eventIds: findParallelEvents(slot, eventsToday).map((x) => x.id),
    }));

    slotsByDayOfWeek.push(slotsToday);
  }

  return slotsByDayOfWeek;

  // return slots.map((slot) => ({
  //   ...slot,
  //   eventIds: findParallelEvents(slot, allEvents).map((x) => x.id),
  // }));
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
  }

  return parallelEventsById;
};

export const getEvents = (allEvents: CalendarEvent[]) => {
  // lets just use 1 column for simplicity
  // const mondayEvents = allEvents.filter((x) => x.dayOfWeek === 1);

  // 1. Create an object, for each day of week, add a row every 5 minutes

  // const eventsToday = allEvents.filter((x) => x.dayOfWeek === dayOfWeek);

  const eventsPerDayOfWeek: CalendarEvent[][] = [[], [], [], [], [], [], []];

  allEvents.forEach((event) => {
    eventsPerDayOfWeek[event.dayOfWeek - 1].push(event);
  });

  const eventsPerFiveMinutes =
    mapEventsGroupedByFiveMinutes(eventsPerDayOfWeek);

  /*
      Next, take an event. Find every 5 minute slot that the event exists in.
      The size of the event can be calculate by selecting the 5 minute slot with the most parallel columns
    */

  const parallelEventsById = mapParallelEventsToEventById(
    eventsPerDayOfWeek,
    eventsPerFiveMinutes
  );

  return allEvents.map((event) => {
    const parallelEvents = parallelEventsById[event.id];

    event.left = parallelEvents.left;
    event.width = parallelEvents.width;

    return event;
  });
};
