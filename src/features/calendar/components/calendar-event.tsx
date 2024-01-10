import { getColor } from "@/helpers/colors";
import { CalendarEvent as CalendarEventType, IProject } from "../types/types";
import { CalendarEventView } from "./calendar-event-view";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: CalendarEventType;
  showAddProjectModal: () => void;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
}

const HEIGHT_ONE_MINUTE = (64 / 60) * 2;

export const CalendarEvent = (props: Props) => {
  const { event, showAddProjectModal, projects, containerRef } = props;
  const {
    description,
    project,
    dayOfWeek,
    durationInSeconds,
    durationInMinutes,
    startTimeInMinutes,
    left,
    width,
  } = event;

  const eventStyles = {
    height: `${durationInMinutes * HEIGHT_ONE_MINUTE}px`,
    top: `${startTimeInMinutes * HEIGHT_ONE_MINUTE}px`,
    left: `calc((100% / 7 * ${dayOfWeek - 1}) + (100% / 7 * ${left}))`,
    width: `calc((100%/7)*${width})`,
  };

  return (
    <li className="relative">
      <PopoverWrapper
        primaryPopover={true}
        containerRef={containerRef}
        popoverComponent={({ close }) => (
          <EditEventPopover
            containerRef={containerRef}
            projects={projects}
            showAddProjectModal={showAddProjectModal}
            event={event}
            close={close}
          />
        )}
      >
        {({ ref, onClick }) => {
          const projectColor = getColor(project?.color);

          return (
            <div style={eventStyles} className="absolute p-[1px]">
              <button
                className={`w-full h-full cursor-pointer rounded-sm`}
                ref={ref}
                onClick={onClick}
                style={{
                  background: projectColor.light,
                }}
              >
                <CalendarEventView
                  description={description}
                  durationInSeconds={durationInSeconds}
                  project={project ?? null}
                />
              </button>
            </div>
          );
        }}
      </PopoverWrapper>
    </li>
  );
};
