import { useEffect, useState } from 'react'
import {
  Project,
  ProjectApiRequestObject,
  ProjectToRequestObject,
} from '../../types'
import {
  createProjectRequest,
  deleteProjectRequest,
  fetchProjectsRequest,
  updateProjectRequest,
} from './requests'

export const useProjects = () => {
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
    setIsLoading(true)

    fetchProjectsRequest().then((apiResponse) => {
      const projectsById: { [key: number]: Project } = {}

      apiResponse.forEach((project) => {
        projectsById[project.id] = project
      })

      setProjects(projectsById)
      setIsLoading(false)
    })
  }, [])

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    isLoading,
  }
}
