import { ICalendarEvent, IProject } from "../types/types";
import { CalendarEvent } from "./calendar-event";

interface Props {
  events: ICalendarEvent[];
  showAddProjectModal: () => void;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
}

export const CalendarEvents = (props: Props) => {
  const { events, showAddProjectModal, projects, containerRef } = props;

  return (
    <ul className="absolute top-0 left-0 w-full ">
      {events.map((event, index) => (
        <CalendarEvent
          containerRef={containerRef}
          projects={projects}
          key={index}
          event={event}
          showAddProjectModal={showAddProjectModal}
        />
      ))}
    </ul>
  );
};
