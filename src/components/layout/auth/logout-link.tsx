const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const LogoutLink = () => {
  // const logoutUrl = `${domain}/v2/logout?client_id=${clientId}&returnTo=${baseUrl}`
  const logoutUrl = `/api/logout`

  return <a href={logoutUrl}>Sign out</a>
}
