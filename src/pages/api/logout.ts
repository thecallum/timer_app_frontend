import { COOKIE_NAME } from '@/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  cookies().delete(COOKIE_NAME)

  return res.redirect('/')
}
