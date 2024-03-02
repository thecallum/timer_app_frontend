import { AUTH_STATE_COOKIE_NAME } from '@/auth/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { setCookie } from '@/auth/setCookies'

const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const redirectUri =
  process.env.NEXT_PUBLIC_LOCAL_ENV === 'true'
    ? 'http://localhost:3000/api/authorize'
    : process.env.NEXT_PUBLIC_REDIRECT_URI
const audience = process.env.NEXT_PUBLIC_AUDIENCE
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const scope = 'openid profile email offline_access'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const state = uuidv4()

  const LOGIN_URL = `${domain}/authorize?state=${state}&response_type=code&scope=${scope}&client_id=${clientId}&audience=${audience}&redirect_uri=${redirectUri}`

  setCookie(res, AUTH_STATE_COOKIE_NAME, state)

  res.redirect(LOGIN_URL)
}
