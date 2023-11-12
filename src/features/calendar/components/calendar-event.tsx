import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { PopoverWrapper } from "./popover-wrapper";
import { EditEventPopover } from "./popovers/edit-event-popover";

interface Props {
  event: CalendarEventType;
}

export const CalendarEvent = (props: Props) => {
  const { event } = props;
  const { description, project, duration } = event;

  return (
    <li className="relative">
      <PopoverWrapper event={event} popoverComponent={<EditEventPopover />}>
        {({ ref, styles, onClick, formatTime }) => (
          <button
            className={`absolute rounded-sm w-[calc(100%/7)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
            ref={ref}
            style={styles}
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
              {formatTime(duration)}
            </div>
          </button>
        )}
      </PopoverWrapper>
    </li>
  );
};
