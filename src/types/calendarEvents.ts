import {
  getMidnightDates,
  getMinuteValue,
  getSecondValue,
} from '@/helpers/timeHelpers'

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CalendarEventDisplayPosition = {
  left: number
  width: number
  top: number
  height: number
  column: number
  eventId: string
}

export class CalendarEvent {
  public id: string
  public description: string
  public startTime: Date
  public endTime: Date
  public projectId: number | null

  constructor(
    id: string,
    description: string,
    startTime: Date,
    endTime: Date,
    projectId: number | null,
  ) {
    this.id = id
    this.description = description
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.projectId = projectId
  }

  public get dates(): Date[] {
    return getMidnightDates(this.startTime, this.endTime)
  }

  public get durationInSeconds() {
    const durationInMs = this.endTime.getTime() - this.startTime.getTime()
    return durationInMs / 1000
  }

  public get durationInMinutes() {
    const durationInMs = this.endTime.getTime() - this.startTime.getTime()
    return durationInMs / 1000 / 60
  }

  public get startTimeInSeconds() {
    return getSecondValue(this.startTime)
  }

  public get startTimeInMinutes() {
    return getMinuteValue(this.startTime)
  }

  public get endTimeInSeconds() {
    return this.startTimeInSeconds + this.durationInSeconds
  }
}
