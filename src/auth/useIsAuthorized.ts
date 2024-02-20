import { IS_AUTHORIZED_COOKIE_NAME } from '@/auth/constants'
import Cookies from 'js-cookie'

export const useIsAuthorized = () => {
  // is actually just checking for cookie
  // actual validation can be taken care of by middleware
  const cookieExists = !!Cookies.get(IS_AUTHORIZED_COOKIE_NAME)

  return cookieExists
}
