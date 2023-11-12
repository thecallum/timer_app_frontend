import dayjs from "dayjs";
import classNames from "classnames";

export const CalendarDates = () => {
  const getWeekDates = () => {
    const currentDate = dayjs();
    const currentDayOfWeek = currentDate.day();
    const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Sunday is a special case

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = dayjs().day(currentDate.day() - daysSinceMonday + i);

      weekDates.push(date);
    }

    return weekDates;
  };

  const weekDaysArray = getWeekDates().map((x) => ({
    day: x.format("DD"),
    name: x.format("ddd"),
    time: "5:28:48",
    current: x.isSame(dayjs()),
  }));

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
