const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const redirectUri =
  process.env.NEXT_PUBLIC_LOCAL_ENV === 'true'
    ? 'http://localhost:3000/api/authorize'
    : process.env.NEXT_PUBLIC_REDIRECT_URI
const audience = process.env.NEXT_PUBLIC_AUDIENCE
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const scope = 'openid profile email offline_access'

export const LOGIN_URL = `${domain}/authorize?response_type=code&scope=${scope}&client_id=${clientId}&audience=${audience}&redirect_uri=${redirectUri}`;
