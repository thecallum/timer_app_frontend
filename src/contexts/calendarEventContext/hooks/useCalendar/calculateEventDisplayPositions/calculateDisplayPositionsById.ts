import { CalendarEvent } from '@/types/calendarEvents'
import { CalendarEventPosition } from './types'

const INITIAL_DISPLAY_POSITION = 0
const INITIAL_LEFT_POSITION = 0

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
    .sort((a, b) => a.startTimeInSeconds - b.startTimeInSeconds)
    .forEach((event) => {
      const eventPositions = eventDisplayPositionsByEventId[event.id]

      eventPositions.forEach((eventPosition) => {
        // const eventPosition = eventPositions[0]

        // 1. grab parallel event positions with ids
        const parallelEvents = eventPosition.parallelColumnIds.map((x) => {
          const parallelEvent = eventDisplayPositionsByEventId[x]

          // ?? this may need to very which event position details we get
          return parallelEvent[0]
        })

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
    [key: string]: CalendarEventPosition[]
  } = {}

  const widthForAllEventsInColumn = 1 / largestColumnCount

  events.forEach((event) => {
    let parallelIds: string[] = []

    if (Object.prototype.hasOwnProperty.call(parallelEventsById, event.id)) {
      parallelIds = [...parallelEventsById[event.id]]
    }

    const position = {
      parallelColumnIds: parallelIds,
      displayPosition: INITIAL_DISPLAY_POSITION,
      computedLeft: INITIAL_LEFT_POSITION,
      computedWidth: widthForAllEventsInColumn,
    }

    if (event.id in initialDisplayPositionsById) {
      initialDisplayPositionsById[event.id].push(position)
    } else {
      initialDisplayPositionsById[event.id] = [position]
    }
  })

  return initialDisplayPositionsById
}
