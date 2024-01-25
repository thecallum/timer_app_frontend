import dayjs from 'dayjs'
import { CalendarEvent } from '@/types/calendarEvents'

export type CalendarEventApiRequestObject = {
  description: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  projectId: number | null
}

export type CalendarEventApiResponseObject = {
  id: string
  description: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  projectId: number | null
}

export const CalendarEventRequestToDomain = (
  request: CalendarEventApiResponseObject,
) => {
  return new CalendarEvent(
    request.id,
    request.description,
    dayjs(request.startTime),
    dayjs(request.endTime),
    request.projectId,
  )
}

export const CalendarEventToRequestObject = (
  event: CalendarEvent,
): CalendarEventApiRequestObject => {
  return {
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
    projectId: event.projectId,
  }
}
