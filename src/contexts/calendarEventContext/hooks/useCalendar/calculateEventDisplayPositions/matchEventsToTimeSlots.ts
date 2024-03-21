import { CalendarEvent } from '@/types/calendarEvents'

export const matchEventsToTimeSlots = (
  events: CalendarEvent[],
): { [key: number]: string[] } => {
  const response: { [key: number]: string[] } = {}

  events.forEach((event) => {
    const firstFiveMinuteSlot = Math.floor(event.startTimeInMinutes / 5) - 1
    const lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1

    // loop over each of the 5 minute slots

    for (
      let i = firstFiveMinuteSlot;
      i <= Math.min(lastFiveMinuteSlot, 287);
      i++
    ) {
      if (Object.prototype.hasOwnProperty.call(response, i)) {
        response[i].push(event.id)
      } else {
        response[i] = [event.id]
      }
    }
  })

  return response
}
