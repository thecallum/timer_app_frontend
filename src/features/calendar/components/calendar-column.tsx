import { CalendarEvent } from "../types/calendar-event";
import { CalendarCell } from "./calendar-cell";
import { CalendarEvents } from "./calendar-events";

interface Props {
  events: CalendarEvent[];
}

export const CalendarColumn = (props: Props) => {
  const { events } = props;

  return (
    <div className=" border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
      {[...Array(25)].map((_, index) => (
        <CalendarCell key={index} />
      ))}

      <CalendarEvents events={events} />
    </div>
  );
};
