import { CalendarView } from '@/features/calendar'
import { getTodaysDate } from '@/helpers/getTodaysDate'
import { useState } from 'react'

export const useCalendarControls = () => {
  const [calendarView, setCalendarView] = useState<CalendarView>(
    CalendarView.Week,
  )

  const [currentDay, setCurrentDay] = useState(getTodaysDate())

  const updateCalendarView = (view: CalendarView) => {
    if (view === CalendarView.Week) {
      // day => week (show week containing day)

      setCurrentDay((day) => getStartOfWeek(day))
    }

    // State is already first day of week
    // week => day (show first day of week)

    setCalendarView(view)
  }

  const next = () => {
    setCurrentDay((day) => {
      const newDate = new Date(day)

      if (calendarView === CalendarView.Week) {
        newDate.setDate(newDate.getDate() + 7)
      } else {
        newDate.setDate(newDate.getDate() + 1)
      }

      return newDate
    })
  }

  const previous = () => {
    setCurrentDay((day) => {
      const newDate = new Date(day)

      if (calendarView === CalendarView.Week) {
        newDate.setDate(newDate.getDate() - 7)
      } else {
        newDate.setDate(newDate.getDate() - 1)
      }

      return newDate
    })
  }

  const reset = () => {
    setCurrentDay(() => new Date(getTodaysDate()))
  }

  const getStartOfWeek = (date: Date) => {
    const dayOfWeek = date.getDay() // Sunday - 0, Monday - 1, etc.
    const difference = (dayOfWeek + 6) % 7 // Calculate difference from Monday
    const monday = new Date(date)
    monday.setDate(monday.getDate() - difference) // Go back to the last Monday
    monday.setHours(0, 0, 0, 0) // Set to midnight

    // resolve bug when today is sunday
    // (was showing incorrect week)
    if (date.getDay() === 0) {
      monday.setDate(monday.getDate() - 7) // Go back to the last Monday
    }

    return monday
  }

  const getDaysOfWeek = (calendarView: CalendarView) => {
    if (calendarView === CalendarView.Week) {
      const startOfWeek = getStartOfWeek(currentDay)

      return [...Array(7)].map((_, index) => {
        const date = new Date(startOfWeek)
        date.setDate(date.getDate() + index)
        return date
      })
    }

    return [currentDay]
  }

  const daysOfWeek = getDaysOfWeek(calendarView)

  return {
    daysOfWeek,
    next,
    previous,
    reset,
    currentDay,
    calendarView,
    setCalendarView: updateCalendarView,
  }
}
