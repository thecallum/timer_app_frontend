import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: CalendarEventType;
}

const ONE_HOUR_IN_SECONDS = 3600;

export const CalendarEvent = (props: Props) => {
  const { event } = props;
  const { description, project, start, end } = event;

  const durationInSeconds = end.diff(start, "second")
  const startTimeInSeconds = start.diff(start.startOf("day"), "second")
  const column = start.day() -1

  const durationByFifteen = Math.ceil(durationInSeconds / 60 / 15);
  const topByFifteen = Math.ceil((startTimeInSeconds + ONE_HOUR_IN_SECONDS) / 60 / 15);

  const elementHeight = durationByFifteen * 16; // 15 minutes is 16px
  const elementTop = topByFifteen * 16;

  const formatTime = (seconds: number) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const eventStyles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
    left: `calc((100%/7)*${column})`,
  };

  return (
    <li className="relative">
      <PopoverWrapper
        popoverComponent={({ close }) => <EditEventPopover close={close} />}
      >
        {({ ref, onClick }) => (
          <button
            className={`absolute rounded-sm w-[calc(100%/7)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
            ref={ref}
            style={eventStyles}
            onClick={onClick}
          >
            <span className="text-start">
              <div className="text-pink-950 font-semibold text-s">
                {description}
              </div>
              <div className="text-pink-500 text-xs whitespace-nowrap">
                {project}
              </div>
            </span>
            <div className="text-pink-950 text-s whitespace-nowrap">
              {formatTime(durationInSeconds)}
            </div>
          </button>
        )}
      </PopoverWrapper>
    </li>
  );
};
