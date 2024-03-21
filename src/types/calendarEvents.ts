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
    // Sunday is zero, replace with 7
    // const dayOfWeek = this.startTime.day()

    const dayOfWeek = this.startTime.getDay()

    if (dayOfWeek === 0) return 7

    return dayOfWeek as DayOfWeek
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
    const midnight = new Date(this.startTime)
    midnight.setHours(0)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    midnight.setMilliseconds(0)

    const diff = this.startTime.getTime() - midnight.getTime()

    return diff / 1000
  }

  public get startTimeInMinutes() {
    const midnight = new Date(this.startTime)
    midnight.setHours(0)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    midnight.setMilliseconds(0)

    const diff = this.startTime.getTime() - midnight.getTime()

    return diff / 1000 / 60
  }

  public get endTimeInSeconds() {
    return this.startTimeInSeconds + this.durationInSeconds
  }
}
