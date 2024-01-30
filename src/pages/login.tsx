import { Login } from '@/features/auth/views/login'
import Head from 'next/head'
import { Bucket } from 'sst/node/bucket'
import { Config } from 'sst/node/config'

export default function Index() {

// Config.SERVICE_API_URL
// 





  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />;
    </>
  )
}
