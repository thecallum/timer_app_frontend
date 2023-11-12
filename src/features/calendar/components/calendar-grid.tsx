import { CalendarColumn } from "./calendar-column";

export const CalendarGrid = () => {
  return (
    <div className="flex flex-row justify-between border-l border-slate-200  h-[100rem]">
      {[...Array(7)].map((_, index) => (
        <CalendarColumn key={index} />
      ))}
    </div>
  );
};
