import { AUTH_STATE_COOKIE_NAME } from '@/auth/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { setCookie } from '@/auth/setCookies'
import {
  AUTH_DOMAIN,
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_AUDIENCE,
  AUTH_SCOPE,
} from '@/auth/config'

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  const state = uuidv4()

  const LOGIN_URL = `${AUTH_DOMAIN}/authorize?state=${state}&response_type=code&scope=${AUTH_SCOPE}&client_id=${CLIENT_ID}&audience=${AUTH_AUDIENCE}&redirect_uri=${REDIRECT_URI}`

  setCookie(res, AUTH_STATE_COOKIE_NAME, state)

  res.redirect(LOGIN_URL)
}

export default Login
