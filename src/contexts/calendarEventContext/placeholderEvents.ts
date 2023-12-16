import dayjs from "dayjs";
import { CalendarEvent } from "../../features/calendar/types/types";
import { placeholderProjects } from "../../features/calendar/hooks/useCalendarProjects";

export const placeholderEvents: CalendarEvent[] = [
  new CalendarEvent(
    "AAA",
    dayjs("Tue Dec 04 2023 01:15:53 GMT+0000"),
    dayjs("Tue Dec 04 2023 03:15:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "BBB",
    dayjs("Tue Dec 04 2023 01:15:53 GMT+0000"),
    dayjs("Tue Dec 04 2023 03:15:00 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "CCC",
    dayjs("Tue Dec 04 2023 02:15:53 GMT+0000"),
    dayjs("Tue Dec 04 2023 05:15:00 GMT+0000"),
    placeholderProjects[2]
  ),
  new CalendarEvent(
    "DDD",
    dayjs("Tue Dec 04 2023 04:00:53 GMT+0000"),
    dayjs("Tue Dec 04 2023 05:15:00 GMT+0000"),
    placeholderProjects[0]
  ),
  new CalendarEvent(
    "Standup meeting",
    dayjs("Thu Dec 06 2023 03:30:53 GMT+0000"),
    dayjs("Thu Dec 06 2023 05:02:28 GMT+0000"),
    placeholderProjects[1]
  ),
  new CalendarEvent(
    "Planning session",
    dayjs("Thu Dec 06 2023 07:12:06 GMT+0000"),
    dayjs("Thu Dec 06 2023 09:04:28 GMT+0000"),
    placeholderProjects[2]
  ),
];
