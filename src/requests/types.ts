import { ProjectColor } from '@/types/projects'

export type ProjectApiRequestObject = {
  description: string
  projectColor: ProjectColor
}

export type ProjectApiResponseObject = {
  id: number
  description: string
  projectColor: ProjectColor
  totalEventDurationInMinutes: number
  isActive: boolean
}

export type CalendarEventApiRequestObject = {
  description: string
  startTime: Date
  endTime: Date
  projectId: number | null
}

export type CalendarEventApiResponseObject = {
  id: string
  description: string
  startTime: Date
  endTime: Date
  projectId: number | null
}
