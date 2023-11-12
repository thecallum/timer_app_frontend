import { CalendarCell } from "./calendar-cell";

export const CalendarColumn = () => {
  return (
    <div className=" border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
      {[...Array(25)].map((_, index) => (
        <CalendarCell key={index} />
      ))}
    </div>
  );
};
