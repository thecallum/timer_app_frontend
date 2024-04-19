import { CalendarEvent } from '@/types/calendarEvents'

export const getEventsByTimeslot = (events: CalendarEvent[]) => {
  const timeslotsByTimestamp: { [key: number]: string[] } = {}

  // 1. group events into 5 minute timeslots
  // eg [05:10]: [event1, event2]

  events.forEach((event) => {
    const firstFiveMinuteSlot =
      Math.floor(event.startTimeInSeconds / 60 / 5) - 1
    const lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1

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
