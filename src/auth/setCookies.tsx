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
      : process.env.COOKIE_DOMAIN

  res.setHeader('Set-Cookie', [
    `${IS_AUTHORIZED_COOKIE_NAME}=${'true'}; Path=/; Domain=${domain}k`, // for frontend access
    `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Path=/;httpOnly=true; Domain=${domain};`,
    `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; Path=/;httpOnly=true; Domain=${domain}`,
    `${ID_TOKEN_COOKIE_NAME}=${idToken}; Path=/;httpOnly=true; Domain=${domain}`,
  ])
}
