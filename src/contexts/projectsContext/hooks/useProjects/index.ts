import { useEffect, useState } from 'react'
import {
  createProjectRequest,
  deleteProjectRequest,
  fetchProjectsRequest,
  updateProjectRequest,
} from '../../../../requests/projectRequests'
import { useRouter } from 'next/router'
import { Project } from '@/types/projects'
import { ProjectApiRequestObject } from '@/requests/types'
import { ProjectToRequestObject } from '@/factories/factories'

export const useProjects = () => {
  const router = useRouter()

  const [projects, setProjects] = useState<{
    [key: number]: Project
  }>({})

  const [isLoading, setIsLoading] = useState(true)

  const addProject = async (request: ProjectApiRequestObject) => {
    setIsLoading(true)

    createProjectRequest(request).then((project) => {
      setProjects((x) => {
        return {
          ...x,
          [project.id]: project,
        }
      })
      setIsLoading(false)
    })
  }

  const updateProject = async (project: Project) => {
    setIsLoading(true)

    const request = ProjectToRequestObject(project)

    updateProjectRequest(project.id, request).then((project) => {
      setProjects((state) => {
        return {
          ...state,
          [project.id]: project,
        }
      })
      setIsLoading(false)
    })
  }

  const deleteProject = async (project: Project) => {
    setIsLoading(true)

    await deleteProjectRequest(project.id)

    setProjects((state) => {
      const newState = { ...state }
      delete newState[project.id]
      return newState
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [router.pathname])

  const fetchProjects = async () => {
    setIsLoading(true)

    const apiResponse = await fetchProjectsRequest()

    const projectsById = apiResponse.reduce(
      (obj: { [key: number]: Project }, project) => (
        (obj[project.id] = project), obj
      ),
      {},
    )

    setProjects(projectsById)
    setIsLoading(false)
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
    // projects,
    projects: activeProjects,
    addProject,
    updateProject,
    deleteProject,
    isLoading,
    getProjectById,
  }
}
