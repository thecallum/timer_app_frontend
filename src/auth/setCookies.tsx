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
  const domain =
    process.env.NEXT_PUBLIC_LOCAL_ENV === 'true'
      ? 'localhost'
      : process.env.COOKIE_DOMAIN ?? ''

  res.setHeader('Set-Cookie', [
    buildCookieString(ACCESS_TOKEN_COOKIE_NAME, accessToken, domain, true),
    buildCookieString(REFRESH_TOKEN_COOKIE_NAME, refreshToken, domain, true),
    buildCookieString(ID_TOKEN_COOKIE_NAME, idToken, domain, true),
    buildCookieString(IS_AUTHORIZED_COOKIE_NAME, 'true', domain, false),
  ])
}

const buildCookieString = (
  name: string,
  value: string,
  domain: string,
  httpOnly: boolean,
) => {
  return `${name}=${value}; Path=/; Secure; ${httpOnly ? 'httpOnly=true;' : ''} Domain=${domain}`
}
