import { getMidnightDates, isSameDay } from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

export const groupEventsByDayOfWeek = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = daysOfWeek.map(() => [])

  allEvents.forEach((event) => {
    const daysThatTheEventOccuredIn = getMidnightDates(
      event.startTime,
      event.endTime,
    )

    daysThatTheEventOccuredIn.forEach((date) => {
      // def needs refactoring

      daysOfWeek.forEach((dayOfWeek, index) => {
        if (isSameDay(date, dayOfWeek)) {
          eventsPerDayOfWeek[index].push(event)
          return
        }
      })
    })
  })

  return eventsPerDayOfWeek
}
