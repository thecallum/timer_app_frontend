import { groupEventsByDayOfWeek } from './groupEventsByDayOfWeek'
import { calculateDisplayPositionsById } from './calculateDisplayPositionsById'
import { CalendarEvent } from '@/types/calendarEvents'
import {
  HEIGHT_FIVE_MINUTES,
  HEIGHT_ONE_MINUTE,
} from '@/constants/calendar-constants'
import { getEventsByTimeslot } from './getEventsByTimeslot'
import { getParallelEventsByEventId } from './getParallelEventsByEventId'

export const calculateEventDisplayPositions = (allEvents: CalendarEvent[]) => {
  // 1. Group events by day of week
  const eventsGroupedByDay = groupEventsByDayOfWeek(allEvents)

  // 2. get display positions for each event
  const computedDisplayPositionsById = eventsGroupedByDay.map((events) => {
    const timeSlots = getEventsByTimeslot(events)

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
  })

  // map the display position to each event
  return allEvents.map((event) => {
    const displayPosition =
      computedDisplayPositionsById[event.dayOfWeek - 1][event.id]

    // fill width of space
    if (displayPosition.parallelColumnIds.length < 2) {
      event.width = 1
    } else {
      event.width = displayPosition.computedWidth
    }

    event.left = displayPosition.computedLeft

    event.top = event.startTimeInMinutes * HEIGHT_ONE_MINUTE
    event.height = Math.max(
      event.durationInMinutes * HEIGHT_ONE_MINUTE,
      HEIGHT_FIVE_MINUTES,
    )

    return event
  })
}
