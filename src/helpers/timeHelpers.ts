import { CalendarEvent, DayOfWeek } from '@/types/calendarEvents'

const getMsValue = (date: Date) => {
  const midnight = new Date(date)
  midnight.setHours(0)
  midnight.setMinutes(0)
  midnight.setSeconds(0)
  midnight.setMilliseconds(0)

  const diff = date.getTime() - midnight.getTime()

  return diff
}

export const getMinuteValue = (date: Date) => {
  const diff = getMsValue(date)

  return diff / 1000 / 60
}

export const getSecondValue = (date: Date) => {
  const diff = getMsValue(date)

  return diff / 1000
}

export const getDayOfWeek = (date: Date): DayOfWeek => {
  // Sunday is zero, replace with 7
  // const dayOfWeek = this.startTime.day()

  const dayOfWeek = date.getDay()

  if (dayOfWeek === 0) return 7

  return dayOfWeek as DayOfWeek
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getMidnightDates(startDate: Date, endDate: Date): Date[] {
  const midnightDates: Date[] = []
  const currentDate = new Date(startDate)

  // Loop through each day between startDate and endDate
  while (currentDate <= endDate) {
    // Set the time to midnight
    currentDate.setHours(0, 0, 0, 0)
    midnightDates.push(new Date(currentDate)) // Push a new Date object to prevent reference sharing
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return midnightDates
}

export const calculateEventDurationForDayOfWeek = (
  dayOfWeek: Date,
  events: CalendarEvent[],
) => {
  let duration = 0

  events.forEach((event) => {
    // 1. if same day, calculate as normal
    if (
      isSameDay(event.startTime, dayOfWeek) &&
      isSameDay(event.endTime, dayOfWeek)
    ) {
      duration += event.durationInSeconds
      return
    }

    // 2. if starts today
    if (isSameDay(event.startTime, dayOfWeek)) {
      // calculate duration for today

      let durationForEvent = 86400 // start as whole day

      durationForEvent -= event.startTime.getSeconds()
      durationForEvent -= event.startTime.getMinutes() * 60
      durationForEvent -= event.startTime.getHours() * 60 * 60

      duration += durationForEvent
      return
    }

    // 3. if event ends today
    if (isSameDay(event.endTime, dayOfWeek)) {
      let durationForEvent = 0

      durationForEvent += event.endTime.getSeconds()
      durationForEvent += event.endTime.getMinutes() * 60
      durationForEvent += event.endTime.getHours() * 60 * 60

      duration += durationForEvent
      return
    }

    // else, event spans full period
    if (event.startTime < dayOfWeek && event.endTime > dayOfWeek) {
      duration += 86400
    }
  })

  return duration
}
