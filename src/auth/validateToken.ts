import * as jose from 'jose'
import { AUTH_AUDIENCE, AUTH_DOMAIN } from './config'

export const validateToken = async (
  accessToken: string | null,
): Promise<boolean> => {
  if (accessToken === null) return false

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${AUTH_DOMAIN}/.well-known/jwks.json`),
  )

  try {
    await jose.jwtVerify(accessToken, JWKS, {
      issuer: `${AUTH_DOMAIN}/`,
      audience: AUTH_AUDIENCE,
    })
    return true
  } catch (error) {
    return false
  }
}
