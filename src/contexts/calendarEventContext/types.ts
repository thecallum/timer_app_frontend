import { CalendarEvent } from '@/features/calendar/types/types'
import { useCalendar } from './hooks/useCalendar'

export interface IEventState {
  events: CalendarEvent[]
}

export type CalendarEventContext = ReturnType<typeof useCalendar>
