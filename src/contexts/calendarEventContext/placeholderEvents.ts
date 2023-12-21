import dayjs from "dayjs";
import { CalendarEvent } from "../../features/calendar/types/types";
import { placeholderProjects } from "../../features/calendar/hooks/useCalendarProjects";

export const placeholderEvents: CalendarEvent[] = [
  
  new CalendarEvent(
    "AAA",
    dayjs("Mon Dec 18 2023 08:15:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 09:47:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "BBB",
    dayjs("Mon Dec 18 2023 08:50:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 10:20:00 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "CCC",
    dayjs("Mon Dec 18 2023 09:30:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 11:05:00 GMT+0000"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "DDD",
    dayjs("Mon Dec 18 2023 10:10:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 11:40:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Project Kickoff",
    dayjs("Mon Dec 18 2023 10:45:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 12:30:00 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Team Meeting",
    dayjs("Mon Dec 18 2023 11:15:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 12:45:00 GMT+0000"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Client Call",
    dayjs("Mon Dec 18 2023 11:55:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 13:25:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Lunch Break",
    dayjs("Mon Dec 18 2023 12:10:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 13:40:00 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Workshop",
    dayjs("Mon Dec 18 2023 12:50:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 14:15:00 GMT+0000"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Code Review",
    dayjs("Mon Dec 18 2023 13:20:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 15:00:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Design Discussion",
    dayjs("Mon Dec 18 2023 14:05:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 15:35:00 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Budget Review",
    dayjs("Mon Dec 18 2023 14:40:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 16:10:00 GMT+0000"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Strategy Meeting",
    dayjs("Mon Dec 18 2023 15:15:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 16:45:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "End of Day Recap",
    dayjs("Mon Dec 18 2023 15:50:00 GMT+0000"),
    dayjs("Mon Dec 18 2023 17:20:00 GMT+0000"),
    placeholderProjects[1]
  ),
];
