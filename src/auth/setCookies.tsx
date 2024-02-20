import {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  IS_AUTHORIZED_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { ServerResponse, IncomingMessage } from 'http'

export function setCookies(
  res: ServerResponse<IncomingMessage>,
  accessToken: string,
  refreshToken: string,
  idToken: string,
) {
  res.setHeader('Set-Cookie', [
    `${IS_AUTHORIZED_COOKIE_NAME}=${'true'}; Path=/;`, // for frontend access
    `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Path=/;httpOnly=true'`,
    `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; Path=/;httpOnly=true;`,
    `${ID_TOKEN_COOKIE_NAME}=${idToken}; Path=/;httpOnly=true;`,
  ])
}
