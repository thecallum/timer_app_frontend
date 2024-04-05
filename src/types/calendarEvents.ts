import {
  getDayOfWeek,
  getMinuteValue,
  getSecondValue,
} from '@/helpers/timeHelpers'

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export class CalendarEvent {
  public id: string
  public description: string
  public startTime: Date
  public endTime: Date
  public projectId: number | null

  public left: number = 0
  public width: number = 0
  public top: number = 0
  public height: number = 0

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

  public get dayOfWeek(): DayOfWeek {
    return getDayOfWeek(this.startTime)
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
