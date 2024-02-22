import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeAccessToken } from '../../auth/authorizeAccessToken'
import { setCookies } from '@/auth/setCookies'
import {
  AUTH_STATE_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.query.state as string

  const cookies = req.cookies
  const stateCookie = cookies[AUTH_STATE_COOKIE_NAME] ?? null

  if (stateCookie !== state) {
    // console.log({ state })
    console.info('State didnt match stored state')
    return res.redirect('/login')
  }

  const code = req.query.code as string

  const response = await authorizeAccessToken(code)

  if (response === null) {
    return res.redirect('/login')
  }

  const { accessToken, refreshToken, idToken } = response

  setCookies(res, accessToken, refreshToken, idToken)

  return res.redirect('/')
}
