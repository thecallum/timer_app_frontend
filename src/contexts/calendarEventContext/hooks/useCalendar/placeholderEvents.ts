import dayjs from "dayjs";
import { CalendarEvent } from "../../../../features/calendar/types/types";
import { placeholderProjects } from "@/contexts/projectsContext/hooks/useProjects/placeholderProjects";

const weekOffset = dayjs()
  .startOf("week")
  .diff(dayjs("Mon Jan 08 2024 08:15:00 GMT+0000").startOf("week"), "weeks");

export const placeholderEvents: CalendarEvent[] = [
  new CalendarEvent(
    "AAA",
    dayjs("Mon Jan 08 2024 08:15:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 09:47:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "BBB",
    dayjs("Mon Jan 08 2024 08:50:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 10:20:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "CCC",
    dayjs("Mon Jan 08 2024 09:30:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 11:05:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "BBB",
    dayjs("Tue Dec 09 2024 08:50:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Tue Dec 09 2024 10:20:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "CCC",
    dayjs("Tue Dec 09 2024 09:30:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Tue Dec 09 2024 11:05:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "DDD",
    dayjs("Mon Jan 08 2024 10:10:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 11:40:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Project Kickoff",
    dayjs("Mon Jan 08 2024 10:45:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 12:30:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Team Meeting",
    dayjs("Mon Jan 08 2024 11:15:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 12:45:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Client Call",
    dayjs("Mon Jan 08 2024 11:55:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 13:25:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Lunch Break",
    dayjs("Mon Jan 08 2024 12:10:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 13:40:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Workshop",
    dayjs("Mon Jan 08 2024 12:50:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 14:15:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Code Review",
    dayjs("Mon Jan 08 2024 13:20:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 15:00:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Design Discussion",
    dayjs("Mon Jan 08 2024 14:05:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 15:35:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Budget Review",
    dayjs("Mon Jan 08 2024 14:40:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 16:10:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "Strategy Meeting",
    dayjs("Mon Jan 08 2024 15:15:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 16:45:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "End of Day Recap",
    dayjs("Mon Jan 08 2024 15:50:00 GMT+0000").add(weekOffset, "week"),
    dayjs("Mon Jan 08 2024 17:20:00 GMT+0000").add(weekOffset, "week"),
    placeholderProjects[1]
  ),
];
