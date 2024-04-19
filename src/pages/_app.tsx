import { CalendarContextProvider } from '@/contexts/calendarEventContext'
import { ClickOutContextProvider } from '@/contexts/clickOutContext'
import { CreateProjectModalContextProvider } from '@/contexts/createProjectModalContext'
import { ProjectsContextProvider } from '@/contexts/projectsContext'
import { TimerContextProvider } from '@/features/timer/context/contextProvider'
import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'
import { inter } from '@/components/layout/fonts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ProjectsContextProvider>
        <CalendarContextProvider>
          <ClickOutContextProvider>
            <TimerContextProvider>
              <CreateProjectModalContextProvider>
                <Component {...pageProps} />
              </CreateProjectModalContextProvider>
            </TimerContextProvider>
          </ClickOutContextProvider>
        </CalendarContextProvider>
      </ProjectsContextProvider>
    </main>
  )
}
