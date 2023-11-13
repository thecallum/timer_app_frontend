import dayjs from "dayjs";
import { useState } from "react";

export const useCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const next = () => setCurrentWeek((x) => x + 1);
  const previous = () => setCurrentWeek((x) => x - 1);
  const reset = () => setCurrentWeek((x) => 0);

  const getCalendarEvents = (week = 0) => {
    if (week !== 0) return [];

    return [
      {
        description: "Planning session",
        start: dayjs("Tue Nov 07 2023 01:15:53 GMT+0000"),
        end: dayjs("Tue Nov 07 2023 03:15:53 GMT+0000"),
        project: "Work",
      },
      {
        description: "Standup meeting",
        start: dayjs("Thu Nov 09 2023 03:30:53 GMT+0000"),
        end: dayjs("Thu Nov 09 2023 05:02:28 GMT+0000"),
        project: "Work",
      },
    ];
  };

  const getWeekDates = (weeksInFuture = 0) => {
    const currentDate = dayjs().add(weeksInFuture * 7, "day");
    const currentDayOfWeek = currentDate.day();
    const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Sunday is a special case

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = currentDate.day(-daysSinceMonday + i);

      weekDates.push(date);
    }

    return weekDates;
  };

  const events = getCalendarEvents(currentWeek);
  const weeks = getWeekDates(currentWeek);

  return {
    events,
    weeks,
    next,
    previous,
    reset,
  };
};
