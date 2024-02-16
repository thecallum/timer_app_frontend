import { CalendarContextProvider } from '@/contexts/calendarEventContext'
import { ClickOutContextProvider } from '@/contexts/clickOutContext'
import { CreateProjectModalContextProvider } from '@/contexts/createProjectModalContext'
import { ProjectsContextProvider } from '@/contexts/projectsContext'
import { TimerContextProvider } from '@/features/timer/context/contextProvider'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout/layout'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProjectsContextProvider>
      <CalendarContextProvider>
        <ClickOutContextProvider>
          <TimerContextProvider>
            <CreateProjectModalContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CreateProjectModalContextProvider>
          </TimerContextProvider>
        </ClickOutContextProvider>
      </CalendarContextProvider>
    </ProjectsContextProvider>
  )
}
