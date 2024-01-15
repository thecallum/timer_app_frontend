import { IProject } from "@/contexts/projectsContext/types";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class CalendarEvent {
  public readonly id: string;
  public description: string;
  public start: dayjs.Dayjs;
  public end: dayjs.Dayjs;
  public project?: IProject;

  public left: number = 0;
  public width: number = 0;

  constructor(
    description: string,
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    project?: IProject
  ) {
    this.id = uuidv4();
    this.description = description;
    this.start = start;
    this.end = end;
    this.project = project;
  }

  public get dayOfWeek(): DayOfWeek {
    // Sunday is zero, replace with 7
    const dayOfWeek = this.start.day();

    if (dayOfWeek === 0) return 7;

    return dayOfWeek as DayOfWeek;
  }

  public get durationInSeconds() {
    return this.end.diff(this.start, "second");
  }

  public get durationInMinutes() {
    return Math.ceil(this.durationInSeconds / 60);
  }

  public get startTimeInSeconds() {
    return this.start.diff(this.start.startOf("day"), "second");
  }

  public get startTimeInMinutes() {
    return Math.ceil(this.startTimeInSeconds / 60);
  }

  public get endTimeInSeconds() {
    return this.startTimeInSeconds + this.durationInSeconds;
  }
}
