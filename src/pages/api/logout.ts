import { deleteAllCookies } from '@/auth/deleteAllCookies'
import { REFRESH_TOKEN_COOKIE_NAME } from '@/auth/constants'
import axios, { AxiosRequestConfig } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { Config } from 'sst/node/config'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CLIENT_SECRET = process.env.TEST === 'true' ? '' : Config.CLIENT_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Logout revokes refresh token, as an access token cannot be revoked.
  // A potential solution to revoke accessTokens is to store them in DynamoDb when revoked.
  // However, this is out of scope for the current project

  if (req.method !== 'POST') return res.status(405).end()

  if (req.body.key === 'static_key') {
    const cookies = req.cookies
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME] ?? null

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${AUTH_DOMAIN}/oauth/revoke`,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        token: refreshToken,
      },
    }

    try {
      console.info('Revoking refresh token')
      await axios.request(config)

      console.info('Refresh token revoked')

      deleteAllCookies(res)

      return res.status(204).end()

      // return res.redirect('/')
    } catch (error) {
      console.error({ error })
      return res.status(400).end()
    }
  }
  return res.status(400).end()
}
