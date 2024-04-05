import { DayOfWeek } from '@/types/calendarEvents'

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
