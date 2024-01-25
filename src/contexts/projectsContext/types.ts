import { Project, ProjectColor } from '@/types/projects'
import { useProjects } from './hooks/useProjects'

export type ProjectsContext = ReturnType<typeof useProjects>

export const ProjectRequestObjectToDomain = (
  response: ProjectApiResponseObject,
): Project => {
  return {
    id: response.id,
    description: response.description,
    projectColor: response.projectColor as ProjectColor,
    totalEventDurationInMinutes: response.totalEventDurationInMinutes,
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
