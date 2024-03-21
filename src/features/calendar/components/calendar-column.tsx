import { memo, useMemo } from 'react'
import { CalendarCell } from './calendar-cell'

interface Props {
  day: Date
  containerRef: HTMLDivElement | null
}

export const CalendarColumn = memo(function CalendarColumn(props: Props) {
  const { day, containerRef } = props

  const hours = useMemo(
    () =>
      [...Array(24)].map((_, index) => {
        const date = new Date(day)

        date.setHours(date.getHours() + index)

        return date
      }),
    [day],
  )

  return (
    <div className="border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
      {hours.map((day, index) => (
        <CalendarCell containerRef={containerRef} key={index} day={day} />
      ))}
    </div>
  )
})
