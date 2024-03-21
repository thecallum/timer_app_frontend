import { groupEventsByDayOfWeek } from './groupEventsByDayOfWeek'
import { matchEventsToTimeSlots } from './matchEventsToTimeSlots'
import { findParallelEventsById } from './findParallelEvents'
import { calculateDisplayPositionsById } from './calculateDisplayPositionsById'
import { findLargestColumnCount } from './findLargestColumnCount'
import { ICalendarFiveMinuteSlot } from './types'
import { CalendarEvent } from '@/types/calendarEvents'
import {
  HEIGHT_FIVE_MINUTES,
  HEIGHT_ONE_MINUTE,
} from '@/constants/calendar-constants'

const getDisplayPositions = (
  events: CalendarEvent[],
  timeSlots: ICalendarFiveMinuteSlot[],
) => {
  const parallelEventsById = findParallelEventsById(events, timeSlots)
  const largestColumnCount = findLargestColumnCount(timeSlots)

  return calculateDisplayPositionsById(
    events,
    parallelEventsById,
    largestColumnCount,
  )
}

export const calculateEventDisplayPositions = (allEvents: CalendarEvent[]) => {
  // 1. Group events by day of week
  const eventsGroupedByDay = groupEventsByDayOfWeek(allEvents)

  // 2. Group each event into 5 minute slots
  // For every 5 minute slot, include any event that fits into that slot
  const timeSlotsWithContainingEvents = eventsGroupedByDay.map((events) =>
    matchEventsToTimeSlots(events),
  )

  // console.log(
  //   timeSlotsWithContainingEvents[2].filter((x) => x.eventIds.length > 0),
  // )

  // 3. get display positions for each event
  const computedDisplayPositionsById = eventsGroupedByDay.map((events, index) =>
    getDisplayPositions(events, timeSlotsWithContainingEvents[index]),
  )

  // map the display position to each event
  return allEvents.map((event) => {
    const displayPosition =
      computedDisplayPositionsById[event.dayOfWeek - 1][event.id]

    event.width = displayPosition.computedWidth
    event.left = displayPosition.computedLeft

    event.top = event.startTimeInMinutes * HEIGHT_ONE_MINUTE
    event.height = Math.max(
      event.durationInMinutes * HEIGHT_ONE_MINUTE,
      HEIGHT_FIVE_MINUTES,
    )

    return event
  })
}
