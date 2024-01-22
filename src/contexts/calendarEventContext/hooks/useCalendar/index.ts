import { useReducer } from 'react'
import { placeholderEvents } from './placeholderEvents'
import { CalendarEvent } from '@/features/calendar/types/types'
import dayjs from 'dayjs'
import { calculateEventDisplayPositions } from './calculateEventDisplayPositions'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { reducer } from './reducer'
import { useCalendarControls } from '../useCalendarControls'

dayjs.extend(isSameOrAfter)

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: placeholderEvents,
  })

  const { daysOfWeek, next, previous, reset, currentWeek, showingCurrentWeek } =
    useCalendarControls()

  const updateEvent = async (event: CalendarEvent) => {
    dispatch({
      type: 'update_event',
      event,
    })
  }

  const addEvent = async (event: CalendarEvent) => {
    dispatch({
      type: 'add_event',
      event,
    })
  }

  const deleteEvent = async (event: CalendarEvent) => {
    dispatch({
      type: 'delete_event',
      event,
    })
  }

  const filterEvents = (week: number) => {
    const today = dayjs()

    const weeksMultiplier = 7 * week

    const startOfWeek = today.startOf('week').add(1 + weeksMultiplier, 'days')
    const endOfWeek = startOfWeek.add(7, 'days')

    return state.events.filter((x) => {
      return (
        x.start.startOf('day').isSameOrAfter(startOfWeek) &&
        x.start.startOf('day').isBefore(endOfWeek)
      )
    })
  }

  const getEvents = () => {
    const eventsThisWeek = filterEvents(currentWeek)

    return calculateEventDisplayPositions(eventsThisWeek)
  }

  const events = getEvents()

  return {
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
