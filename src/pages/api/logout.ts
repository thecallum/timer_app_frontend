import { COOKIE_NAME } from '@/constants'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    serialize(COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
  ])

  return res.redirect('/')
}
