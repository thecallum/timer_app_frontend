export type ParallelEventSlot = {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
};

export interface ICalendarFiveMinuteSlot {
  startTimeInSeconds: number;
  endTimeInSeconds: number;
  eventIds: string[];
}

export type CalendarEventPosition = {
  parallelColumnIds: string[];
  displayPosition: number;
  computedWidth: number;
  computedLeft: number;
};
