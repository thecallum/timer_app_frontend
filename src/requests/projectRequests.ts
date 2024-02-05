import axios from 'axios'
import { ProjectApiRequestObject } from './types'

export const fetchProjectsRequest = () => {
  return axios.get(`/api/projects`)
}

export const createProjectRequest = async (
  request: ProjectApiRequestObject,
) => {
  return await axios.post(`/api/projects`, request)
}

export const updateProjectRequest = (
  id: number,
  request: ProjectApiRequestObject,
) => {
  return axios.put(`/api/projects/${id}`, request)
}

export const deleteProjectRequest = (id: number) => {
  return axios.delete(`/api/projects/${id}`)
}
