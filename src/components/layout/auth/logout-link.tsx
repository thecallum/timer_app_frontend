// import axios from 'axios'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export const LogoutLink = () => {
  // const router = useRouter()

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('/api/logout', {
  //       key: 'static_key',
  //     })

  //     router.push('/login')
  //     window.location.reload()
  //   } catch (error) {
  //     console.error('Request failed', error) // Handle error
  //   }
  // }

  return (
    <Link
      // role="link" onClick={handleLogout}
      href="/api/logout"
    >
      Sign out
    </Link>
  )
}
