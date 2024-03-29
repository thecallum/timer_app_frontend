import { Config } from 'sst/node/config'

export const AUTH_DOMAIN = process.env.AUTH_DOMAIN
export const CLIENT_ID = process.env.CLIENT_ID
export const AUTH_AUDIENCE = process.env.AUDIENCE
export const CLIENT_SECRET = Config.CLIENT_SECRET
export const AUTH_SCOPE = 'openid profile email offline_access'

export const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/authorize'
    : process.env.REDIRECT_URI

export const COOKIE_DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.COOKIE_DOMAIN ?? ''
