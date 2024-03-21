import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarColumn } from './calendar-column'
import { memo, useMemo } from 'react'

interface Props {
  containerRef: HTMLDivElement | null
}

export const CalendarGrid = memo(function CalendarGrid(props: Props) {
  const { containerRef } = props

  const { daysOfWeek } = useCalendarEventsContext()

  const columnDays = useMemo(
    () => daysOfWeek.map((day) => day.startOf('day')),
    [daysOfWeek],
  )

  return (
    <div className="flex flex-row justify-between border-l border-slate-200  h-[192rem]">
      {columnDays.map((day, index) => (
        <CalendarColumn containerRef={containerRef} key={index} day={day} />
      ))}
    </div>
  )
})
