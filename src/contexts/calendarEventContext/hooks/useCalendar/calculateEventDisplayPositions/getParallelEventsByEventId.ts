export const getParallelEventsByEventId = (timeSlots: Set<string>[]) => {
  const parallelEvents: {
    [key: string]: Set<string>
  } = {}

  // For each occurance of overlapping event, create a value for each event
  // eg [event1]: [event1, event2]

  timeSlots.forEach((timeslot) => {
    // needs to be at least two events
    if (timeslot.size < 2) return

    timeslot.forEach((eventId) => {
      if (Object.prototype.hasOwnProperty.call(parallelEvents, eventId)) {
        parallelEvents[eventId] = new Set<string>([
          ...parallelEvents[eventId],
          ...timeslot,
        ])
      } else {
        parallelEvents[eventId] = new Set<string>(timeslot)
      }
    })
  })

  return parallelEvents
}
