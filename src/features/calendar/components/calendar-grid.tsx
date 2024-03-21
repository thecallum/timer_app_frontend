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
    () =>
      daysOfWeek.map((day) => {
        const date = new Date(day)
        date.setHours(0, 0, 0, 0)

        return date
      }),
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
