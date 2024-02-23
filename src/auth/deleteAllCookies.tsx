import * as cookie from 'cookie'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  AUTH_STATE_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  IS_AUTHORIZED_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { ServerResponse, IncomingMessage } from 'http'

const COOKIE_DOMAIN =
  process.env.NEXT_PUBLIC_LOCAL_ENV === 'true'
    ? 'localhost'
    : process.env.COOKIE_DOMAIN ?? ''

export const deleteAllCookies = (res: ServerResponse<IncomingMessage>) => {
  res.setHeader(
    'Set-Cookie',
    [
      ACCESS_TOKEN_COOKIE_NAME,
      REFRESH_TOKEN_COOKIE_NAME,
      ID_TOKEN_COOKIE_NAME,
      IS_AUTHORIZED_COOKIE_NAME,
      AUTH_STATE_COOKIE_NAME,
    ].map((x) =>
      cookie.serialize(x, '', {
        maxAge: -1,
        path: '/',
        domain: COOKIE_DOMAIN,
        httpOnly: true,
        secure: true,
      }),
    ),
  )
}
