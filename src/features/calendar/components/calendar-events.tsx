import { ICalendarEvent as CalendarEventType } from "../types/types";
import { CalendarEvent } from "./calendar-event";

interface Props {
  events: CalendarEventType[];
  showAddProjectModal: () => void;
}

export const CalendarEvents = (props: Props) => {
  const { events, showAddProjectModal } = props;

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent key={index} event={event} showAddProjectModal={showAddProjectModal} />
      ))}
    </ul>
  );
};
