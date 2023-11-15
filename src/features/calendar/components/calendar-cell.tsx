import classNames from "classnames";
import { PopoverWrapper } from "./popover-wrapper";
import { AddEventPopover } from "./popovers/add-event-popover";
import dayjs from "dayjs";
import { ICalendarEvent, IProject } from "../types/types";

interface Props {
  day: dayjs.Dayjs;
  showAddProjectModal: () => void;
  projects: IProject[];
  addEvent: (event: ICalendarEvent) => void;
}

export const CalendarCell = (props: Props) => {
  const { day, showAddProjectModal, projects, addEvent } = props;

  return (
    <div className="border-slate-200 h-16 border-b flex flex-col">
      {[...Array(4)].map((_, index) => (
        <PopoverWrapper
          popoverComponent={({ close }) => (
            <AddEventPopover
              projects={projects}
              showAddProjectModal={showAddProjectModal}
              close={close}
              time={day.add(15 * index, "minute")}
              onEventAdded={x => {
                addEvent(x)
                setTimeout(close)
              }}
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
