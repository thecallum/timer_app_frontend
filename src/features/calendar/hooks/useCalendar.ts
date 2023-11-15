import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useState } from "react";
import { ICalendarEvent, ProjectColors, projectColors } from "../types/types";

import { v4 as uuidv4 } from 'uuid';

dayjs.extend(isSameOrAfter);

const placeholderEvents: ICalendarEvent[] = [
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Tue Nov 07 2023 01:15:53 GMT+0000"),
    end: dayjs("Tue Nov 07 2023 03:15:53 GMT+0000"),
    project: {
      name: "Work",
      colors: projectColors[ProjectColors.Amber],
    },
  },
  {
    id: uuidv4(),
    description: "Standup meeting",
    start: dayjs("Thu Nov 09 2023 03:30:53 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 05:02:28 GMT+0000"),
    project: {
      name: "Planning",
      colors: projectColors[ProjectColors.Lime],
    },
  },
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Thu Nov 09 2023 07:12:06 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 09:04:28 GMT+0000"),
    project: {
      name: "Work",
      colors: projectColors[ProjectColors.Amber],
    },
  },
];

export const useCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const [events, setEvents] = useState(placeholderEvents)

  const updateEvent = (event: ICalendarEvent) => {


    setEvents(currentState => currentState.slice().map(x => (x.id === event.id) ? event : x))

  }


  const next = () => setCurrentWeek((x) => x + 1);
  const previous = () => setCurrentWeek((x) => x - 1);
  const reset = () => setCurrentWeek((x) => 0);

  const getCalendarEvents = (week = 0): ICalendarEvent[] => {
    const weekDates = getWeekDates(week);

    const startOfWeek = weekDates[0];
    const endOfWeek = weekDates[6];

    return events.filter((x) => {
      const eventDay = x.start.startOf("day");

      return (
        eventDay.isSameOrAfter(startOfWeek) && eventDay.isBefore(endOfWeek)
      );
    });
  };

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
    events: getCalendarEvents(currentWeek),
    weeks: getWeekDates(currentWeek),
    next,
    previous,
    reset,
    updateEvent
  };
};
