import dayjs from "dayjs";
import { useState } from "react";

import {
  ContainerFullWidth,
  PageContainerLarge,
} from "@/components/page-container";
import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";
import { CalendarControls } from "./components/calendar-controls";
import { FullPageSpaceFillerContailer } from "@/components/full-page-space-fillter-container";
import { CalendarEvents } from "./components/calendar-events";
import {
  CalendarEvent
} from "./types/calendar-event";
import { PopoverContextProvider } from "./context";

export const Calendar = (): CalendarEvent => {
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

  const [currentWeek, setCurrentWeek] = useState(0);

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

  return (
    <PopoverContextProvider>
      <FullPageSpaceFillerContailer
        top={
          <ContainerFullWidth>
            <>
              <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
              <CalendarControls
                weeks={weeks}
                next={() => setCurrentWeek((x) => x + 1)}
                previous={() => setCurrentWeek((x) => x - 1)}
                reset={() => setCurrentWeek((x) => 0)}
              />
            </>
          </ContainerFullWidth>
        }
      >
        <div className="flex justify-center mt-4 h-full  ">
          <PageContainerLarge>
            <div className="h-full flex flex-col">
              <CalendarDates weeks={weeks} />

              <div className="flex overflow-y-auto border-t border-slate-200 relative">
                <CalendarHours />
                <div className="relative h-full flex-grow flex-shrink-0">
                  <CalendarGrid weeks={weeks} />
                  <CalendarEvents events={events} />
                </div>
              </div>
            </div>
          </PageContainerLarge>
        </div>
      </FullPageSpaceFillerContailer>
    </PopoverContextProvider>
  );
};
