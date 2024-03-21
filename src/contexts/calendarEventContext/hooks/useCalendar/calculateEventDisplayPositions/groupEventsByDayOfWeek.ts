import { CalendarEvent } from '@/types/calendarEvents'

export const groupEventsByDayOfWeek = (allEvents: CalendarEvent[]) => {
  const eventsPerDayOfWeek: CalendarEvent[][] = [[], [], [], [], [], [], []]

  allEvents.forEach((event) => {
    eventsPerDayOfWeek[event.dayOfWeek - 1].push(event)
  })



  return eventsPerDayOfWeek
}
