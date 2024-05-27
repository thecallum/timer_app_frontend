import { groupEventsByDayOfWeek } from './groupEventsByDayOfWeek'
import {
  CalendarEvent,
  CalendarEventDisplayPosition,
} from '@/types/calendarEvents'
import { getEventsByTimeslot } from './getEventsByTimeslot'
import {
  HEIGHT_FIVE_MINUTES,
  HEIGHT_ONE_MINUTE,
} from '@/constants/calendar-constants'
import { isSameDay } from '@/helpers/timeHelpers'
import { populateInitialDisplayPositions } from './populateInitialDisplayPositions'

export const calculateEventDisplayPositions = (
  allEvents: CalendarEvent[],
  daysOfWeek: Date[],
) => {
  // 1. Group events by day of week
  const eventsGroupedByDay = groupEventsByDayOfWeek(allEvents, daysOfWeek)

  // 2. get display positions for each event
  return eventsGroupedByDay.map((eventsForDay, columnIndex) => {
    const displayPositionsById: {
      [key: string]: CalendarEventDisplayPosition
    } = {}

    const dayOfWeek = daysOfWeek[columnIndex]
    const timeSlots = getEventsByTimeslot(eventsForDay, dayOfWeek)

    const initialDisplayPositions = populateInitialDisplayPositions(
      eventsForDay,
      columnIndex,
      timeSlots,
    )

    const mostParalellEvents = timeSlots.reduce(
      (longest, current) => (current.size > longest ? current.size : longest),
      1,
    )

    let largestColumnWidth = 1

    eventsForDay
      // sort by oldest first
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .forEach((event) => {
        const displayPosition = initialDisplayPositions[event.id]

        // update largestColumnWidth
        largestColumnWidth = Math.max(
          largestColumnWidth,
          displayPosition.largestTimeslotContainingThisEvent,
        )

        // 4. assign the position
        displayPosition.eventColumnOrder = calculateEventColumnOrder(
          displayPosition.idsOfEventsOfLargestTimeSlots,
          initialDisplayPositions,
        )

        displayPosition.top = calculateEventTopPosition(event, dayOfWeek)
        displayPosition.height = calculateEventHeight(event, dayOfWeek)
        displayPosition.width = 1 / mostParalellEvents

        // 5. calculate the left position based on its display position
        displayPosition.left = calculateLeftPosition(
          displayPosition.eventColumnOrder,
          displayPosition.width,
        )

        displayPositionsById[displayPosition.eventId] = displayPosition
      })

    // So far, we have worked out the width based so that all events can fit

    // now were looking for events that could potentially be expanded.
    // so any events with less parallelEvents than the max
    // (future reference, we could recursively do this from largest to smallest for better resizing)
    // eg 7, 6, 5, 4, 3, 2, 1...

    const eventsToUpdate = Object.keys(displayPositionsById).filter((x) => {
      const displayPosition = displayPositionsById[x]

      // less than largest parallel events
      return (
        displayPosition.largestTimeslotContainingThisEvent < largestColumnWidth
      )
    })

    // the above events can be expanded because the number of parallel events is less than the max
    //    (which is what the current sizing it based on)

    // pared events are two events that can be expanded that share the same space
    // so we should expand these at the same time, and distribute the additional width
    const pairedEvents = findPairedEvents(eventsToUpdate, displayPositionsById)

    pairedEvents.forEach((eventPair) => {
      const primaryEventId = eventPair[0]
      const primaryEvent = displayPositionsById[primaryEventId]

      const pairSet = new Set<string>(eventPair)

      // fetch the display positions of other events that have matching timeslots,
      // ordered by display position/

      const displayPositionsOfOtherEvents = [
        ...new Set(
          primaryEvent.idsOfEventsOfLargestTimeSlots.map((x) => [...x]).flat(),
        ),
      ]
        .map((x) => displayPositionsById[x])
        .sort((a, b) => a.eventColumnOrder - b.eventColumnOrder)

      // identify the open space for the eventPair to expand to, by finding the most left position,
      // and the most right positino

      let foundElementYet = false

      let mostLeftPosition = 0
      let mostRightPosition = 1

      displayPositionsOfOtherEvents.forEach((displayPosition) => {
        if (pairSet.has(displayPosition.eventId.toString())) {
          // in middle section (looking at one of the pairSet positions)
          // switch found element to true so we can start looking at the right position
          foundElementYet = true
          return
        }

        if (!foundElementYet) {
          // still looking for most left position
          mostLeftPosition = Math.max(
            mostLeftPosition,
            displayPosition.left + displayPosition.width,
          )
          return
        }

        // passed the middle section, looking for most right position
        mostRightPosition = Math.min(mostRightPosition, displayPosition.left)
      })

      // calculate width based on the unused space of fixed elements
      const totalAvailableGapSize = mostRightPosition - mostLeftPosition

      // distribute the total available space between each event
      const newCalculatedWidth = totalAvailableGapSize / eventPair.length

      let currentLeft = 0

      eventPair
        .map((id) => displayPositionsById[id])
        .sort((a, b) => a.eventColumnOrder - b.eventColumnOrder)

        .forEach((event, index) => {
          event.width = newCalculatedWidth

          if (index === 0) {
            // first element most left
            currentLeft = mostLeftPosition
          } else {
            // append the width (to offset the previous element(s))
            currentLeft += newCalculatedWidth
          }

          event.left = currentLeft
        })
    })

    return Object.keys(displayPositionsById).map(
      (id) => displayPositionsById[id],
    )
  })
}

const calculateLeftPosition = (displayPosition: number, width: number) => {
  return (displayPosition - 1) * width
}

const calculateEventColumnOrder = (
  idsOfEventsOfLargestTimeSlots: Set<string>[],
  initialDisplayPositions: {
    [key: string]: CalendarEventDisplayPosition
  },
) => {
  // 1. grab parallel event positions with ids

  // there can be multiple occurances of parallelEvents with the same count
  // we can just pick the first for our usecase
  const parallelEvents = [...idsOfEventsOfLargestTimeSlots[0]]

  const parallelEventDisplayPositions = parallelEvents.map(
    (x) => initialDisplayPositions[x],
  )

  // 2. identify which displayPositions are taken
  const takenPositions = new Set(
    parallelEventDisplayPositions.map((x) => x.eventColumnOrder),
  )

  // 3. find the next, smallest, display position
  let nextDisplayPosition = 1
  while (takenPositions.has(nextDisplayPosition)) {
    nextDisplayPosition++
  }

  return nextDisplayPosition
}

const calculateEventTopPosition = (event: CalendarEvent, dayOfWeek: Date) => {
  const { startTime, startTimeInMinutes } = event

  // if start time is same day, use normal calculation
  // event started today
  if (isSameDay(startTime, dayOfWeek)) {
    return startTimeInMinutes * HEIGHT_ONE_MINUTE
  }

  // started on different day, so must be at top
  return 0
}

const calculateEventHeight = (event: CalendarEvent, dayOfWeek: Date) => {
  const { durationInMinutes, startTime, endTime } = event

  // if end time is same day, use normal.
  if (isSameDay(startTime, dayOfWeek)) {
    return Math.max(durationInMinutes * HEIGHT_ONE_MINUTE, HEIGHT_FIVE_MINUTES)
  }

  // event ends on this day
  if (isSameDay(endTime, dayOfWeek)) {
    const numberOfMins = endTime.getMinutes() + endTime.getHours() * 60
    return numberOfMins * HEIGHT_ONE_MINUTE
  }

  // full height
  return HEIGHT_ONE_MINUTE * 60 * 24
}

const findPairedEvents = (
  eventsToUpdate: string[],
  displayPositionsById: {
    [key: string]: CalendarEventDisplayPosition
  },
) => {
  const idsToUpdate = new Set<string>(eventsToUpdate)

  // we need to find paired events. these are events that want to expand into the same shared occupied space
  // by pairing these events, we can update them both at the same time, and ensure they arent overlapping each other

  const pairedEvents: string[][] = []

  idsToUpdate.forEach((eventId) => {
    idsToUpdate.delete(eventId)
    const event = displayPositionsById[eventId]

    // identify sibling events
    const pairedEventsForThisEvent: string[] = [eventId.toString()]

    event.idsOfEventsOfLargestTimeSlots.forEach((id) => {
      if (idsToUpdate.has(id.toString())) {
        pairedEventsForThisEvent.push(id.toString())
        idsToUpdate.delete(id.toString())
      }
    })

    pairedEvents.push(pairedEventsForThisEvent)
  })

  return pairedEvents
}
