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
import { Bounce, toast } from 'react-toastify'
import { ErrorMessage } from '@/components/toasts/error-message'
import { UpdateStatus } from '@/types/updateStatus'
import { useIsAuthorized } from '@/auth/useIsAuthorized'

export const useProjects = () => {
  const router = useRouter()

  const [projects, setProjects] = useState<{
    [key: number]: Project
  }>({})

  const [isLoading, setIsLoading] = useState(true)
  const isAuthorized = useIsAuthorized()

  const addProject = async (request: ProjectApiRequestObject) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)

      const notification = toast.loading('Adding project...')

      createProjectRequest(request)
        .then((apiResponse) => {
          const project = ProjectRequestObjectToDomain(apiResponse.data)

          setProjects((x) => ({
            ...x,
            [project.id]: project,
          }))
          toast.update(notification, {
            render: 'Project added',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          toast.update(notification, {
            render: (
              <ErrorMessage
                label="Failed to add project"
                message={err.message}
              />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })

          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  const updateProject = async (project: Project) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)
      const notification = toast.loading('Updating project...')

      const request = ProjectToRequestObject(project)

      updateProjectRequest(project.id, request)
        .then((apiResponse) => {
          const project = ProjectRequestObjectToDomain(apiResponse.data)

          setProjects((state) => ({
            ...state,
            [project.id]: project,
          }))
          toast.update(notification, {
            render: 'Project updated',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          toast.update(notification, {
            render: (
              <ErrorMessage
                label="Failed to update project"
                message={err.message}
              />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  const deleteProject = async (project: Project) =>
    new Promise<UpdateStatus>((resolve) => {
      setIsLoading(true)
      const notification = toast.loading('Deleting project...')

      deleteProjectRequest(project.id)
        .then(() => {
          setProjects((state) => {
            const newState = { ...state }
            delete newState[project.id]
            return newState
          })

          toast.update(notification, {
            render: 'Project deleted',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          toast.update(notification, {
            render: (
              <ErrorMessage
                label="Failed to delete project"
                message={err.message}
              />
            ),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Bounce,
          })
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

  useEffect(() => {
    if (!isAuthorized) return

    fetchProjects()
  }, [router.pathname])

  const fetchProjects = async () =>
    new Promise<UpdateStatus>((resolve) => {
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
          resolve({
            success: true,
            errorMessage: null,
          })
        })
        .catch((err) => {
          resolve({
            success: false,
            errorMessage: err.message,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    })

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
