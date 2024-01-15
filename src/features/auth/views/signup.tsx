import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignupForm } from '../components/signup-form'
import { Page } from '@/components/layout/page'

export const Signup = () => {
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
          <h1 className="text-2xl text-slate-700">Sign up</h1>
          <div className="text-base text-slate-500">
            Already have an account?{' '}
            <Link className="text-blue-600 underline" href="/login">
              Login
            </Link>
            .
          </div>
        </div>

        <Page>
          <SignupForm onSubmit={onSubmit} />
        </Page>
      </div>
    </div>
  )
}
