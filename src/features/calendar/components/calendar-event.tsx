import { getColor } from "../helpers/colors";
import { formatDuration } from "../helpers/formatter";
import {
  CalendarEvent as CalendarEventType,
  IProject,
  defaultProject,
} from "../types/types";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: CalendarEventType;
  showAddProjectModal: () => void;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
}

const HEIGHT_ONE_MINUTE = 64 / 60;

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
                className={`w-full rounded-sm p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
                ref={ref}
                style={{
                  background: projectColor.light,
                  // hover: {
                  //   background: "bg-pink-300",
                  // },
                }}
                onClick={onClick}
              >
                <span className="text-start">
                  <div
                    className="font-semibold text-s"
                    style={{
                      color: projectColor.darkest,
                    }}
                  >
                    {description || "(no description)"}
                  </div>
                  <div
                    className="text-xs whitespace-nowrap"
                    style={{
                      color: projectColor.dark,
                    }}
                  >
                    {project?.name ?? defaultProject.name}
                  </div>
                </span>
                <div
                  className="text-s whitespace-nowrap"
                  style={{
                    color: projectColor.darkest,
                  }}
                >
                  {formatDuration(durationInSeconds)}
                </div>
              </button>
            </div>
          );
        }}
      </PopoverWrapper>
    </li>
  );
};
