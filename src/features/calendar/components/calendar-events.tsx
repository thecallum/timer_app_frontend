import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarEvent } from './calendar-event'

interface Props {
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
}

export const CalendarEvents = (props: Props) => {
  const { containerRef, gridSizeMultiplier } = props
  const { events, daysOfWeek } = useCalendarEventsContext()

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent
          gridSizeMultiplier={gridSizeMultiplier}
          containerRef={containerRef}
          key={index}
          event={event}
          columnCount={daysOfWeek.length}
        />
      ))}
    </ul>
  )
}
