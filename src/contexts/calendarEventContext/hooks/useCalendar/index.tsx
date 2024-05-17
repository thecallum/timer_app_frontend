import { useEffect, useReducer, useState } from 'react'
import { calculateEventDisplayPositions } from './calculateEventDisplayPositions'
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
import { toast } from 'react-toastify'
import { ErrorMessage } from '@/components/toasts/error-message'
import { UpdateStatus } from '../../../../types/updateStatus'
import { useIsAuthorized } from '@/auth/useIsAuthorized'
import { displayToast } from '@/toasts/displayToast'

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const isAuthorized = useIsAuthorized()

  const {
    daysOfWeek,
    next,
    previous,
    reset,
    calendarViewOffset,
    calendarView,
    setCalendarView,
  } = useCalendarControls()

  const fetchEventsForPage = async () =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)

      // clear events while next page is loading
      dispatch({
        type: 'clear_events',
      })

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
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  useEffect(() => {
    if (!isAuthorized) return
    // fetch each time page changes
    fetchEventsForPage()
  }, [calendarViewOffset])

  const updateEvent = async (event: CalendarEvent) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)

      const request = CalendarEventToRequestObject(event)

      const notification = toast.loading('Updating event...')

      updateEventRequest(event.id, request)
        .then(() => {
          dispatch({
            type: 'update_event',
            event,
          })
          displayToast(notification, {
            render: 'Event updated',
            type: 'success',
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          displayToast(notification, {
            render: (
              <ErrorMessage
                label="Failed to update event"
                message={err.message}
              />
            ),
            type: 'error',
          })
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  const addEvent = async (request: CalendarEventApiRequestObject) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)

      const notification = toast.loading('Adding event...')

      addEventRequest(request)
        .then((apiResponse) => {
          const event = CalendarEventRequestToDomain(apiResponse.data)

          dispatch({
            type: 'add_event',
            event,
          })

          displayToast(notification, {
            render: 'Event added',
            type: 'success',
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          displayToast(notification, {
            render: (
              <ErrorMessage label="Failed to add event" message={err.message} />
            ),
            type: 'error',
          })
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  const deleteEvent = async (event: CalendarEvent) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)

      const notification = toast.loading('Deleting event...')

      deleteEventRequest(event.id)
        .then(() => {
          dispatch({
            type: 'delete_event',
            event,
          })

          displayToast(notification, {
            render: 'Event deleted',
            type: 'success',
          })

          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          displayToast(notification, {
            render: (
              <ErrorMessage
                label="Failed to delete event"
                message={err.message}
              />
            ),
            type: 'error',
          })
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  const events = calculateEventDisplayPositions(state.events, daysOfWeek)

  const eventsById: {
    [key: string]: CalendarEvent
  } = {}

  state.events.forEach((event) => {
    eventsById[event.id] = event
  })

  return {
    isLoading,
    eventsById,
    updateEvent,
    addEvent,
    deleteEvent,
    events,
    daysOfWeek,
    next,
    previous,
    reset,
    calendarViewOffset,
    calendarView,
    setCalendarView,
  }
}
