import { LoginLink } from '@/components/layout/auth/login-link'
import { Page } from '@/components/layout/page'
import { LoginForm } from '@/features/auth/components/login-form'
import { Login } from '@/features/auth/views/login'
import Head from 'next/head'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col items-center mt-8">
        <div className="w-[calc(100%-30px)] sm:w-[calc(100%-60px)] max-w-[600px] sm:pt-6 lg:pt-12 ">
         

          <Page>
            <div>
            <div className="mb-4">
            <h1 className="text-2xl text-slate-700">Login</h1>
            <div className="text-base text-slate-500">
              Login or sign up via Auth0's Universal Login page.
             
            </div>
          </div>

              <button className='bg-purple-500 text-white px-6 py-2'>
              <LoginLink />
              </button>
            </div>
          </Page>
        </div>
      </div>
    </>
  )
}
