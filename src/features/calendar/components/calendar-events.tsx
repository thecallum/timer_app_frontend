import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { CalendarEvent } from "./calendar-event";

interface Props {
  events: CalendarEventType[];
}

export const CalendarEvents = (props: Props) => {
  const { events } = props;

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event) => (
        <CalendarEvent key={event.description} event={event} />
      ))}
    </ul>
  );
};
