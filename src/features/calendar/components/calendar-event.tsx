import {
  CalendarEventDisplayPosition as DisplayType,
  CalendarEvent as CalendarEventType,
} from '@/types/calendarEvents'
import { CalendarEventDisplayPosition } from './CalendarEventDisplayPosition'

interface Props {
  event: CalendarEventType
  eventDisplayPosition: DisplayType
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
  columnCount: number
}

export const CalendarEvent = (props: Props) => {
  const {
    event,
    eventDisplayPosition,
    containerRef,
    gridSizeMultiplier,
    columnCount,
  } = props

  return (
    <CalendarEventDisplayPosition
      displayPosition={eventDisplayPosition}
      event={event}
      containerRef={containerRef}
      gridSizeMultiplier={gridSizeMultiplier}
      columnCount={columnCount}
    />
  )
}
