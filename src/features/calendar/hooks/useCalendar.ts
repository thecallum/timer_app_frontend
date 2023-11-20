import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useState } from "react";

dayjs.extend(isSameOrAfter);

export const useCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const next = () => setCurrentWeek((x) => x + 1);
  const previous = () => setCurrentWeek((x) => x - 1);
  const reset = () => setCurrentWeek((x) => 0);

  const getStartOfWeek = (date: Dayjs) => {
    return date.startOf("week").add(1, "day"); // Adjust to start week on Monday
  };

  const getWeekDates = (weeksInFuture = 0) => {
    const startOfWeek = getStartOfWeek(dayjs().add(weeksInFuture * 7, "day"));

    return [...Array(7)].map((_, index) => startOfWeek.add(index, "day"));
  };

  return {
    weeks: getWeekDates(currentWeek),
    next,
    previous,
    reset,
  };
};
