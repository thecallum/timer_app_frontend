import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants'
import Cookies from 'js-cookie'

export const useIsAuthorized = () => {
  // is actually just checking for cookie
  // actual validation can be taken care of by middleware
  const cookieExists = !!Cookies.get(ACCESS_TOKEN_COOKIE_NAME)

  return cookieExists
}
