import { CalendarEvent as CalendarEventType } from '@/types/calendarEvents'
import { CalendarEventDisplayPosition } from './CalendarEventDisplayPosition'

interface Props {
  event: CalendarEventType
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
}

export const CalendarEvent = (props: Props) => {
  const { event, containerRef, gridSizeMultiplier } = props

  return (
    <>
      {event.displayPositions.map((x, index) => (
        <CalendarEventDisplayPosition
          displayPosition={x}
          event={event}
          key={index}
          containerRef={containerRef}
          gridSizeMultiplier={gridSizeMultiplier}
        />
      ))}
    </>
  )
}
