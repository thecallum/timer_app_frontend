import { formatDuration } from '@/helpers/formatter'
import { calculateDuration } from '../helpers/duration'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'

export const CalendarWeekSummary = () => {
  const { events } = useCalendarEventsContext()

  const duration = calculateDuration(events)

  return (
    <div className="bg-slate-100 h-14 px-6 flex items-center text-slate-600 shadow-sm rounded">
      <span>Week Total</span>
      <span className="w-2 h-2 bg-slate-600 block rounded-full mx-3"></span>
      <span>{formatDuration(duration)}</span>
    </div>
  )
}
