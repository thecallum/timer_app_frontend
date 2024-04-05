import { CalendarEvent } from '@/types/calendarEvents'

export const calculateDuration = (events: CalendarEvent[]) => {
  const totalDurationInSeconds = events.reduce(
    (accumulator, currentValue) => accumulator + currentValue.durationInSeconds,
    0,
  )

  return Math.floor(totalDurationInSeconds)
}
