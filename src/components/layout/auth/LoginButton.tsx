import Link from 'next/link'

export const LoginButton = () => {
  return (
    <Link href="/api/login">
      <button className="bg-purple-500 text-white px-6 py-2">Login</button>
    </Link>
  )
}
