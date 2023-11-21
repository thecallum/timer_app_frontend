import { IProject } from "../types/types";
import { CalendarCell } from "./calendar-cell";
import dayjs from "dayjs";

interface Props {
  day: dayjs.Dayjs;
  showAddProjectModal: () => void;
  projects: IProject[];
}

export const CalendarColumn = (props: Props) => {
  const { day, showAddProjectModal, projects } = props;

  return (
    <div className=" border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
      {[...Array(24)].map((_, index) => (
        <CalendarCell
          projects={projects}
          key={index}
          day={day.add(index, "hour")}
          showAddProjectModal={showAddProjectModal}
        />
      ))}
    </div>
  );
};
