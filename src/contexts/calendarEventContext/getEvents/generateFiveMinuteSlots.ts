import { ParallelEventSlot } from "./types";

export const generateFiveMinuteSlots = () => {
  const slots: ParallelEventSlot[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const startTimeInSeconds = (hour * 60 + minute) * 60;
      const endTimeInSeconds = startTimeInSeconds + 300;

      slots.push({ startTimeInSeconds, endTimeInSeconds });
    }
  }

  return slots;
};
