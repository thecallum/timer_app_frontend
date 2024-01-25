import { Dayjs } from 'dayjs'
import {
  CalendarEventApiRequestObject,
  CalendarEventApiResponseObject,
} from './types'
import { CalendarEventRequestToDomain } from '@/factories/factories'
import { BASE_URL } from './config'

export const fetchEvents = async (startTime: Dayjs, endTime: Dayjs) => {
  const result = await fetch(
    `${BASE_URL}/events?startTime=${startTime.format('MM/DD/YYYY')}&endTime=${endTime.format('MM/DD/YYYY')}`,
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

  const result = await fetch(`${BASE_URL}/events`, {
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

  const result = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(request),
    redirect: 'follow',
  })

  const response: CalendarEventApiResponseObject = await result.json()

  return response
}

export const deleteEventRequest = async (id: string) => {
  await fetch(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
    redirect: 'follow',
  })
}
