import {
  CalendarEvent,
  CalendarEventDisplayPosition,
} from '@/types/calendarEvents'

export const populateInitialDisplayPositions = (
  events: CalendarEvent[],
  columnIndex: number,
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

    let largestTimeslotSize = 0
    let idsOfEventsOfLargestTimeSlots: Set<string>[] = []

    timeslotsContainingThisEvent.forEach((timeSlot) => {
      if (timeSlot.size > largestTimeslotSize) {
        largestTimeslotSize = timeSlot.size

        // empty array, and add current timeslot
        idsOfEventsOfLargestTimeSlots = [timeSlot]
        return
      }

      if (timeSlot.size === largestTimeslotSize) {
        idsOfEventsOfLargestTimeSlots.push(timeSlot)
      }
    })

    const position: CalendarEventDisplayPosition = {
      eventId: event.id,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      eventColumnOrder: 0,
      column: columnIndex,
      idsOfEventsOfLargestTimeSlots: idsOfEventsOfLargestTimeSlots,
      largestTimeslotContainingThisEvent: largestTimeslotSize,
    }

    initialDisplayPositionsById[event.id] = position
  })

  return initialDisplayPositionsById
}
