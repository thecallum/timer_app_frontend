import dayjs from 'dayjs'
import { useState } from 'react'

export const useCalendarControls = () => {
  const [currentWeek, setCurrentWeek] = useState(0)

  const next = () => setCurrentWeek((x) => x + 1)
  const previous = () => setCurrentWeek((x) => x - 1)
  const reset = () => setCurrentWeek(() => 0)

  const getStartOfWeek = (weeksInFuture: number) => {
    const dayCount = weeksInFuture * 7

    return dayjs()
      .startOf('week')
      .add(1, 'day') // Adjust to start week on Monday
      .add(dayCount, 'day')
  }

  const getWeekDates = () => {
    const startOfWeek = getStartOfWeek(currentWeek)

    return [...Array(7)].map((_, index) => startOfWeek.add(index, 'day'))
  }

  const daysOfWeek = getWeekDates()
  const showingCurrentWeek = currentWeek === 0

  return {
    daysOfWeek,
    next,
    previous,
    reset,
    currentWeek,
    showingCurrentWeek,
  }
}
