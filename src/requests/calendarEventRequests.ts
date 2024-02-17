import { AxiosRequestConfig } from 'axios'
import { Dayjs } from 'dayjs'
import { CalendarEventApiRequestObject } from './types'
import { frontendRequest } from './frontendRequest'

export const fetchEvents = (startTime: Dayjs, endTime: Dayjs) => {
  const params = {
    startTime: startTime.format('MM/DD/YYYY'),
    endTime: endTime.format('MM/DD/YYYY'),
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
