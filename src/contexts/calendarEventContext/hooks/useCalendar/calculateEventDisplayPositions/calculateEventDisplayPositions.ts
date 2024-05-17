import { groupEventsByDayOfWeek } from './groupEventsByDayOfWeek'
import {
  CalendarEvent,
  CalendarEventDisplayPosition,
} from '@/types/calendarEvents'
import { getParallelEventsByEventId } from './getParallelEventsByEventId'
import { getEventsByTimeslot } from './getEventsByTimeslot'
import {
  HEIGHT_FIVE_MINUTES,
  HEIGHT_ONE_MINUTE,
} from '@/constants/calendar-constants'
import { isSameDay } from '@/helpers/timeHelpers'

export const calculateEventDisplayPositions = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  // 1. Group events by day of week
  const eventsGroupedByDay = groupEventsByDayOfWeek(allEvents, daysOfWeek)

  // 2. get display positions for each event
  return eventsGroupedByDay.map((events, columnIndex) => {
    const dayOfWeek = daysOfWeek[columnIndex]

    const initialDisplayPositions = populateInitialDisplayPositions(
      events,
      dayOfWeek,
      columnIndex,
    )

    events
      // sort by oldest first
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .forEach((event) => {
        const { startTime, endTime, startTimeInMinutes, durationInMinutes } =
          event

        const displayPosition = initialDisplayPositions[event.id]

        // 1. grab parallel event positions with ids
        const parallelEventDisplayPositions =
          displayPosition.parallelColumnIds.map(
            (x) => initialDisplayPositions[x],
          )

        // 2. identify which displayPositions are taken
        const takenPositions = new Set(
          parallelEventDisplayPositions.map((x) => x.displayPosition),
        )

        // 3. find the next, smallest, display position
        let nextDisplayPosition = 1
        while (takenPositions.has(nextDisplayPosition)) {
          nextDisplayPosition++
        }

        // 4. assign the position
        displayPosition.displayPosition = nextDisplayPosition

        // 5. calculate the left position based on its display position
        displayPosition.left = calculateLeftPosition(
          nextDisplayPosition,
          displayPosition.width,
        )

        // fill width of space
        if (displayPosition.parallelColumnIds.length < 2) {
          displayPosition.width = 1
        }

        // if start time is same day, use normal calculation
        if (isSameDay(startTime, dayOfWeek)) {
          displayPosition.top = startTimeInMinutes * HEIGHT_ONE_MINUTE
        } else {
          // started on different day, so must be at top
          displayPosition.top = 0
        }

        // if end time is same day, use normal.
        if (isSameDay(startTime, dayOfWeek)) {
          displayPosition.height = Math.max(
            durationInMinutes * HEIGHT_ONE_MINUTE,
            HEIGHT_FIVE_MINUTES,
          )
        } else if (isSameDay(endTime, dayOfWeek)) {
          // is height

          const numberOfMins = endTime.getMinutes() + endTime.getHours() * 60

          displayPosition.height = numberOfMins * HEIGHT_ONE_MINUTE
        } else {
          // full height
          displayPosition.height = HEIGHT_ONE_MINUTE * 60 * 24
        }
      })

    return Object.keys(initialDisplayPositions).map(
      (displayPositionId) => initialDisplayPositions[displayPositionId],
    )
  })
}

const calculateLeftPosition = (displayPosition: number, width: number) => {
  return (displayPosition - 1) * width
}

const populateInitialDisplayPositions = (
  events: CalendarEvent[],
  date: Date,
  columnIndex: number,
) => {
  const timeSlots = getEventsByTimeslot(events, date)

  const largestColumnCount = Object.values(timeSlots).reduce(
    (longest, current) => Math.max(longest, current.length),
    1,
  )

  // Identify which events run in parallel
  const parallelEvents = getParallelEventsByEventId(timeSlots)

  const initialDisplayPositionsById: {
    [key: string]: CalendarEventDisplayPosition
  } = {}

  events.forEach((event) => {
    const position: CalendarEventDisplayPosition = {
      parallelColumnIds: [],
      displayPosition: 0,
      left: 0,
      width: 1 / largestColumnCount,
      top: 0,
      column: columnIndex,
      eventId: event.id,
      height: 0,
    }

    if (Object.prototype.hasOwnProperty.call(parallelEvents, event.id)) {
      position.parallelColumnIds = [...parallelEvents[event.id]]
    }

    initialDisplayPositionsById[event.id] = position
  })

  return initialDisplayPositionsById
}
