import { useContext } from "react";
import { CalendarEventContext } from "./calendarEventContext";

export const useCalendarEvents = () => {
  const context = useContext(CalendarEventContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
