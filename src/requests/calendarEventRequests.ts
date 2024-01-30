import { Dayjs } from 'dayjs'
import {
  CalendarEventApiRequestObject,
  CalendarEventApiResponseObject,
} from './types'
import { CalendarEventRequestToDomain } from '@/factories/factories'

export const fetchEvents = async (startTime: Dayjs, endTime: Dayjs) => {
  const result = await fetch(
    `/api/events?startTime=${startTime.format('MM/DD/YYYY')}&endTime=${endTime.format('MM/DD/YYYY')}`,
    {
      method: 'GET',
      redirect: 'follow',
    },
  )

  const response: CalendarEventApiResponseObject[] = await result.json()

  return response.map((x) => {
    return CalendarEventRequestToDomain(x)
  })
}

export const addEventRequest = async (
  request: CalendarEventApiRequestObject,
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`/api/events`, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
    redirect: 'follow',
  })

  const response: CalendarEventApiResponseObject = await result.json()

  return response
}

export const updateEventRequest = async (
  id: string,
  request: CalendarEventApiRequestObject,
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(request),
    redirect: 'follow',
  })

  const response: CalendarEventApiResponseObject = await result.json()

  return response
}

export const deleteEventRequest = async (id: string) => {
  await fetch(`/api/events/${id}`, {
    method: 'DELETE',
    redirect: 'follow',
  })
}
