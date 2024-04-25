import {
  getDayOfWeek,
  getMidnightDates,
  isSameDay,
} from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

export const groupEventsByDayOfWeek = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = [[], [], [], [], [], [], []]

  allEvents.forEach((event) => {
    const daysThatTheEventOccuredIn = getMidnightDates(
      event.startTime,
      event.endTime,
    )

    daysThatTheEventOccuredIn.forEach((date) => {
      if (
        isSameDay(date, daysOfWeek[0]) ||
        isSameDay(date, daysOfWeek[1]) ||
        isSameDay(date, daysOfWeek[2]) ||
        isSameDay(date, daysOfWeek[3]) ||
        isSameDay(date, daysOfWeek[4]) ||
        isSameDay(date, daysOfWeek[5]) ||
        isSameDay(date, daysOfWeek[6])
      ) {
        eventsPerDayOfWeek[getDayOfWeek(date) - 1].push(event)
      }
    })
  })

  return eventsPerDayOfWeek
}
