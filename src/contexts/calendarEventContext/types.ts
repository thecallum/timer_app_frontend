import { CalendarEvent } from '@/features/calendar/types/types'

export interface IEventState {
  events: CalendarEvent[]
}

export interface ICalendarEventContext {
  getAllEvents: () => CalendarEvent[]
  getEvents: (week: number) => CalendarEvent[]
  updateEvent: (event: CalendarEvent) => void
  addEvent: (event: CalendarEvent) => void
  deleteEvent: (event: CalendarEvent) => void
}
