import { COOKIE_NAME } from '@/constants'
import axios, { AxiosRequestConfig } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'

const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CLIENT_SECRET = process.env.TEST === 'true' ? '' : Config.CLIENT_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${AUTH_DOMAIN}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    },
  }

  const response = await axios.request(config)

  const accessToken = response.data['access_token']
  const cookieValue = `${COOKIE_NAME}=${accessToken}; Path=/;`

  res.setHeader('Set-Cookie', cookieValue)

  return res.redirect('/')
}
