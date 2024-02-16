import { COOKIE_NAME } from '@/constants'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export const OPEN_ROUTES = new Set(['/login'])

export const useIsOpenRoute = () => {
  const router = useRouter()

  return OPEN_ROUTES.has(router.pathname)
}

export const useIsAuthorized = () => {
  // is actually just checking for cookie
  // if the cookie is invalid, middleware should redirect user to login page

  const cookieExists = !!Cookies.get(COOKIE_NAME)

  return cookieExists
}
