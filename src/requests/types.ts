import { ProjectColor } from '@/types/projects'
import dayjs from 'dayjs'

export type ProjectApiRequestObject = {
  description: string
  projectColor: ProjectColor
}

export type ProjectApiResponseObject = {
  id: number
  description: string
  projectColor: ProjectColor
  totalEventDurationInMinutes: number
}

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
