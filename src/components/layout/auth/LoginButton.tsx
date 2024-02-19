import { LOGIN_URL } from './loginUrl'

export const LoginButton = () => {
  return (
    <a href={LOGIN_URL}>
      <button className="bg-purple-500 text-white px-6 py-2">Login</button>
    </a>
  )
}
