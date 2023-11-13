import {
  ContainerFullWidth,
  PageContainerLarge,
} from "@/components/page-container";
import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";
import { FullPageSpaceFillerContailer } from "@/components/full-page-space-fillter-container";
import { CalendarEvents } from "./components/calendar-events";
import { ICalendarEvent } from "./types/types";
import { CalendarWeekSelect } from "./components/calendar-week-select";
import { CalendarWeekSummary } from "./components/calendar-week-summary";
import { useCalendar } from "./hooks/useCalendar";

export const Calendar = (): ICalendarEvent => {
  const { events, weeks, next, previous, reset } = useCalendar();

  return (
    <FullPageSpaceFillerContailer
      top={
        <ContainerFullWidth>
          <>
            <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
            <div className="flex justify-between items-start">
              <CalendarWeekSummary />

              <CalendarWeekSelect
                weeks={weeks}
                next={next}
                previous={previous}
                reset={reset}
              />
            </div>
          </>
        </ContainerFullWidth>
      }
    >
      <div className="flex justify-center mt-4 h-full  ">
        <PageContainerLarge>
          <div className="h-full flex flex-col">
            <CalendarDates weeks={weeks} />

            <div className="flex overflow-y-auto overflow-x-hidden border-t border-slate-200 relative">
              <CalendarHours />
              <div className="relative h-[calc(24*64px)] overflow-hidden flex-grow flex-shrink-0">
                <CalendarGrid weeks={weeks} />
                <CalendarEvents events={events} />
              </div>
            </div>
          </div>
        </PageContainerLarge>
      </div>
    </FullPageSpaceFillerContailer>
  );
};
