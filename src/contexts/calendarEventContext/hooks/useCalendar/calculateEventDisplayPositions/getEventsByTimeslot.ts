import { isSameDay } from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

export const getEventsByTimeslot = (
  events: CalendarEvent[],
  dayOfWeek: Date,
) => {
  const timeslotsByTimestamp: { [key: number]: string[] } = {}

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
      lastFiveMinuteSlot = 287
    } else if (isSameDay(event.endTime, dayOfWeek)) {
      // is last column, but not single column
      firstFiveMinuteSlot = 0
      lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1
    } else {
      // full height
      firstFiveMinuteSlot = 0
      lastFiveMinuteSlot = 287
    }

    // loop over each of the 5 minute slots

    for (
      let i = firstFiveMinuteSlot;
      i <= Math.min(lastFiveMinuteSlot, 287);
      i++
    ) {
      if (Object.prototype.hasOwnProperty.call(timeslotsByTimestamp, i)) {
        timeslotsByTimestamp[i].push(event.id)
      } else {
        timeslotsByTimestamp[i] = [event.id]
      }
    }
  })

  // flatten the timeslots (we dont actually care about the times anymore)
  const timeSlots = Object.entries(timeslotsByTimestamp).map((x) => x[1])

  return timeSlots
}
