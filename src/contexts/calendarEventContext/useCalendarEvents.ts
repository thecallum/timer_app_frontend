import { useContext } from "react";
import { CalendarEventContext } from "./calendarEventContext";

export const useCalendarEvents = () => {
  const context = useContext(CalendarEventContext);
  if (context === undefined) {
    throw new Error("useCalendarEvents must be used within a CalendarEventsProvider");
  }

  return context;
};
