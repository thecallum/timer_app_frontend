import axios from 'axios'
import { Dayjs } from 'dayjs'
import { CalendarEventApiRequestObject } from './types'

export const fetchEvents = (startTime: Dayjs, endTime: Dayjs) => {
  const params = {
    startTime: startTime.format('MM/DD/YYYY'),
    endTime: endTime.format('MM/DD/YYYY'),
  }

  return axios.get(`/api/events`, {
    params,
  })
}

export const addEventRequest = async (
  request: CalendarEventApiRequestObject,
) => {
  // const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  // await resolveAfter3Sec
  return axios.post(`/api/events/`, request)
}

export const updateEventRequest = (
  id: string,
  request: CalendarEventApiRequestObject,
) => {
  return axios.put(`/api/events/${id}`, request)
}

export const deleteEventRequest = (id: string) => {
  return axios.delete(`/api/events/${id}`)
}
