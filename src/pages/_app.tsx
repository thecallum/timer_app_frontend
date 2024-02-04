import { Header } from '@/components/layout/header'
import { Nav } from '@/components/layout/nav'
import { CalendarContextProvider } from '@/contexts/calendarEventContext'
import { ClickOutContextProvider } from '@/contexts/clickOutContext'
import { CreateProjectModalContextProvider } from '@/contexts/createProjectModalContext'
import { ProjectsContextProvider } from '@/contexts/projectsContext'
import { TimerControls } from '@/features/timer'
import { TimerContextProvider } from '@/features/timer/context/contextProvider'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const authPages = new Set(['/calendar', '/projects'])

interface Props {
  children: JSX.Element
}

const ContextProviderWrappers = ({ children }: Props) => {
  return (
    <ProjectsContextProvider>
      <CalendarContextProvider>
        <ClickOutContextProvider>
          <TimerContextProvider>
            <CreateProjectModalContextProvider>
              {children}
            </CreateProjectModalContextProvider>
          </TimerContextProvider>
        </ClickOutContextProvider>
      </CalendarContextProvider>
    </ProjectsContextProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isAuthorizedPage = authPages.has(router.pathname)

  const [showNavbar, setShowNavbar] = useState(false)

  const toggleNavbar = () => {
    setShowNavbar((x) => !x)
  }

  const closeNavbar = () => {
    setShowNavbar(false)
  }

  return (
    <ContextProviderWrappers>
      <>
        <Header toggleNavbar={toggleNavbar} />

        <div className="flex flex-row h-[calc(100vh-4rem)] grow-0 lg:h-[100vh]">
          {isAuthorizedPage && (
            <Nav closeNavbar={closeNavbar} showNavbar={showNavbar} />
          )}
          <div className="flex-grow w-[calc(100%-10rem)]">
            {isAuthorizedPage && <TimerControls />}

            <div className="h-[calc(100%-3.5rem)]">
              <Component {...pageProps} />
            </div>
          </div>
        </div>

        <ToastContainer />
      </>
    </ContextProviderWrappers>
  )
}
