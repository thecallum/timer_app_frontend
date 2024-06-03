import { isSameDay } from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

const TOP_SLOT = 0
const BOTTOM_SLOT = 287

export const getEventsByTimeslot = (
  events: CalendarEvent[],
  dayOfWeek: Date,
) => {
  // let's try using an array immediatly instead of an object
  const timeslotsByTimestamp: string[][] = []

  // 1. group events into 5 minute timeslots
  // eg [05:10]: [event1, event2]

  let firstFiveMinuteSlot = 0
  let lastFiveMinuteSlot = 0

  events.forEach((event) => {
    if (isSameDay(event.startTime, event.endTime)) {
      // is single column
      firstFiveMinuteSlot = Math.floor(event.startTimeInSeconds / 60 / 5) - 1
      lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1
    } else if (isSameDay(event.startTime, dayOfWeek)) {
      // multiple, but first column
      firstFiveMinuteSlot = Math.floor(event.startTimeInSeconds / 60 / 5) - 1
      lastFiveMinuteSlot = BOTTOM_SLOT
    } else if (isSameDay(event.endTime, dayOfWeek)) {
      // is last column, but not single column
      firstFiveMinuteSlot = TOP_SLOT
      lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1
    } else {
      // full height
      firstFiveMinuteSlot = TOP_SLOT
      lastFiveMinuteSlot = BOTTOM_SLOT
    }

    // loop over each of the 5 minute slots

    for (
      let i = firstFiveMinuteSlot;
      i <= Math.min(lastFiveMinuteSlot, BOTTOM_SLOT);
      i++
    ) {
      if (Object.prototype.hasOwnProperty.call(timeslotsByTimestamp, i)) {
        timeslotsByTimestamp[i].push(event.id)
      } else {
        timeslotsByTimestamp[i] = [event.id]
      }
    }
  })

  // convert to set for easier access
  return timeslotsByTimestamp.map((x) => new Set<string>(x))
}
