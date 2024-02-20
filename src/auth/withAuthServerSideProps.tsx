import { refreshAccessToken } from './refreshAccessToken'
import { validateToken } from '@/auth/validateToken'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/auth/constants'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { setCookies } from './setCookies'
import { deleteAllCookies } from './deleteAllCookies'

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

      setCookies(res, accessToken, refreshToken, refreshTokenResult.idToken)
    }

    if (getServerSidePropsFunc) return getServerSidePropsFunc(context)

    return {
      props: {},
    }
  }
}
