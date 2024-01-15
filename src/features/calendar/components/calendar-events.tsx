import { CalendarEvent as CalendarEventType } from '../types/types'
import { CalendarEvent } from './calendar-event'

interface Props {
  events: CalendarEventType[]
  containerRef: HTMLDivElement | null
}

export const CalendarEvents = (props: Props) => {
  const { events, containerRef } = props

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent containerRef={containerRef} key={index} event={event} />
      ))}
    </ul>
  )
}
