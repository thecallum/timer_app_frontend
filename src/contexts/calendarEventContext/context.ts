import { createContext } from "react";
import { ICalendarEventContext } from "./types";

const CalendarEventContext = createContext<ICalendarEventContext | undefined>(
  undefined
);

export default CalendarEventContext;
