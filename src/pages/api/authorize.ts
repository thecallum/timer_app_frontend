import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeAccessToken } from '../../auth/authorizeAccessToken'
import { setCookies } from '@/auth/setCookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string

  const response = await authorizeAccessToken(code)

  if (response === null) {
    return res.redirect('/login')
  }

  const { accessToken, refreshToken, idToken } = response

  setCookies(res, accessToken, refreshToken, idToken)

  return res.redirect('/')
}
