import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'
import * as cookie from 'cookie'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { IncomingHttpHeaders } from 'http'
import { validateToken } from '@/auth/validateToken'
import { refreshAccessToken } from '../../auth/refreshAccessToken'
import { setCookies } from '@/auth/setCookies'
import { deleteAllCookies } from '@/auth/deleteAllCookies'

const API_URL = Config.SERVICE_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, method, body, headers } = req

  let accessToken = extractCookie(headers, ACCESS_TOKEN_COOKIE_NAME)
  let refreshToken = extractCookie(headers, REFRESH_TOKEN_COOKIE_NAME)
  let idToken = extractCookie(headers, ID_TOKEN_COOKIE_NAME)

  if (!(await isAuthorized(accessToken))) {
    console.info('access token invalid, gonna try refresh the token')

    const result = await refreshAccessToken(refreshToken)
    if (result === null) {
      console.info('Unable to refresh token')
      deleteAllCookies(res)
      res.status(401).end()
      return
    }

    accessToken = result.accessToken
    refreshToken = result.refreshToken
    idToken = result.idToken

    setCookies(res, accessToken, refreshToken, idToken)
  }

  console.info(`Forwarding request to ${url}`)

  try {
    const apiResponse = await axios.request({
      url,
      baseURL: API_URL,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        IdToken: idToken,
      },
      data: body,
    })

    if (apiResponse.status === 200) {
      res.status(200).json(apiResponse.data)
    } else {
      res.status(apiResponse.status).end()
    }
  } catch (e) {
    const error = e as AxiosError

    console.info(
      'invalid request',
      { status: error?.response?.status },
      error.message,
    )

    if (error.response?.status === 401) {
      deleteAllCookies(res)
    }

    if (error.response === null || error.response === undefined) {
      throw new Error(error.message)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(error.response.status).json(error.response.data as any)
  }
}

const extractCookie = (headers: IncomingHttpHeaders, cookieName: string) => {
  const parsedCookies = cookie.parse(headers.cookie as string)

  try {
    return parsedCookies[cookieName]
  } catch (error) {
    return null
  }
}

const isAuthorized = async (accessToken: string | null) => {
  if (accessToken === null) return false

  return await validateToken(accessToken)
}
