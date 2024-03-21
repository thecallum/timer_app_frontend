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
import { Bounce, toast } from 'react-toastify'
import { ErrorMessage } from '@/components/toasts/error-message'
import { UpdateStatus } from '../../../../types/updateStatus'
import { useIsAuthorized } from '@/auth/useIsAuthorized'

dayjs.extend(isSameOrAfter)

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const isAuthorized = useIsAuthorized()

  const { daysOfWeek, next, previous, reset, currentWeek, showingCurrentWeek } =
    useCalendarControls()

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
          console.error(err)
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
  }, [currentWeek])

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
          toast.update(notification, {
            render: 'Event updated',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          console.error(err)

          toast.update(notification, {
            render: (
              <ErrorMessage
                label="Failed to update event"
                message={err.message}
              />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
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

          toast.update(notification, {
            render: 'Event added',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          console.error(err)
          toast.update(notification, {
            render: (
              <ErrorMessage label="Failed to add event" message={err.message} />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
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
          toast.update(notification, {
            render: 'Event deleted',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          console.error(err)
          toast.update(notification, {
            render: (
              <ErrorMessage
                label="Failed to delete event"
                message={err.message}
              />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
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
