import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarEvent } from './calendar-event'

interface Props {
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
}

export const CalendarEvents = (props: Props) => {
  const { containerRef, gridSizeMultiplier } = props
  const {
    events: displayPositionsByColumn,
    daysOfWeek,
    eventsById,
  } = useCalendarEventsContext()

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {displayPositionsByColumn.map((column) => (
        <>
          {column.map((eventDisplayPosition, index) => (
            <CalendarEvent
              gridSizeMultiplier={gridSizeMultiplier}
              containerRef={containerRef}
              key={index}
              event={eventsById[eventDisplayPosition.eventId]}
              eventDisplayPosition={eventDisplayPosition}
              columnCount={daysOfWeek.length}
            />
          ))}
        </>
      ))}
    </ul>
  )
}
