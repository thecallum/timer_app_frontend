import { ICalendarFiveMinuteSlot } from './types'
import { generateFiveMinuteSlots } from './generateFiveMinuteSlots'
import { CalendarEvent } from '@/types/calendarEvents'

const fiveMinuteSlots = generateFiveMinuteSlots()

export const matchEventsToTimeSlots = (
  events: CalendarEvent[],
): ICalendarFiveMinuteSlot[] => {
  const response: ICalendarFiveMinuteSlot[] = fiveMinuteSlots.map((slot) => ({
    ...slot,
    // map events that occur within this timeslot
    eventIds: [],
  }))

  // console.log({ response })

  events.forEach((event) => {
    const firstFiveMinuteSlot = Math.floor(event.startTimeInMinutes / 5) - 1
    const lastFiveMinuteSlot = Math.ceil(event.endTimeInSeconds / 60 / 5) - 1

    // loop over each of the 5 minute slots

    for (
      let i = firstFiveMinuteSlot;
      i <= Math.min(lastFiveMinuteSlot, 287);
      i++
    ) {
      response[i].eventIds = [...response[i].eventIds, event.id]
    }
  })

  return response
}
