import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'

type Data = {
  name: string
}

// enable running next build in pipeline without bind
const API_KEY = process.env.TEST === 'true' ? '' : Config?.SERVICE_API_KEY
const API_URL = process.env.TEST === 'true' ? '' : Config?.SERVICE_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { url, method, body } = req

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('x-api-key', API_KEY)

  const fullURL = `${API_URL}${url}`

  console.info(`Forwarding request to ${fullURL}`)

  const options: RequestInit = {
    method,
    redirect: 'follow',
    headers,
  }

  if (method === 'POST' || method === 'PUT') {
    console.info(`${method} request, sending body`, body)
    options.body = JSON.stringify(body)
  }

  try {
    const apiResponse = await fetch(fullURL, options)

    const { status } = apiResponse

    if (status === 200) {
      const content = await apiResponse.json()
      res.status(200).json(content)
    } else {
      const content = await apiResponse.json()

      res.status(apiResponse.status).json(content)
    }
  } catch (err) {
    console.error(err)

    res.status(500).end()
  }
}
