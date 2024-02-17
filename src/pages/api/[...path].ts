import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'
import * as cookie from 'cookie'
import { COOKIE_NAME } from '@/constants'

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

  let accessToken: string

  try {
    const parsedCookies = cookie.parse(headers.cookie as string)
    accessToken = parsedCookies[COOKIE_NAME]
  } catch (error) {
    res.setHeader('Set-Cookie', [
      cookie.serialize(COOKIE_NAME, '', {
        maxAge: -1,
        path: '/',
      }),
    ])

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
      res.setHeader('Set-Cookie', [
        cookie.serialize(COOKIE_NAME, '', {
          maxAge: -1,
          path: '/',
        }),
      ])
    }

    if (error.response === null || error.response === undefined) {
      throw new Error(error.message)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(error.response.status).json(error.response.data as any)
  }
}
