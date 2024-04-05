import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarColumn } from './calendar-column'
import { memo } from 'react'

interface Props {
  containerRef: HTMLDivElement | null
}

export const CalendarGrid = memo(function CalendarGrid(props: Props) {
  const { containerRef } = props

  const { daysOfWeek } = useCalendarEventsContext()

  return (
    <div className="flex flex-row justify-between border-l border-slate-200  h-[192rem]">
      {daysOfWeek.map((day, index) => (
        <CalendarColumn containerRef={containerRef} key={index} day={day} />
      ))}
    </div>
  )
})
