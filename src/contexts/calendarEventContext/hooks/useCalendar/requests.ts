import {
  CalendarEventRequestObject,
  CalendarEventRequestToDomain,
} from '@/features/calendar/types/types'
import { Dayjs } from 'dayjs'

const BASE_URL = 'http://localhost:3001/api'

export const fetchEvents = async (startTime: Dayjs, endTime: Dayjs) => {
  const result = await fetch(
    `${BASE_URL}/events?startTime=${startTime.format('MM/DD/YYYY')}&endTime=${endTime.format('MM/DD/YYYY')}`,
    {
      method: 'GET',
      redirect: 'follow',
    },
  )

  const response: CalendarEventRequestObject[] = await result.json()

  return response.map((x) => {
    return CalendarEventRequestToDomain(x)
  })
}

export const addEventRequest = async (request: CalendarEventRequestObject) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
    redirect: 'follow',
  })

  const response: CalendarEventRequestObject = await result.json()

  return response
}

export const updateEventRequest = async (
  id: string,
  request: CalendarEventRequestObject,
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(request),
    redirect: 'follow',
  })

  const response: CalendarEventRequestObject = await result.json()

  return response
}

export const deleteEventRequest = async (id: string) => {
  await fetch(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
    redirect: 'follow',
  })
}
