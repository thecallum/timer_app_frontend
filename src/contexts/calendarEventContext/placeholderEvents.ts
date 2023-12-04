import dayjs from "dayjs";
import { ICalendarEvent } from "../../features/calendar/types/types";
import { v4 as uuidv4 } from "uuid";
import { placeholderProjects } from "../../features/calendar/hooks/useCalendarProjects";

export const placeholderEvents: ICalendarEvent[] = [
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Tue Nov 07 2023 01:15:53 GMT+0000"),
    end: dayjs("Tue Nov 07 2023 03:15:00 GMT+0000"),
    project: placeholderProjects[0],
  },
  {
    id: uuidv4(),
    description: "Standup meeting",
    start: dayjs("Thu Nov 09 2023 03:30:53 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 05:02:28 GMT+0000"),
    project: placeholderProjects[1],
  },
  {
    id: uuidv4(),
    description: "Planning session",
    start: dayjs("Thu Nov 09 2023 07:12:06 GMT+0000"),
    end: dayjs("Thu Nov 09 2023 09:04:28 GMT+0000"),
    project: placeholderProjects[2],
  },
];
