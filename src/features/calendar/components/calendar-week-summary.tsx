import { formatDuration } from '@/helpers/formatter'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { calculateEventDurationForDayOfWeek } from '@/helpers/timeHelpers'
import { CalendarView } from '../views'

interface Props {
  calendarView: CalendarView
}

export const CalendarWeekSummary = (props: Props) => {
  const { calendarView } = props

  const {
    events: displayPositionsById,
    daysOfWeek,
    eventsById,
  } = useCalendarEventsContext()

  let duration = 0

  daysOfWeek.forEach((dayOfWeek, index) => {
    const events = displayPositionsById[index].map((x) => eventsById[x.eventId])

    duration += calculateEventDurationForDayOfWeek(dayOfWeek, events)
  })

  return (
    <div className="bg-slate-100 h-14 px-6 items-center mb-4 justify-center text-slate-600 shadow-sm rounded w-full hidden sm:flex sm:mb-0 sm:mr-4 sm:w-auto shrink-0">
      <span>{calendarView} Total</span>
      <span className="w-2 h-2 bg-slate-600 block rounded-full mx-3"></span>
      <span aria-label="Week total duration">{formatDuration(duration)}</span>
    </div>
  )
}
