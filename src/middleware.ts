import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { ACCESS_TOKEN_COOKIE_NAME } from './constants'

const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const AUDIENCE = process.env.NEXT_PUBLIC_AUDIENCE

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? null

  const tokenValid = await validateToken(accessToken)

  if (!tokenValid) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

const validateToken = async (accessToken: string | null): Promise<boolean> => {
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

export const config = {
  // matcher: ['/((?!login).*)'],
  matcher: ['/', '/projects'], // needs to be all, but exclude login
}
