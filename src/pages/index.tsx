import { Calendar } from '@/features/calendar'
import { CreateProjectModal } from '@/modals/create-project-modal'
import Head from 'next/head'
import { withAuthServerSideProps } from '../auth/withAuthServerSideProps'

export default function Home() {
  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <Calendar />
      <CreateProjectModal />
    </>
  )
}

export const getServerSideProps = withAuthServerSideProps()
