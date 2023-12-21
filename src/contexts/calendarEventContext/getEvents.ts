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

  allEvents.forEach((event) => {
    const containingRows = findContainingRows(event, eventsPerFiveMinutes);

    // find largest row
    const rowWithMostColumns = findRowWithMostColumns(containingRows);

    const parallelIds = getParallelIds(containingRows);

    const largestColumnCount = rowWithMostColumns.eventIds.length;
  

    parallelEventsById[event.id] = {
      columnCount: largestColumnCount,
      columnIds: [...parallelIds],
      left: 0,
      displayPosition: 0,
      width: 1 / largestColumnCount,
      // width: 1 / parallelIds.length,
    };
  });


// sort by start time

let i = 1

  allEvents.sort((a, b) => {
    return a.startTimeInSeconds - b.startTimeInSeconds
  }).forEach(({ id }) => {
    const event = parallelEventsById[id];

    const displayPosition =
      event.columnIds.length === 1 ? 0 : event.columnIds.indexOf(id);

    // console.log({ displayPosition, id });

    // event.left = displayPosition / event.columnCount;
    // event.left = (i++) 

    // get other column displayPositions
    const otherEvents = event.columnIds.map(id => parallelEventsById[id])
    console.log(event.columnIds, { otherEvents })

    // check if display positoin 1 is taken
    const largestDisplayPositon = Math.max(...otherEvents.map(x => x.displayPosition))
    // const smallestDisplayPositon = Math.max(...otherEvents.map(x => x.displayPosition))

    const takenPositions = new Set<number>(otherEvents.map(x => x.displayPosition))
    console.log(takenPositions, largestDisplayPositon)

    // let nextPosition = 1;

    for (let i = 0; i < largestDisplayPositon + 1; i++) {
      // console.log("i", i)
      // nextPosition = i

      // const element = array[i];
      if (!takenPositions.has(i + 1)) {
        console.log("break at i", i + 1)
        event.displayPosition = i+1
        // event.left =   i+1 / event.columnCount

        // event.left = (100/event.columnCount) * i 
        // event.left = 1/event.columnCount

        // or add the left+width of previous item

        if (i === 0) {
          event.left = i/event.columnCount
        } else {
          const previousEl = otherEvents.filter(x => x.displayPosition == i)[0]
          console.log({ previousEl, i})
  
          event.left = previousEl.width + previousEl.left
        }

      


        // event.left = i/event.columnCount
        break
      }

      
    }

    // console.log({i})




    // if (largestDisplayPositon === 0) {
    //   event.displayPosition = 1
    // } else {
    //   event.displayPosition = largestDisplayPositon + 1
    // }

    // // event.displayPosition = 1
    // event.left = event.displayPosition



    // how to check if an event exists before me?

  })



  // Object.keys(parallelEventsById).forEach((key) => {
  //   const event = parallelEventsById[key];

  //   const displayPosition =
  //     event.columnIds.length === 1 ? 0 : event.columnIds.indexOf(key);

  //   console.log({ displayPosition, key });

  //   // event.left = 0;
  //   event.left = displayPosition / event.columnCount;
  // });

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
