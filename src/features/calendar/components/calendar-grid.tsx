import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { CalendarColumn } from "./calendar-column";

export const CalendarGrid = () => {
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
    <div className="flex flex-row flex-shrink-0 justify-between flex-grow border-t border-l border-slate-200  h-[100rem]">
      {[...Array(7)].map((_, index) => {
        return (
          <CalendarColumn events={events.filter((x) => x.column === index)} />
        );
      })}
    </div>
  );
};
