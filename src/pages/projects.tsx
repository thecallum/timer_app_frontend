import { withAuthServerSideProps } from '@/auth/withAuthServerSideProps'
import { Layout } from '@/components/layout/layout'
import { Projects } from '@/features/projects'
import { CreateProjectModal } from '@/modals/create-project-modal'
import Head from 'next/head'

export default function Index() {
  return (
    <Layout>
      <>
        <Head>
          <title>Projects</title>
        </Head>
        <Projects />
        <CreateProjectModal />
      </>
    </Layout>
  )
}

export const getServerSideProps = withAuthServerSideProps()
