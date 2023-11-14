import { formatDuration } from "../helpers/formatter";
import {
  ICalendarEvent as CalendarEventType,
  defaultProject,
} from "../types/types";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: CalendarEventType;
}

const ONE_HOUR_IN_SECONDS = 3600;

export const CalendarEvent = (props: Props) => {
  const { event } = props;
  const { description, project, start, end } = event;

  const durationInSeconds = end.diff(start, "second");
  const startTimeInSeconds = start.diff(start.startOf("day"), "second");
  const column = start.day() - 1;

  const durationByFifteen = Math.ceil(durationInSeconds / 60 / 15);
  const topByFifteen = Math.ceil(
    (startTimeInSeconds + ONE_HOUR_IN_SECONDS) / 60 / 15
  );

  const elementHeight = durationByFifteen * 16; // 15 minutes is 16px
  const elementTop = topByFifteen * 16;


  const duration = formatDuration(durationInSeconds);

  const eventStyles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
    left: `calc((100%/7)*${column})`,
  };

  return (
    <li className="relative">
      <PopoverWrapper
        popoverComponent={({ close }) => (
          <EditEventPopover event={event} duration={duration} close={close} />
        )}
      >
        {({ ref, onClick }) => (
          <button
            className={`absolute rounded-sm w-[calc(100%/7)] p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
            ref={ref}
            style={{
              ...eventStyles,
              background: project?.colors.light ?? defaultProject.colors.light,
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
                  color:
                    project?.colors.darkest ?? defaultProject.colors.darkest,
                }}
              >
                {description}
              </div>
              <div
                className="text-xs whitespace-nowrap"
                style={{
                  color: project?.colors.dark ?? defaultProject.colors.dark,
                }}
              >
                {project?.name ?? defaultProject.name}
              </div>
            </span>
            <div
              className="text-s whitespace-nowrap"
              style={{
                color: project?.colors.darkest ?? defaultProject.colors.darkest,
              }}
            >
              {duration}
            </div>
          </button>
        )}
      </PopoverWrapper>
    </li>
  );
};
