import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Router from 'next/router'

export const frontendRequest = async (config: AxiosRequestConfig) => {
  try {
    return await axios(config)
  } catch (e) {
    const error = e as AxiosError

    if (error?.response?.status === 401) {
      Router.push('/login')
    }

    throw error
  }
}
