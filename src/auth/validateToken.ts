import * as jose from 'jose'

export const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
export const AUDIENCE = process.env.NEXT_PUBLIC_AUDIENCE

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
      audience: AUDIENCE,
    })
    return true
  } catch (error) {
    console.info('Error validating token')
    console.error(error)

    return false
  }
}
