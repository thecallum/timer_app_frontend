import classNames from "classnames";
import { PopoverWrapper } from "./popover-wrapper";
import { AddEventPopover } from "./popovers/add-event-popover";
import dayjs from "dayjs";
import { IProject } from "../types/types";
import { useClickOutContext } from "@/contexts/clickOutContext";

interface Props {
  day: dayjs.Dayjs;
  showAddProjectModal: () => void;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
}

export const CalendarCell = (props: Props) => {
  const { day, showAddProjectModal, projects, containerRef } = props;
  const { state } = useClickOutContext();
  const { clickoutSubscriberCount } = state;

  // Dont open popover if other popovers still visible
  const disableClick = clickoutSubscriberCount > 0;

  return (
    <div className="border-slate-200 h-32 border-b flex flex-col">
      {[...Array(4)].map((_, index) => (
        <PopoverWrapper
          containerRef={containerRef}
          popoverComponent={({ close }) => (
            <AddEventPopover
              containerRef={containerRef}
              projects={projects}
              showAddProjectModal={showAddProjectModal}
              close={close}
              time={day.add(15 * index, "minute")}
            />
          )}
          key={index}
        >
          {({ ref, onClick, showPopover }) => (
            <button
              className={classNames(`flex-grow cursor-pointer rounded-sm`, {
                "bg-slate-200": showPopover,
                "hover:bg-slate-50": !disableClick,
              })}
              ref={ref}
              onClick={() => {
                if (disableClick) return;

                onClick();
              }}
            ></button>
          )}
        </PopoverWrapper>
      ))}
    </div>
  );
};
