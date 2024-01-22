import { useEffect, useReducer } from 'react'
import { fetchPlaceholderEvents } from './placeholderEvents'
import { CalendarEvent } from '@/features/calendar/types/types'
import dayjs from 'dayjs'
import { calculateEventDisplayPositions } from './calculateEventDisplayPositions'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { reducer } from './reducer'
import { useCalendarControls } from '../useCalendarControls'

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

  const fetchEventsForPage = () => {
    setIsLoading(true)

    const events = fetchPlaceholderEvents(currentWeek)

    setTimeout(() => {
      dispatch({
        type: 'add_loaded_events',
        events,
      })
    }, 500)
  }

  useEffect(() => {
    // fetch each time page changes
    fetchEventsForPage()
  }, [currentWeek])

  const updateEvent = async (event: CalendarEvent) => {
    setIsLoading()

    setTimeout(() => {
      dispatch({
        type: 'update_event',
        event,
      })
    }, 500)
  }

  const addEvent = async (event: CalendarEvent) => {
    setIsLoading()

    setTimeout(() => {
      dispatch({
        type: 'add_event',
        event,
      })
    }, 500)
  }

  const deleteEvent = async (event: CalendarEvent) => {
    setIsLoading()

    setTimeout(() => {
      dispatch({
        type: 'delete_event',
        event,
      })
    }, 500)
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
