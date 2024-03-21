import {
  CalendarEventApiRequestObject,
  CalendarEventApiResponseObject,
  ProjectApiRequestObject,
  ProjectApiResponseObject,
} from '@/requests/types'
import { CalendarEvent } from '@/types/calendarEvents'
import { Project, ProjectColor } from '@/types/projects'

export const CalendarEventRequestToDomain = (
  request: CalendarEventApiResponseObject,
) => {
  // console.log(
  //   { request },
  //   new Date(request.startTime),
  //   new Date(request.endTime),
  // )

  return new CalendarEvent(
    request.id,
    request.description,
    request.startTime,
    request.endTime,
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

export const ProjectRequestObjectToDomain = (
  response: ProjectApiResponseObject,
): Project => {
  return {
    id: response.id,
    description: response.description,
    projectColor: response.projectColor as ProjectColor,
    totalEventDurationInMinutes: response.totalEventDurationInMinutes,
    isActive: response.isActive,
  }
}

export const ProjectToRequestObject = (
  project: Project,
): ProjectApiRequestObject => {
  return {
    description: project.description,
    projectColor: project.projectColor,
  }
}
