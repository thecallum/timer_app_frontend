import axios, { AxiosRequestConfig } from 'axios'
import { AUTH_DOMAIN, CLIENT_ID, CLIENT_SECRET } from './config'

export const refreshAccessToken = async (
  refreshToken: string | null,
): Promise<{
  accessToken: string
  refreshToken: string
  idToken: string
} | null> => {
  if (refreshToken === null) return null

  const scope = 'openid profile email offline_access'

  const config: AxiosRequestConfig = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `${AUTH_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      scope,
    },
  }

  try {
    const response = await axios.request(config)

    return {
      accessToken: response.data['access_token'],
      refreshToken: response.data['refresh_token'],
      idToken: response.data['id_token'],
    }
  } catch (error) {
    // console.info({ error })
    return null
  }
}
