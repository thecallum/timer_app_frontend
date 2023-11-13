import classNames from "classnames";
import { PopoverWrapper } from "./popover-wrapper";
import { AddEventPopover } from "./popovers/add-event-popover";
import dayjs from "dayjs";

interface Props {
  day: dayjs.Dayjs;
}

export const CalendarCell = (props: Props) => {
  const { day } = props;

  return (
    <div className="border-slate-200 h-16 border-b flex flex-col">
      {[...Array(4)].map((_, index) => (
        <PopoverWrapper
          useOverlay
          popoverComponent={({ close }) => (
            <AddEventPopover
              close={close}
              time={day.add(15 * index, "minute")}
            />
          )}
          key={index}
        >
          {({ ref, onClick, showPopover }) => (
            <button
              className={classNames(
                `flex-grow hover:bg-slate-50 cursor-pointer rounded-sm`,
                {
                  "bg-slate-200": showPopover,
                }
              )}
              ref={ref}
              onClick={onClick}
            ></button>
          )}
        </PopoverWrapper>
      ))}
    </div>
  );
};
