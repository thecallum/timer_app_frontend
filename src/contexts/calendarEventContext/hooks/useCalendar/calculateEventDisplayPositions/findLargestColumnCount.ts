import { ICalendarFiveMinuteSlot } from './types'

export const findLargestColumnCount = (rows: ICalendarFiveMinuteSlot[]) => {
  return Math.max(...rows.map((x) => x.eventIds.length))
}
