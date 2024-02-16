const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI
const audience = process.env.NEXT_PUBLIC_AUDIENCE
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const scope = 'openid profile email'

export const LoginLink = () => {
  const loginUrl = `${domain}/authorize?response_type=code&scope=${scope}&client_id=${clientId}&audience=${audience}&redirect_uri=${redirectUri}`

  return <a href={loginUrl}>Login</a>
}
