import * as cookie from 'cookie'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  AUTH_STATE_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  IS_AUTHORIZED_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { ServerResponse, IncomingMessage } from 'http'

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
      }),
    ),
  )
}
