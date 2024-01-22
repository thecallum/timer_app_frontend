import { useEffect, useState } from 'react'
import { IProject, ProjectRequestObject } from '../../types'
import { createProjectRequest, fetchProjectsRequest } from './requests'

export const useProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const addProject = async (newProject: IProject) => {
    setIsLoading(true)

    const request: ProjectRequestObject = {
      description: newProject.description,
      projectColor: newProject.projectColor,
    }

    createProjectRequest(request).then((res) => {
      const project: IProject = {
        id: res.id as string,
        description: res.description,
        projectColor: res.projectColor,
      }

      setProjects((x) => [...x, project])
      setIsLoading(false)
    })
  }

  const updateProject = async (project: IProject) => {
    setProjects((state) =>
      state.map((x) => {
        if (x.id === project.id) return project
        return x
      }),
    )
  }

  const deleteProject = async (project: IProject) => {
    setProjects((state) => [...state].filter((x) => x.id !== project.id))
  }

  useEffect(() => {
    setIsLoading(true)

    fetchProjectsRequest().then((projects) => {
      setProjects(projects)
      console.log({ projects })
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
