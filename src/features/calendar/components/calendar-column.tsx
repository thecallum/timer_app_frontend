import { CalendarCell } from "./calendar-cell";
import dayjs from "dayjs";

interface Props {
  day: dayjs.Dayjs;
}

export const CalendarColumn = (props: Props) => {
  const { day } = props;

  return (
    <div className=" border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
      {[...Array(24)].map((_, index) => (
        <CalendarCell key={index} day={day.add(index, "hour")} />
      ))}
    </div>
  );
};
