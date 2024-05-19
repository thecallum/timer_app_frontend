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
import { populateInitialDisplayPositions } from './populateInitialDisplayPositions'

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
    // console.log(dayOfWeek)

    const timeSlots = getEventsByTimeslot(eventsForDay, dayOfWeek)

    // console.log({ timeSlots })

    // const largestColumnCount = Object.values(timeSlots).reduce(
    //   (longest, current) => Math.max(longest, current.size),
    //   1,
    // )
    // Identify which events run in parallel
    const parallelEvents = getParallelEventsByEventId(timeSlots)

    // console.log({ parallelEvents })

    const initialDisplayPositions = populateInitialDisplayPositions(
      eventsForDay,
      columnIndex,
      parallelEvents,
      timeSlots,
    )

    let largestColumnWidth = 1

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

        displayPosition.width =
          1 / displayPosition.largestTimeslotContainingThisEvent

        largestColumnWidth = Math.max(
          largestColumnWidth,
          displayPosition.largestTimeslotContainingThisEvent,
        )

        // 5. calculate the left position based on its display position
        displayPosition.left = calculateLeftPosition(
          displayPosition.eventColumnOrder,
          displayPosition.width,
        )

        displayPositions.push(displayPosition)
      })

    // dont need to calculate largest one
    largestColumnWidth -= 1

    while (largestColumnWidth > 1) {
      // console.log({ largestColumnWidth })
      largestColumnWidth--
    }

    return displayPositions
  })
}

const calculateLeftPosition = (displayPosition: number, width: number) => {
  return (displayPosition - 1) * width
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
