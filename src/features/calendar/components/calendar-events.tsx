import { ICalendarEvent as CalendarEventType } from "../types/types";
import { CalendarEvent } from "./calendar-event";

interface Props {
  events: CalendarEventType[];
}

export const CalendarEvents = (props: Props) => {
  const { events } = props;

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent key={index} event={event} />
      ))}
    </ul>
  );
};
