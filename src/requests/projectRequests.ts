import { AxiosRequestConfig } from 'axios'
import { ProjectApiRequestObject } from './types'
import { frontendRequest } from './frontendRequest'

export const fetchProjectsRequest = () => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/api/projects`,
  }

  return frontendRequest(config)
}

export const createProjectRequest = async (
  request: ProjectApiRequestObject,
) => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: `/api/projects`,
    data: request,
  }

  return frontendRequest(config)
}

export const updateProjectRequest = (
  id: number,
  request: ProjectApiRequestObject,
) => {
  const config: AxiosRequestConfig = {
    method: 'put',
    url: `/api/projects/${id}`,
    data: request,
  }

  return frontendRequest(config)
}

export const deleteProjectRequest = (id: number) => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `/api/projects/${id}`,
  }

  return frontendRequest(config)
}
