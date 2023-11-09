import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";

export const Calendar = () => {
  return (
    <div className="bg-red h-full flex flex-col">
      <CalendarDates />

      <div className="flex overflow-y-auto h-[calc(100%-3rem)]">
        <CalendarHours />
        <CalendarGrid />
      </div>
    </div>
  );
};
