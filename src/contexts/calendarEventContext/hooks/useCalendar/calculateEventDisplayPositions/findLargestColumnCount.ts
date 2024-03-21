export const findLargestColumnCount = (timeslots: {
  [key: number]: string[]
}) => {
  const columnCounts = Object.keys(timeslots)
    .map(Number)
    .map((key) => timeslots[key].length)

  return Math.max(...columnCounts)
}
