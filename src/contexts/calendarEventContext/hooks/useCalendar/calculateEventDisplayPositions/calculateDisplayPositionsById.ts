import { CalendarEvent } from '@/types/calendarEvents'
import { CalendarEventPosition } from './types'

const INITIAL_DISPLAY_POSITION = 0
const INITIAL_LEFT_POSITION = 0

export const calculateDisplayPositionsById = (
  events: CalendarEvent[],
  parallelEventsById: {
    [key: number]: string[]
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
    .sort((a, b) => a.startTimeInSeconds - b.startTimeInSeconds)
    .forEach((event) => {
      const eventPosition = eventDisplayPositionsByEventId[event.id]

      // 1. grab parallel event positions with ids
      const parallelEvents = getParallelEvents(
        eventPosition.parallelColumnIds,
        eventDisplayPositionsByEventId,
      )

      // 2. identify which displayPositions are taken
      const takenPositions = new Set(
        parallelEvents.map((x) => x.displayPosition),
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

const getParallelEvents = (
  eventIds: string[],
  displayPositionsById: {
    [key: string]: CalendarEventPosition
  },
) => eventIds.map((x) => displayPositionsById[x])

const calculateLeftPosition = (displayPosition: number, width: number) => {
  return (displayPosition - 1) * width
}

const populateInitialDisplayPositions = (
  events: CalendarEvent[],
  parallelEventsById: {
    [key: string]: string[]
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
      parallelIds = parallelEventsById[event.id]
    }

    initialDisplayPositionsById[event.id] = {
      parallelColumnIds: parallelIds,
      displayPosition: INITIAL_DISPLAY_POSITION,
      computedLeft: INITIAL_LEFT_POSITION,
      computedWidth: widthForAllEventsInColumn,
    }
  })

  return initialDisplayPositionsById
}
