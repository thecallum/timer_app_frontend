import { AxiosRequestConfig } from 'axios'
import { CalendarEventApiRequestObject } from './types'
import { frontendRequest } from './frontendRequest'
import dateFormat from 'dateformat'

export const fetchEvents = (startTime: Date, endTime: Date) => {
  const params = {
    startTime: dateFormat(startTime, 'mm/dd/yyyy'),
    endTime: dateFormat(endTime, 'mm/dd/yyyy'),
  }

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/api/events`,
    params,
  }

  return frontendRequest(config)
}

export const addEventRequest = async (
  request: CalendarEventApiRequestObject,
) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: `/api/events/`,
    data: request,
  }

  return frontendRequest(config)
}

export const updateEventRequest = (
  id: string,
  request: CalendarEventApiRequestObject,
) => {
  const config: AxiosRequestConfig = {
    method: 'put',
    url: `/api/events/${id}`,
    data: request,
  }

  return frontendRequest(config)
}

export const deleteEventRequest = (id: string) => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `/api/events/${id}`,
  }

  return frontendRequest(config)
}
