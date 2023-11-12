
import dayjs from "dayjs";
import { useState } from "react"

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
import { CalendarEvent as CalendarEventType } from "./types/calendar-event";
import { PopoverContextProvider } from "./context";

export const Calendar = () => {
  const events: CalendarEventType[] = [
    {
      description: "Planning session",
      duration: 4524,
      startTime: 3600,
      project: "Work",
      column: 1,
    },
    {
      description: "Standup meeting",
      duration: 7254,
      startTime: 3600 * 3,
      project: "Work",
      column: 2,
    },
  ];

  const [currentWeek, setCurrentWeek] = useState(0)

  const getWeekDates = (weeksInFuture = 0) => {
    const currentDate = dayjs().add(weeksInFuture * 7, 'day');
    const currentDayOfWeek = currentDate.day();
    const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Sunday is a special case

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = currentDate.day(-daysSinceMonday + i);

      weekDates.push(date);
    }

    return weekDates;
};

const weeks = getWeekDates(currentWeek)


  return (
    <PopoverContextProvider>
      <FullPageSpaceFillerContailer
        top={
          <ContainerFullWidth>
            <>
              <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
              <CalendarControls
              weeks={weeks}
              next={() => setCurrentWeek(x => x+1)}
              previous={() => setCurrentWeek(x => x-1)}
              reset={() => setCurrentWeek(x => 0)}
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
                  <CalendarGrid />
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
