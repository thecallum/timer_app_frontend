import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarColumn } from './calendar-column'
import { memo } from 'react'
import classNames from 'classnames'

interface Props {
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
}

export const CalendarGrid = memo(function CalendarGrid(props: Props) {
  const { containerRef, gridSizeMultiplier } = props
  const { daysOfWeek } = useCalendarEventsContext()

  return (
    <div
      className={classNames(
        'flex flex-row justify-between border-l border-slate-200 ',
      )}
      style={{ height: `${1536 * gridSizeMultiplier}px` }}
    >
      {daysOfWeek.map((day, index) => (
        <CalendarColumn
          gridSizeMultiplier={gridSizeMultiplier}
          containerRef={containerRef}
          key={index}
          day={day}
        />
      ))}
    </div>
  )
})
