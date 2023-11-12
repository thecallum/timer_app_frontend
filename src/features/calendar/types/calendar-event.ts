import dayjs from "dayjs";

export type CalendarEvent = {
  description: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  project: string;
};
