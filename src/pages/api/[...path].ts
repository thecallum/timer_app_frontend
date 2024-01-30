// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const API_KEY = process.env.SST_Secret_value_SERVICE_API_KEY ?? ''
const API_URL = process.env.SST_Secret_value_SERVICE_API_URL

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
