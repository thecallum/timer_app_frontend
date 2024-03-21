export const findParallelEventsById = (timeSlots: {
  [key: number]: string[]
}) => {
  const parallelEvents: {
    [key: string]: string[]
  } = {}

  Object.keys(timeSlots)
    .map(Number)
    .map((key) => timeSlots[key])
    .filter((x) => x.length > 1)
    .forEach((timeslot) => {
      timeslot.forEach((eventId) => {
        if (Object.prototype.hasOwnProperty.call(parallelEvents, eventId)) {
          parallelEvents[eventId] = [...parallelEvents[eventId], ...timeslot]
        } else {
          parallelEvents[eventId] = [...timeslot]
        }
      })
    })

  return parallelEvents
}
