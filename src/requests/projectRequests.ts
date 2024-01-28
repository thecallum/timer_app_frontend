import { ProjectRequestObjectToDomain } from '@/factories/factories'
import { ProjectApiRequestObject, ProjectApiResponseObject } from './types'
import { BASE_URL } from './config'

export const fetchProjectsRequest = async () => {
  const result = await fetch(`${BASE_URL}/projects`, {
    method: 'GET',
    redirect: 'follow',
  })

  const response: ProjectApiResponseObject[] = await result.json()

  return response.map((x) => ProjectRequestObjectToDomain(x))
}

export const createProjectRequest = async (
  request: ProjectApiRequestObject,
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    redirect: 'follow',
    headers,
    body: JSON.stringify(request),
  })

  const response: ProjectApiResponseObject = await result.json()

  return ProjectRequestObjectToDomain(response)
}

export const updateProjectRequest = async (
  id: number,
  request: ProjectApiRequestObject,
) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'PUT',
    redirect: 'follow',
    headers,
    body: JSON.stringify(request),
  })

  const response: ProjectApiResponseObject = await result.json()

  return ProjectRequestObjectToDomain(response)
}

export const deleteProjectRequest = async (id: number) => {
  await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    redirect: 'follow',
  })
}