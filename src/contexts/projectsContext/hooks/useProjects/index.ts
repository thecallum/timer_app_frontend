import { useEffect, useState } from 'react'
import {
  createProjectRequest,
  deleteProjectRequest,
  fetchProjectsRequest,
  updateProjectRequest,
} from '../../../../requests/projectRequests'
import { useRouter } from 'next/router'
import { Project } from '@/types/projects'
import {
  ProjectApiRequestObject,
  ProjectApiResponseObject,
} from '@/requests/types'
import {
  ProjectRequestObjectToDomain,
  ProjectToRequestObject,
} from '@/factories/factories'

export const useProjects = () => {
  const router = useRouter()

  const [projects, setProjects] = useState<{
    [key: number]: Project
  }>({})

  const [isLoading, setIsLoading] = useState(true)

  const addProject = async (request: ProjectApiRequestObject) => {
    setIsLoading(true)

    createProjectRequest(request)
      .then((apiResponse) => {
        const project = ProjectRequestObjectToDomain(apiResponse.data)

        setProjects((x) => ({
          ...x,
          [project.id]: project,
        }))
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateProject = async (project: Project) => {
    setIsLoading(true)

    const request = ProjectToRequestObject(project)

    updateProjectRequest(project.id, request)
      .then((apiResponse) => {
        const project = ProjectRequestObjectToDomain(apiResponse.data)

        setProjects((state) => ({
          ...state,
          [project.id]: project,
        }))
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteProject = async (project: Project) => {
    setIsLoading(true)

    deleteProjectRequest(project.id)
      .then(() => {
        setProjects((state) => {
          const newState = { ...state }
          delete newState[project.id]
          return newState
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchProjects()
  }, [router.pathname])

  const fetchProjects = async () => {
    setIsLoading(true)

    fetchProjectsRequest()
      .then((apiResponse) => {
        const projects: Project[] = apiResponse.data.map(
          (x: ProjectApiResponseObject) => ProjectRequestObjectToDomain(x),
        )

        const projectsById = projects.reduce(
          (obj: { [key: number]: Project }, project) => (
            (obj[project.id] = project), obj
          ),
          {},
        )

        setProjects(projectsById)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getProjectById = (projectId: number | null) => {
    if (projectId === null) return null
    if (!Object.prototype.hasOwnProperty.call(projects, projectId)) return null

    return projects[projectId]
  }

  const projectList = Object.keys(projects)
    .map(Number)
    .map((x) => projects[x])

  const activeProjects = projectList.filter((x) => x.isActive)

  return {
    projects: activeProjects,
    addProject,
    updateProject,
    deleteProject,
    isLoading,
    getProjectById,
  }
}
