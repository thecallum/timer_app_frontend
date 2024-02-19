import { LoginButton } from '@/components/layout/auth/LoginButton'
import { Page } from '@/components/layout/page'
import Head from 'next/head'

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
                  Login or sign up via Auth0&apos;s Universal Login page.
                </div>
              </div>

              <LoginButton />
            </div>
          </Page>
        </div>
      </div>
    </>
  )
}
