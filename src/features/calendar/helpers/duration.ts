import { CalendarEvent } from "../types/types";

export const calculateDuration = (events: CalendarEvent[]) => {
  const totalDurationInSeconds = events.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.duration.durationInSeconds,
    0
  );

  return totalDurationInSeconds;
};
