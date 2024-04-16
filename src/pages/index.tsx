import { Calendar } from '@/features/calendar'
import { CreateProjectModal } from '@/modals/create-project-modal'
import Head from 'next/head'
import { withAuthServerSideProps } from '../auth/withAuthServerSideProps'
import { Layout } from '@/components/layout/layout'

export default function Home() {
  return (
    <Layout>
      <>
        <Head>
          <title>Calendar</title>
        </Head>
        <Calendar />
        <CreateProjectModal />
      </>
    </Layout>
  )
}

export const getServerSideProps = withAuthServerSideProps()
