import { useRouter } from 'next/router'

export const OPEN_ROUTES = new Set(['/login'])

export const useIsOpenRoute = () => {
  const router = useRouter()

  return OPEN_ROUTES.has(router.pathname)
}
