import dayjs from 'dayjs'

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CalendarEventApiRequestObject = {
  description: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  projectId: number | null
}

export type CalendarEventApiResponseObject = {
  id: string
  description: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  projectId: number | null
}

export const CalendarEventRequestToDomain = (
  request: CalendarEventApiResponseObject,
) => {
  return new CalendarEvent(
    request.id,
    request.description,
    dayjs(request.startTime),
    dayjs(request.endTime),
    request.projectId,
  )
}

export const CalendarEventToRequestObject = (
  event: CalendarEvent,
): CalendarEventApiRequestObject => {
  return {
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
    projectId: event.projectId,
  }
}

export class CalendarEvent {
  public id: string
  public description: string
  public startTime: dayjs.Dayjs
  public endTime: dayjs.Dayjs
  public projectId: number | null

  public left: number = 0
  public width: number = 0

  constructor(
    id: string,
    description: string,
    startTime: dayjs.Dayjs,
    endTime: dayjs.Dayjs,
    projectId: number | null,
  ) {
    this.id = id
    this.description = description
    this.startTime = startTime
    this.endTime = endTime
    this.projectId = projectId
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
