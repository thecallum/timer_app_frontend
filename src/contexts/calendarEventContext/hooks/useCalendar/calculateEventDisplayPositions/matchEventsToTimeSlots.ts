import { ICalendarFiveMinuteSlot, ParallelEventSlot } from './types'
import { generateFiveMinuteSlots } from './generateFiveMinuteSlots'
import { CalendarEvent } from '@/types/calendarEvents'

const fiveMinuteSlots = generateFiveMinuteSlots()

export const matchEventsToTimeSlots = (
  events: CalendarEvent[],
): ICalendarFiveMinuteSlot[] => {
  return fiveMinuteSlots.map((slot) => ({
    ...slot,
    // map events that occur within this timeslot
    eventIds: findParallelEvents(slot, events).map((x) => x.id),
  }))
}

const findParallelEvents = (
  slot: ParallelEventSlot,
  events: CalendarEvent[],
) => {
  return events.filter((x) => {
    const eventStartTime = x.startTimeInSeconds

    const fiveMinutesAfterStartTime = eventStartTime + 300
    // minimum height = 5 minutes
    const eventEndTime = Math.max(x.endTimeInSeconds, fiveMinutesAfterStartTime)

    return (
      (slot.endTimeInSeconds >= eventStartTime &&
        slot.endTimeInSeconds < eventEndTime) ||
      (slot.startTimeInSeconds >= eventStartTime &&
        slot.startTimeInSeconds < eventEndTime)
    )
  })
}
