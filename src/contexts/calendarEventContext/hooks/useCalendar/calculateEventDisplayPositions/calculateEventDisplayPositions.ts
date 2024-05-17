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
  return eventsGroupedByDay.map((eventsForDay, columnIndex) => {
    const displayPositions: CalendarEventDisplayPosition[] = []

    const dayOfWeek = daysOfWeek[columnIndex]

    const initialDisplayPositions = populateInitialDisplayPositions(
      eventsForDay,
      dayOfWeek,
      columnIndex,
    )

    eventsForDay
      // sort by oldest first
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .forEach((event) => {
        const displayPosition = initialDisplayPositions[event.id]

        // 4. assign the position
        displayPosition.eventColumnOrder = calculateEventColumnOrder(
          displayPosition.parallelColumnIds,
          initialDisplayPositions,
        )

        displayPosition.top = calculateEventTopPosition(event, dayOfWeek)
        displayPosition.height = calculateEventHeight(event, dayOfWeek)

        // 5. calculate the left position based on its display position
        displayPosition.left = calculateLeftPosition(
          displayPosition.eventColumnOrder,
          displayPosition.width,
        )

        // fill width if event has no parallel events
        if (displayPosition.parallelColumnIds.length < 2) {
          displayPosition.width = 1
        }

        displayPositions.push(displayPosition)
      })

    return displayPositions
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
      eventId: event.id,
      top: 0,
      left: 0,
      width: 1 / largestColumnCount,
      height: 0,
      parallelColumnIds: [],
      eventColumnOrder: 0,
      column: columnIndex,
    }

    if (Object.prototype.hasOwnProperty.call(parallelEvents, event.id)) {
      position.parallelColumnIds = [...parallelEvents[event.id]]
    }

    initialDisplayPositionsById[event.id] = position
  })

  return initialDisplayPositionsById
}

const calculateEventColumnOrder = (
  parallelColumnIds: string[],
  initialDisplayPositions: {
    [key: string]: CalendarEventDisplayPosition
  },
) => {
  // 1. grab parallel event positions with ids
  const parallelEventDisplayPositions = parallelColumnIds.map(
    (x) => initialDisplayPositions[x],
  )

  // 2. identify which displayPositions are taken
  const takenPositions = new Set(
    parallelEventDisplayPositions.map((x) => x.eventColumnOrder),
  )

  // 3. find the next, smallest, display position
  let nextDisplayPosition = 1
  while (takenPositions.has(nextDisplayPosition)) {
    nextDisplayPosition++
  }

  return nextDisplayPosition
}

const calculateEventTopPosition = (event: CalendarEvent, dayOfWeek: Date) => {
  const { startTime, startTimeInMinutes } = event

  // if start time is same day, use normal calculation
  // event started today
  if (isSameDay(startTime, dayOfWeek)) {
    return startTimeInMinutes * HEIGHT_ONE_MINUTE
  }

  // started on different day, so must be at top
  return 0
}

const calculateEventHeight = (event: CalendarEvent, dayOfWeek: Date) => {
  const { durationInMinutes, startTime, endTime } = event

  // if end time is same day, use normal.
  if (isSameDay(startTime, dayOfWeek)) {
    return Math.max(durationInMinutes * HEIGHT_ONE_MINUTE, HEIGHT_FIVE_MINUTES)
  }

  // event ends on this day
  if (isSameDay(endTime, dayOfWeek)) {
    const numberOfMins = endTime.getMinutes() + endTime.getHours() * 60
    return numberOfMins * HEIGHT_ONE_MINUTE
  }

  // full height
  return HEIGHT_ONE_MINUTE * 60 * 24
}
