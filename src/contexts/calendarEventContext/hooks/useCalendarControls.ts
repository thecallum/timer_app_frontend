import { getTodaysDate } from '@/helpers/getTodaysDate'
import { useState } from 'react'

export const useCalendarControls = () => {
  const [currentWeek, setCurrentWeek] = useState(0)

  const next = () => setCurrentWeek((x) => x + 1)
  const previous = () => setCurrentWeek((x) => x - 1)
  const reset = () => setCurrentWeek(() => 0)

  const getStartOfWeek = (weeksInFuture: number) => {
    // const dayCount = weeksInFuture * 7

    const date = getTodaysDate()
    // date.setHours(0, 0, 0, 0) // Set to midnight

    // // get start of week
    // if (date.getDay() !== 0) {
    //   date.setDate(date.getTime() - 1000 * 60 * 60 * 24 * date.getDay())
    // }

    // console.log({ date })

    const dayOfWeek = date.getDay() // Sunday - 0, Monday - 1, etc.
    const difference = (dayOfWeek + 6) % 7 // Calculate difference from Monday
    const monday = new Date(date)
    monday.setDate(monday.getDate() - difference) // Go back to the last Monday
    monday.setHours(0, 0, 0, 0) // Set to midnight

    monday.setDate(monday.getDate() + weeksInFuture * 7)

    // console.log({ day: getTodaysDate().getDay() })

    // resolve bug when today is sunday
    // (was showing incorrect week)
    if (getTodaysDate().getDay() === 0) {
      monday.setDate(monday.getDate() - 7) // Go back to the last Monday

      // monday = mon.add(-7, 'day')
    }

    return monday

    // const startOfWeek = getTodaysDate()

    // .startOf('week')
    // .add(1, 'day') // Adjust to start week on Monday
    // .add(dayCount, 'day')

    // return date
  }

  const getWeekDates = () => {
    const startOfWeek = getStartOfWeek(currentWeek)

    return [...Array(7)].map((_, index) => {
      const date = new Date(startOfWeek)

      date.setDate(date.getDate() + index)

      return date

      // startOfWeek.set .add(index, 'day')
    })
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
