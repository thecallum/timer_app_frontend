import {
  CalendarEvent,
  CalendarEventDisplayPosition,
} from '@/types/calendarEvents'

export const populateInitialDisplayPositions = (
  events: CalendarEvent[],
  columnIndex: number,
  parallelEvents: {
    [key: string]: Set<string>
  },
  timeSlots: Set<string>[],
) => {
  const initialDisplayPositionsById: {
    [key: string]: CalendarEventDisplayPosition
  } = {}

  events.forEach((event) => {
    // 1. find all timeslots containing events
    const timeslotsContainingThisEvent = timeSlots.filter((x) =>
      x.has(event.id),
    )


    const largestTimeslotIds = timeslotsContainingThisEvent.reduce(
      (longest, current) => (current.size > longest.size ? current : longest),
      new Set<string>(),
    )

    // console.log({ description: event.description,timeslotsContainingThisEvent, largestTimeslotIds})


    // const largestTimeslotContainingThisEvent =
    //   timeslotsContainingThisEvent.reduce(
    //     (longest, current) => Math.max(longest, current.size),
    //     1,
    //   )

    const position: CalendarEventDisplayPosition = {
      eventId: event.id,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      parallelColumnIds: [],
      eventColumnOrder: 0,
      column: columnIndex,
      largestTimeslotIds,
      largestTimeslotContainingThisEvent: largestTimeslotIds.size,
    }

    if (Object.prototype.hasOwnProperty.call(parallelEvents, event.id)) {
      position.parallelColumnIds = [...parallelEvents[event.id]]
    }

    initialDisplayPositionsById[event.id] = position
  })

  return initialDisplayPositionsById
}
