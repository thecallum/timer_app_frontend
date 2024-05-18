import { CalendarView } from '@/features/calendar'
import { getTodaysDate } from '@/helpers/getTodaysDate'
import { useState } from 'react'

export const useCalendarControls = () => {
  const [calendarView, setCalendarView] = useState<CalendarView>(
    CalendarView.Week,
  )

  const [calendarViewOffset, setCalendarViewOffset] = useState(0)

  const updateCalendarView = (view: CalendarView) => {
    // day => week (show week containing day)
    // week => day (show first day of week)

    setCalendarView(view)
  }

  const next = () => setCalendarViewOffset((x) => x + 1)
  const previous = () => setCalendarViewOffset((x) => x - 1)
  const reset = () => setCalendarViewOffset(() => 0)

  const getStartOfWeek = (weeksInFuture: number) => {
    const date = getTodaysDate()

    const dayOfWeek = date.getDay() // Sunday - 0, Monday - 1, etc.
    const difference = (dayOfWeek + 6) % 7 // Calculate difference from Monday
    const monday = new Date(date)
    monday.setDate(monday.getDate() - difference) // Go back to the last Monday
    monday.setHours(0, 0, 0, 0) // Set to midnight

    monday.setDate(monday.getDate() + weeksInFuture * 7)

    // resolve bug when today is sunday
    // (was showing incorrect week)
    if (getTodaysDate().getDay() === 0) {
      monday.setDate(monday.getDate() - 7) // Go back to the last Monday
    }

    return monday
  }

  const getDaysOfWeek = (calendarView: CalendarView) => {
    if (calendarView === CalendarView.Week) {
      const startOfWeek = getStartOfWeek(calendarViewOffset)

      return [...Array(7)].map((_, index) => {
        const date = new Date(startOfWeek)
        date.setDate(date.getDate() + index)
        return date
      })
    }

    // day view
    const date = getTodaysDate()
    date.setDate(date.getDate() + calendarViewOffset)

    return [date]
  }

  const daysOfWeek = getDaysOfWeek(calendarView)

  return {
    daysOfWeek,
    next,
    previous,
    reset,
    calendarViewOffset,
    calendarView,
    setCalendarView: updateCalendarView,
  }
}
