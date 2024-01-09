import classNames from "classnames";
import dayjs from "dayjs";
import { CalendarEvent } from "../types/types";
import { calculateDuration } from "../helpers/duration";
import { formatDuration } from "../helpers/formatter";

interface Props {
  weeks: dayjs.Dayjs[];
  events: CalendarEvent[];
}

export const CalendarDates = (props: Props) => {
  const { weeks, events } = props;

  const weekDaysArray = weeks.map((x) => {
    const eventsOnThisDay = events.filter((e) =>
      e.start.startOf("day").isSame(x.startOf("day"))
    );

    return {
      day: x.format("DD"),
      name: x.format("ddd"),
      time: formatDuration(calculateDuration(eventsOnThisDay)),
      current: x.isSame(dayjs(), "day"),
    };
  });

  return (
    <div className="ml-16 mr-4 mb-2 h-12">
      <ul className="flex justify-between ml-2 ">
        {weekDaysArray.map(({ day, name, time, current }) => (
          <li className="flex-grow" key={name}>
            <div className="flex justify-center items-center">
              <div
                className={classNames(
                  "text-slate-600 text-2xl font-light mr-3 w-9 h-9 rounded-full flex items-center justify-center",
                  { "bg-purple-100": current }
                )}
              >
                <span className="text-center"> {day}</span>
              </div>
              <div className="flex flex-col">
                <div className="text-slate-600 text-xs mb-1">{name}</div>
                <div className="text-slate-500 text-xs">{time}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
