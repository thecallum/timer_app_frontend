import { groupEventsByDayOfWeek } from './groupEventsByDayOfWeek'
import { calculateDisplayPositionsById } from './calculateDisplayPositionsById'
import {
  CalendarEvent,
  CalendarEventDisplayPosition,
} from '@/types/calendarEvents'
import {
  HEIGHT_FIVE_MINUTES,
  HEIGHT_ONE_MINUTE,
} from '@/constants/calendar-constants'
import { getEventsByTimeslot } from './getEventsByTimeslot'
import { getParallelEventsByEventId } from './getParallelEventsByEventId'
import {
  getDayOfWeek,
  getMidnightDates,
  isSameDay,
} from '@/helpers/timeHelpers'

export const calculateEventDisplayPositions = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  // 1. Group events by day of week
  const eventsGroupedByDay = groupEventsByDayOfWeek(allEvents, daysOfWeek)

  // 2. get display positions for each event
  const computedDisplayPositionsById = eventsGroupedByDay.map(
    (events, index) => {
      const timeSlots = getEventsByTimeslot(events, daysOfWeek[index])

      // Identify which events run in parallel
      const parallelEvents = getParallelEventsByEventId(timeSlots)

      const largestColumnCount = Object.values(timeSlots).reduce(
        (longest, current) => Math.max(longest, current.length),
        1,
      )

      return calculateDisplayPositionsById(
        events,
        parallelEvents,
        largestColumnCount,
      )
    },
  )

  // map the display position to each event
  return allEvents.map((event) => {
    event.displayPositions = []

    const daysThatTheEventOccuredIn = getMidnightDates(
      event.startTime,
      event.endTime,
    )

    daysThatTheEventOccuredIn.forEach((date) => {
      if (
        isSameDay(date, daysOfWeek[0]) ||
        isSameDay(date, daysOfWeek[1]) ||
        isSameDay(date, daysOfWeek[2]) ||
        isSameDay(date, daysOfWeek[3]) ||
        isSameDay(date, daysOfWeek[4]) ||
        isSameDay(date, daysOfWeek[5]) ||
        isSameDay(date, daysOfWeek[6])
      ) {
        const displayPositions =
          computedDisplayPositionsById[getDayOfWeek(date) - 1][event.id]

        const displayPosition = displayPositions[0]

        let column: number = 0

        daysOfWeek.forEach((day, index) => {
          if (isSameDay(day, date)) {
            column = index
          }
        })

        const columnDisplayPosititon: CalendarEventDisplayPosition = {
          height: 0,
          left: 0,
          top: 0,
          width: 0,
          column: column,
        }

        // fill width of space
        if (displayPosition.parallelColumnIds.length < 2) {
          columnDisplayPosititon.width = 1
        } else {
          columnDisplayPosititon.width = displayPosition.computedWidth
        }
        columnDisplayPosititon.left = displayPosition.computedLeft

        // if start time is same day, use normal calculation
        if (isSameDay(event.startTime, date)) {
          columnDisplayPosititon.top =
            event.startTimeInMinutes * HEIGHT_ONE_MINUTE
        } else {
          // started on different day, so must be at top
          columnDisplayPosititon.top = 0
        }

        // if end time is same day, use normal.
        if (isSameDay(event.startTime, date)) {
          columnDisplayPosititon.height = Math.max(
            event.durationInMinutes * HEIGHT_ONE_MINUTE,
            HEIGHT_FIVE_MINUTES,
          )
        } else if (isSameDay(event.endTime, date)) {
          // is height

          const numberOfMins =
            event.endTime.getMinutes() + event.endTime.getHours() * 60

          columnDisplayPosititon.height = numberOfMins * HEIGHT_ONE_MINUTE
        } else {
          // full height
          columnDisplayPosititon.height = HEIGHT_ONE_MINUTE * 60 * 24
        }

        event.displayPositions.push(columnDisplayPosititon)
      }
    })

    return event
  })
}
