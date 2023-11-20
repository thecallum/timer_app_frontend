import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useState } from "react";

dayjs.extend(isSameOrAfter);

export const useCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const next = () => setCurrentWeek((x) => x + 1);
  const previous = () => setCurrentWeek((x) => x - 1);
  const reset = () => setCurrentWeek((x) => 0);

  const getWeekDates = (weeksInFuture = 0) => {
    const currentDate = dayjs().add(weeksInFuture * 7, "day");
    const currentDayOfWeek = currentDate.day();
    const daysSinceMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = currentDate.add(daysSinceMonday + i, "day");

      weekDates.push(date);
    }

    return weekDates;
  };

  return {
    weeks: getWeekDates(currentWeek),
    next,
    previous,
    reset,
  };
};
