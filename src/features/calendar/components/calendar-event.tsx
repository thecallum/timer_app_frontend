import { getColor } from "../helpers/colors";
import { formatDuration } from "../helpers/formatter";
import { ICalendarEvent, IProject, defaultProject } from "../types/types";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: ICalendarEvent;
  showAddProjectModal: () => void;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
}

const HEIGHT_ONE_MINUTE = (64 / 60)

export const CalendarEvent = (props: Props) => {
  const { event, showAddProjectModal, projects, containerRef } = props;
  const { description, project, start, end } = event;

  const durationInSeconds = end.diff(start, "second");
  const startTimeInSeconds = start.diff(start.startOf("day"), "second");
  const column = start.day() - 1;


  const durationByMinute = Math.ceil(durationInSeconds / 60 );

  const topByMinute = Math.ceil(startTimeInSeconds / 60);
  const elementHeight = durationByMinute * HEIGHT_ONE_MINUTE
  const elementTop = topByMinute * HEIGHT_ONE_MINUTE

  const duration = formatDuration(durationInSeconds);

  const eventStyles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
    left: `calc((100%/7)*${column})`,
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
            <button
              className={`absolute rounded-sm w-[calc(100%/7)] p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
              ref={ref}
              style={{
                ...eventStyles,
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
                {duration}
              </div>
            </button>
          );
        }}
      </PopoverWrapper>
    </li>
  );
};
