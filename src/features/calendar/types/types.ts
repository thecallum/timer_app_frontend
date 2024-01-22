import { IProject } from '@/contexts/projectsContext/types'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CalendarEventRequestObject = {
  id?: string
  description: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  // public project?: IProject
}

export const CalendarEventRequestToDomain = (
  request: CalendarEventRequestObject,
) => {
  return new CalendarEvent(
    request?.id ?? null,
    request.description,
    dayjs(request.startTime),
    dayjs(request.endTime),
  )
}

export const CalendarEventToRequestObject = (
  event: CalendarEvent,
): CalendarEventRequestObject => {
  return {
    id: event.id,
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
  }
}

export class CalendarEvent {
  public id: string
  public description: string
  public startTime: dayjs.Dayjs
  public endTime: dayjs.Dayjs
  public project?: IProject

  public left: number = 0
  public width: number = 0

  constructor(
    id: string | null,
    description: string,
    startTime: dayjs.Dayjs,
    endTime: dayjs.Dayjs,
    project?: IProject,
  ) {
    this.id = id ?? uuidv4()
    this.description = description
    this.startTime = startTime
    this.endTime = endTime
    this.project = project
  }

  public get dayOfWeek(): DayOfWeek {
    // Sunday is zero, replace with 7
    const dayOfWeek = this.startTime.day()

    if (dayOfWeek === 0) return 7

    return dayOfWeek as DayOfWeek
  }

  public get durationInSeconds() {
    return this.endTime.diff(this.startTime, 'second')
  }

  public get durationInMinutes() {
    return Math.ceil(this.durationInSeconds / 60)
  }

  public get startTimeInSeconds() {
    return this.startTime.diff(this.startTime.startOf('day'), 'second')
  }

  public get startTimeInMinutes() {
    return Math.ceil(this.startTimeInSeconds / 60)
  }

  public get endTimeInSeconds() {
    return this.startTimeInSeconds + this.durationInSeconds
  }
}
