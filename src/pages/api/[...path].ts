import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'

type Data = {
  name: string
}

// enable running next build in pipeline without bind
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const API_KEY = process.env.TEST === 'true' ? '' : Config.SERVICE_API_KEY
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const API_URL = process.env.TEST === 'true' ? '' : Config.SERVICE_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { url, method, body } = req

  const fullURL = `${API_URL}${url}`

  console.info(`Forwarding request to ${fullURL}`)

  try {
    const apiResponse = await axios.request({
      url,
      baseURL: API_URL,
      method,
      headers: {
        'x-api-key': API_KEY,
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

    if (error.response === null || error.response === undefined) {
      throw new Error(error.message)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(error.response.status).json(error.response.data as any)
  }
}
