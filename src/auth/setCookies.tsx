import {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  IS_AUTHORIZED_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { ServerResponse, IncomingMessage } from 'http'

export const COOKIE_DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.COOKIE_DOMAIN ?? ''

export function setCookies(
  res: ServerResponse<IncomingMessage>,
  accessToken: string,
  refreshToken: string,
  idToken: string,
) {
  res.setHeader('Set-Cookie', [
    buildCookieString(
      ACCESS_TOKEN_COOKIE_NAME,
      accessToken,
      COOKIE_DOMAIN,
      true,
    ),
    buildCookieString(
      REFRESH_TOKEN_COOKIE_NAME,
      refreshToken,
      COOKIE_DOMAIN,
      true,
    ),
    buildCookieString(ID_TOKEN_COOKIE_NAME, idToken, COOKIE_DOMAIN, true),
    buildCookieString(IS_AUTHORIZED_COOKIE_NAME, 'true', COOKIE_DOMAIN, false),
  ])
}

export function setCookie(
  res: ServerResponse<IncomingMessage>,
  cookieName: string,
  cookieValue: string,
) {
  res.setHeader('Set-Cookie', [
    buildCookieString(cookieName, cookieValue, COOKIE_DOMAIN, true),
  ])
}

export const buildCookieString = (
  name: string,
  value: string,
  domain: string,
  httpOnly: boolean,
) => {
  return `${name}=${value}; Path=/; Secure; ${httpOnly ? 'httpOnly=true;' : ''} Domain=${domain}`
}
