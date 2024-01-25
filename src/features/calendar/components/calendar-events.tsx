import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { CalendarEvent } from './calendar-event'

interface Props {
  containerRef: HTMLDivElement | null
}

export const CalendarEvents = (props: Props) => {
  const { containerRef } = props
  const { events } = useCalendarEventsContext()

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent containerRef={containerRef} key={index} event={event} />
      ))}
    </ul>
  )
}
