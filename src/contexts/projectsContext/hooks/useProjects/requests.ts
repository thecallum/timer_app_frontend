import { IProject, IProjectColor, ProjectRequestObject } from '../../types'

const BASE_URL = 'http://localhost:3001/api'

export const fetchProjectsRequest = async () => {
  const result = await fetch(`${BASE_URL}/projects`, {
    method: 'GET',
    redirect: 'follow',
  })

  const response: ProjectRequestObject[] = await result.json()

  return response.map((x) => {
    const project: IProject = {
      id: x.id as string,
      description: x.description,
      projectColor: x.projectColor as IProjectColor,
    }

    return project
  })
}

export const createProjectRequest = async (request: ProjectRequestObject) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const result = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    redirect: 'follow',
    headers,
    body: JSON.stringify(request),
  })

  const response: ProjectRequestObject = await result.json()

  return response
}
