import Link from 'next/link'
import { useRouter } from 'next/router'
import { LoginForm } from '../components/login-form'
import { Page } from '@/components/layout/page'

export const Login = () => {
  const router = useRouter()

  // props: { email: string; password: string }
  const onSubmit = () => {
    if (confirm('Continue to calendar')) {
      router.push('/calendar')
    }
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-[calc(100%-60px)] max-w-[600px] ">
        <div className="mb-4">
          <h1 className="text-2xl text-slate-700">Login</h1>
          <div className="text-base text-slate-500">
            Don&apos;t have an account?{' '}
            <Link className="text-blue-600 underline" href="/signup">
              Sign up
            </Link>
            .
          </div>
        </div>

        <Page>
          <LoginForm onSubmit={onSubmit} />
        </Page>
      </div>
    </div>
  )
}
