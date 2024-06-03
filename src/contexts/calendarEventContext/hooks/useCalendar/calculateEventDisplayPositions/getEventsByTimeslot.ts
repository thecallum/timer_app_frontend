import { isSameDay } from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

const TOP_SLOT = 0
const BOTTOM_SLOT = 287

export const getEventsByTimeslot = (
  events: CalendarEvent[],
  dayOfWeek: Date,
) => {
  const timeslotsByTimestamp: string[][] = Array.from(
    { length: BOTTOM_SLOT + 1 },
    () => [],
  )

  events.forEach((event) => {
    const { firstFiveMinuteSlot, lastFiveMinuteSlot } = calculateSlots(
      event,
      dayOfWeek,
    )

    // loop over each of the 5 minute slots

    for (
      let i = firstFiveMinuteSlot;
      i <= Math.min(lastFiveMinuteSlot, BOTTOM_SLOT);
      i++
    ) {
      timeslotsByTimestamp[i].push(event.id)
    }
  })

  // convert to set for easier access
  return timeslotsByTimestamp.map((x) => new Set<string>(x))
}

const calculateSlots = (event: CalendarEvent, dayOfWeek: Date) => {
  // 1. group events into 5 minute timeslots
  // eg [05:10]: [event1, event2]

  if (isSameDay(event.startTime, event.endTime)) {
    // is single column
    const firstFiveMinuteSlot = Math.floor(event.startTimeInSeconds / 60 / 5)
    const lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5)

    return { firstFiveMinuteSlot, lastFiveMinuteSlot }
  }

  if (isSameDay(event.startTime, dayOfWeek)) {
    // multiple, but first column
    const firstFiveMinuteSlot = Math.floor(event.startTimeInSeconds / 60 / 5)
    const lastFiveMinuteSlot = BOTTOM_SLOT

    return { firstFiveMinuteSlot, lastFiveMinuteSlot }
  }

  if (isSameDay(event.endTime, dayOfWeek)) {
    // is last column, but not single column
    const firstFiveMinuteSlot = TOP_SLOT
    const lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5)

    return { firstFiveMinuteSlot, lastFiveMinuteSlot }
  }

  // full height
  const firstFiveMinuteSlot = TOP_SLOT
  const lastFiveMinuteSlot = BOTTOM_SLOT

  return { firstFiveMinuteSlot, lastFiveMinuteSlot }
}
