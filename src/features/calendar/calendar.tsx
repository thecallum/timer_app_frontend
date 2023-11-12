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

  return (
    <div>
      <FullPageSpaceFillerContailer
        top={
          <ContainerFullWidth>
            <>
              <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
              <CalendarControls />
            </>
          </ContainerFullWidth>
        }
      >
        <div className="flex justify-center mt-4 h-full  ">
          <PageContainerLarge>
            <div className="h-full flex flex-col">
              <CalendarDates />

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
    </div>
  );
};
