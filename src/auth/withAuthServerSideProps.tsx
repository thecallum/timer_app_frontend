import { refreshAccessToken } from './refreshAccessToken'
import { validateToken } from '@/auth/validateToken'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import * as cookie from 'cookie'
import { ServerResponse, IncomingMessage } from 'http'

export const withAuthServerSideProps = (
  getServerSidePropsFunc?: GetServerSideProps,
) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context
    const cookies = req.cookies
    let accessToken = cookies[ACCESS_TOKEN_COOKIE_NAME] ?? null
    let refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME] ?? null

    const tokenValid = await validateToken(accessToken)

    if (!tokenValid) {
      const refreshTokenResult = await refreshAccessToken(refreshToken)

      if (refreshTokenResult === null) {
        deleteAllCookies(res)

        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }

      accessToken = refreshTokenResult.accessToken
      refreshToken = refreshTokenResult.refreshToken

      res.setHeader('Set-Cookie', [
        `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Path=/;`,
        `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; Path=/;httpOnly=true;`,
        `${ID_TOKEN_COOKIE_NAME}=${refreshTokenResult.idToken}; Path=/;httpOnly=true;`,
      ])
    }

    if (getServerSidePropsFunc) return getServerSidePropsFunc(context)

    return {
      props: {},
    }
  }
}

function deleteAllCookies(res: ServerResponse<IncomingMessage>) {
  res.setHeader('Set-Cookie', [
    cookie.serialize(ACCESS_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
    cookie.serialize(REFRESH_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
    cookie.serialize(ID_TOKEN_COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    }),
  ])
}
