import { useEffect, useReducer, useState } from 'react'

import dayjs from 'dayjs'
import { calculateEventDisplayPositions } from './calculateEventDisplayPositions'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { reducer } from './reducer'
import { useCalendarControls } from '../useCalendarControls'
import {
  addEventRequest,
  deleteEventRequest,
  fetchEvents,
  updateEventRequest,
} from '../../../../requests/calendarEventRequests'
import { CalendarEvent } from '@/types/calendarEvents'
import {
  CalendarEventRequestToDomain,
  CalendarEventToRequestObject,
} from '@/factories/factories'
import {
  CalendarEventApiRequestObject,
  CalendarEventApiResponseObject,
} from '@/requests/types'

dayjs.extend(isSameOrAfter)

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  const { daysOfWeek, next, previous, reset, currentWeek, showingCurrentWeek } =
    useCalendarControls()

  const fetchEventsForPage = async () => {
    setIsLoading(true)

    const startTime = daysOfWeek[0]
    const endTime = daysOfWeek[6]

    fetchEvents(startTime, endTime)
      .then((apiResponse) => {
        const calendarEvents = apiResponse.data.map(
          (x: CalendarEventApiResponseObject) =>
            CalendarEventRequestToDomain(x),
        )

        dispatch({
          type: 'add_loaded_events',
          events: calendarEvents,
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // fetch each time page changes
    fetchEventsForPage()
  }, [currentWeek])

  useEffect(() => {
    console.log('component update`')
  }, [])

  const updateEvent = async (event: CalendarEvent) => {
    setIsLoading(true)

    const request = CalendarEventToRequestObject(event)

    updateEventRequest(event.id, request)
      .then(() => {
        dispatch({
          type: 'update_event',
          event,
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const addEvent = async (request: CalendarEventApiRequestObject) => {
    setIsLoading(true)

    addEventRequest(request)
      .then((apiResponse) => {
        const event = CalendarEventRequestToDomain(apiResponse.data)

        dispatch({
          type: 'add_event',
          event,
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteEvent = async (event: CalendarEvent) => {
    setIsLoading(true)

    deleteEventRequest(event.id)
      .then(() => {
        dispatch({
          type: 'delete_event',
          event,
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const events = calculateEventDisplayPositions(state.events)

  return {
    isLoading,
    updateEvent,
    addEvent,
    deleteEvent,
    events,
    daysOfWeek,
    next,
    previous,
    reset,
    showingCurrentWeek,
  }
}
