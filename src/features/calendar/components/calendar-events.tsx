import { ICalendarEvent, IProject } from "../types/types";
import { CalendarEvent } from "./calendar-event";

interface Props {
  events: ICalendarEvent[];
  showAddProjectModal: () => void;
  projects: IProject[];
  updateEvent: (event: ICalendarEvent) => void;
}

export const CalendarEvents = (props: Props) => {
  const { events, showAddProjectModal, projects, updateEvent } = props;

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent
          projects={projects}
          key={index}
          event={event}
          showAddProjectModal={showAddProjectModal}
          updateEvent={updateEvent}
        />
      ))}
    </ul>
  );
};
