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
import { isSameDay } from '@/helpers/timeHelpers'

export const calculateEventDisplayPositions = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  const eventsById: {
    [key: string]: CalendarEvent
  } = {}

  allEvents.forEach((event) => {
    eventsById[event.id] = event
  })

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

  const processedEvents: CalendarEventDisplayPosition[][] =
    computedDisplayPositionsById.map((column, colIndex) => {
      return Object.keys(column).map((displayPositionId) => {
        const event = eventsById[displayPositionId]

        const dayOfWeek = daysOfWeek[colIndex]

        const displayPosition = column[event.id]

        const columnDisplayPosititon: CalendarEventDisplayPosition = {
          height: 0,
          left: 0,
          top: 0,
          width: 0,
          column: colIndex,
          eventId: event.id,
        }

        // fill width of space
        if (displayPosition.parallelColumnIds.length < 2) {
          columnDisplayPosititon.width = 1
        } else {
          columnDisplayPosititon.width = displayPosition.computedWidth
        }
        columnDisplayPosititon.left = displayPosition.computedLeft

        // if start time is same day, use normal calculation
        if (isSameDay(event.startTime, dayOfWeek)) {
          columnDisplayPosititon.top =
            event.startTimeInMinutes * HEIGHT_ONE_MINUTE
        } else {
          // started on different day, so must be at top
          columnDisplayPosititon.top = 0
        }

        // if end time is same day, use normal.
        if (isSameDay(event.startTime, dayOfWeek)) {
          columnDisplayPosititon.height = Math.max(
            event.durationInMinutes * HEIGHT_ONE_MINUTE,
            HEIGHT_FIVE_MINUTES,
          )
        } else if (isSameDay(event.endTime, dayOfWeek)) {
          // is height

          const numberOfMins =
            event.endTime.getMinutes() + event.endTime.getHours() * 60

          columnDisplayPosititon.height = numberOfMins * HEIGHT_ONE_MINUTE
        } else {
          // full height
          columnDisplayPosititon.height = HEIGHT_ONE_MINUTE * 60 * 24
        }

        return columnDisplayPosititon
      })
    })

  return processedEvents
}
