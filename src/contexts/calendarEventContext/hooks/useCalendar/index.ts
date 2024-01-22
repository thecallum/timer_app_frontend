import { useEffect, useReducer } from 'react'
import {
  CalendarEvent,
  CalendarEventRequestObject,
  CalendarEventRequestToDomain,
  CalendarEventToRequestObject,
} from '@/features/calendar/types/types'
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
} from './requests'

dayjs.extend(isSameOrAfter)

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    isLoading: true,
  })

  const { daysOfWeek, next, previous, reset, currentWeek, showingCurrentWeek } =
    useCalendarControls()

  const setIsLoading = (clearEvents = false) => {
    dispatch({ type: 'set_loading', clearEvents })
  }

  const fetchEventsForPage = async () => {
    setIsLoading(true)

    const startTime = daysOfWeek[0]
    const endTime = daysOfWeek[6]

    fetchEvents(startTime, endTime).then((res) => {
      dispatch({
        type: 'add_loaded_events',
        events: res,
      })
    })
  }

  useEffect(() => {
    // fetch each time page changes
    fetchEventsForPage()
  }, [currentWeek])

  const updateEvent = async (event: CalendarEvent) => {
    setIsLoading()

    const request = CalendarEventToRequestObject(event)

    await updateEventRequest(event.id, request)

    dispatch({
      type: 'update_event',
      event,
    })
  }

  const addEvent = async (request: CalendarEventRequestObject) => {
    setIsLoading()

    const response = await addEventRequest(request)
    const event = CalendarEventRequestToDomain(response)

    dispatch({
      type: 'add_event',
      event,
    })
  }

  const deleteEvent = async (event: CalendarEvent) => {
    setIsLoading()

    await deleteEventRequest(event.id)

    dispatch({
      type: 'delete_event',
      event,
    })
  }

  const events = calculateEventDisplayPositions(state.events)

  return {
    isLoading: state.isLoading,
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
