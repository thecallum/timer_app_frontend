import { withAuthServerSideProps } from '@/auth/withAuthServerSideProps'
import { Projects } from '@/features/projects'
import { CreateProjectModal } from '@/modals/create-project-modal'
import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Projects />
      <CreateProjectModal />
    </>
  )
}


export const getServerSideProps = withAuthServerSideProps()
