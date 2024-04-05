import axios, { AxiosRequestConfig } from 'axios'
import { AUTH_DOMAIN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './config'

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

    return {
      accessToken: response.data['access_token'],
      refreshToken: response.data['refresh_token'],
      idToken: response.data['id_token'],
    }
  } catch (error) {
    return null
  }
}
