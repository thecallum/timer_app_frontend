import { CalendarEvent } from '@/types/calendarEvents'
import { CalendarEventPosition } from './types'

export const calculateDisplayPositionsById = (
  events: CalendarEvent[],
  parallelEventsById: {
    [key: number]: Set<string>
  },
  largestColumnCount: number,
) => {
  const eventDisplayPositionsByEventId = populateInitialDisplayPositions(
    events,
    parallelEventsById,
    largestColumnCount,
  )

  events
    // sort by oldest first
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .forEach((event) => {
      const eventPosition = eventDisplayPositionsByEventId[event.id]

      // 1. grab parallel event positions with ids
      const parallelEventDisplayPositions = eventPosition.parallelColumnIds.map(
        (x) => eventDisplayPositionsByEventId[x],
      )

      // 2. identify which displayPositions are taken
      const takenPositions = new Set(
        parallelEventDisplayPositions.map((x) => x.displayPosition),
      )

      // 3. find the next, smallest, display position
      let nextDisplayPosition = 1
      while (takenPositions.has(nextDisplayPosition)) {
        nextDisplayPosition++
      }

      // 4. assign the position
      eventPosition.displayPosition = nextDisplayPosition

      // 5. calculate the left position based on its display position
      eventPosition.computedLeft = calculateLeftPosition(
        nextDisplayPosition,
        eventPosition.computedWidth,
      )
    })

  return eventDisplayPositionsByEventId
}

const calculateLeftPosition = (displayPosition: number, width: number) => {
  return (displayPosition - 1) * width
}

const populateInitialDisplayPositions = (
  events: CalendarEvent[],
  parallelEventsById: {
    [key: string]: Set<string>
  },
  largestColumnCount: number,
) => {
  const initialDisplayPositionsById: {
    [key: string]: CalendarEventPosition
  } = {}

  const widthForAllEventsInColumn = 1 / largestColumnCount

  events.forEach((event) => {
    let parallelIds: string[] = []

    if (Object.prototype.hasOwnProperty.call(parallelEventsById, event.id)) {
      parallelIds = [...parallelEventsById[event.id]]
    }

    const position = {
      parallelColumnIds: parallelIds,
      displayPosition: 0,
      computedLeft: 0,
      computedWidth: widthForAllEventsInColumn,
    }

    initialDisplayPositionsById[event.id] = position
  })

  return initialDisplayPositionsById
}
