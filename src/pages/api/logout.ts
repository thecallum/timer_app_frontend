import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/constants'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    serialize(ACCESS_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
    serialize(REFRESH_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
  ])

  return res.redirect('/')
}
