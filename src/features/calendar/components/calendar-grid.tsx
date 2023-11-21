import { IProject } from "../types/types";
import { CalendarColumn } from "./calendar-column";
import dayjs from "dayjs";

interface Props {
  weeks: dayjs.Dayjs[];
  showAddProjectModal: () => void;
  projects: IProject[];
}

export const CalendarGrid = (props: Props) => {
  const { weeks, showAddProjectModal, projects } = props;

  return (
    <div className="flex flex-row justify-between border-l border-slate-200  h-[96rem]">
      {weeks.map((day, index) => (
        <CalendarColumn
          projects={projects}
          key={index}
          day={day.startOf("day")}
          showAddProjectModal={showAddProjectModal}
        />
      ))}
    </div>
  );
};
