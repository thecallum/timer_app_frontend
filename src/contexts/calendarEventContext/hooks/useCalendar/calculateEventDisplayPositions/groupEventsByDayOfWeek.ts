import { getMidnightDates } from '@/helpers/timeHelpers'
import { CalendarEvent } from '@/types/calendarEvents'

export const groupEventsByDayOfWeek = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = daysOfWeek.map(() => [])

  allEvents.forEach((event) => {
    const daysThatTheEventOccuredIn = new Set<number>(
      getMidnightDates(event.startTime, event.endTime).map((x) => x.getTime()),
    )

    daysOfWeek.forEach((dayOfWeek, index) => {
      if (daysThatTheEventOccuredIn.has(dayOfWeek.getTime())) {
        eventsPerDayOfWeek[index].push(event)
      }
    })
  })

  return eventsPerDayOfWeek
}
