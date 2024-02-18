import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'
import * as cookie from 'cookie'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/constants'
import { IncomingHttpHeaders } from 'http'

// enable running next build in pipeline without bind
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const API_URL = process.env.TEST === 'true' ? '' : Config.SERVICE_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, method, body, headers } = req

  console.info(`Forwarding request to ${url}`)

  const accessToken = extractAccessToken(headers)

  if (accessToken === null) {
    deleteAllCookies(res)
    res.status(401).end()
    return
  }

  try {
    const apiResponse = await axios.request({
      url,
      baseURL: API_URL,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

    console.info('invalid request', { status: error?.response?.status })

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
function deleteAllCookies(res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    cookie.serialize(ACCESS_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
    cookie.serialize(REFRESH_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
  ])
}

function extractAccessToken(headers: IncomingHttpHeaders) {
  const parsedCookies = cookie.parse(headers.cookie as string)

  try {
    const accessToken = parsedCookies[ACCESS_TOKEN_COOKIE_NAME]
    return accessToken
  } catch (error) {
    return null
  }
}
