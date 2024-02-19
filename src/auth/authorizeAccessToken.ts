import axios, { AxiosRequestConfig } from 'axios'
import { Config } from 'sst/node/config'

const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_LOCAL_ENV === 'true'
    ? 'http://localhost:3000/api/authorize'
    : process.env.NEXT_PUBLIC_REDIRECT_URI

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CLIENT_SECRET = process.env.TEST === 'true' ? '' : Config.CLIENT_SECRET

export const authorizeAccessToken = async (
  code: string,
): Promise<{
  accessToken: string
  refreshToken: string
  idToken: string
} | null> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${AUTH_DOMAIN}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    },
  }

  try {
    const response = await axios.request(config)

    // console.log({ data: response.data })

    return {
      accessToken: response.data['access_token'],
      refreshToken: response.data['refresh_token'],
      idToken: response.data['id_token'],
    }
  } catch (error) {
    // console.error({ error })
    return null
  }
}
