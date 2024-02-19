import {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeAccessToken } from '../../auth/authorizeAccessToken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string

  const response = await authorizeAccessToken(code)

  if (response === null) {
    return res.redirect('/login')
  }

  const { accessToken, refreshToken, idToken } = response

  res.setHeader('Set-Cookie', [
    `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Path=/;`, // for frontend access
    `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; Path=/; httpOnly=true;`,
    `${ID_TOKEN_COOKIE_NAME}=${idToken}; Path=/; httpOnly=true;`,
  ])

  return res.redirect('/')
}
