export interface CalendarFiveMinuteSlot {
  startTimeInSeconds: number
  eventIds: string[]
}

export type CalendarEventPosition = {
  parallelColumnIds: string[]
  displayPosition: number
  computedWidth: number
  computedLeft: number
}
