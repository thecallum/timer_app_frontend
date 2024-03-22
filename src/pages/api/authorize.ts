import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeAccessToken } from '../../auth/authorizeAccessToken'
import { setCookies } from '@/auth/setCookies'
import { AUTH_STATE_COOKIE_NAME } from '@/auth/constants'

const Authorize = async (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.query.state as string

  const cookies = req.cookies
  const stateCookie = cookies[AUTH_STATE_COOKIE_NAME] ?? null

  if (stateCookie !== state) {
    console.info('State didnt match stored state')
    res.redirect('/login')
    return
  }

  const code = req.query.code as string

  const response = await authorizeAccessToken(code)

  if (response === null) {
    res.redirect('/login')
    return
  }

  const { accessToken, refreshToken, idToken } = response

  setCookies(res, accessToken, refreshToken, idToken)

  res.redirect('/')
}

export default Authorize
