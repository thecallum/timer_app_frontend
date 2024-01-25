import { Project, defaultProjectColor } from '@/contexts/projectsContext/types'

export const getProjectColor = (
  projectId: number | null,
  projects: {
    [key: number]: Project
  },
) => {
  if (projectId === null) return defaultProjectColor

  if (!projects.hasOwnProperty(projectId)) return defaultProjectColor

  return projects[projectId].projectColor
}
