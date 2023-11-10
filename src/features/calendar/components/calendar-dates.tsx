export const CalendarDates = () => {
  const weekDaysArray = [
    { day: "01", name: "MON", time: "5:28:48" },
    { day: "02", name: "TUE", time: "11:15:30" },
    { day: "03", name: "WED", time: "3:22:10" },
    { day: "04", name: "THU", time: "8:45:55" },
    { day: "05", name: "FRI", time: "16:05:45" },
    { day: "06", name: "SAT", time: "0:30:25" },
    { day: "07", name: "SUN", time: "23:59:59" },
  ];

  return (
    <div className="ml-20 mr-4 mb h-12">
      <ul className="flex justify-between ml-2 ">
        {weekDaysArray.map(({ day, name, time }) => (
          <li className="flex-grow" key={name}>
            <div className="flex justify-center items-center">
              <div className="text-slate-600 text-2xl font-light mr-3">
                {day}
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
