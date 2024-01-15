import { CalendarEventContext } from "./calendarEventContext";
import { useCalendar } from "./hooks/useCalendar";

interface Props {
  children: JSX.Element;
}

export const CalendarContextProvider = (props: Props) => {
  const { children } = props;

  return (
    <CalendarEventContext.Provider value={useCalendar()}>
      {children}
    </CalendarEventContext.Provider>
  );
};
