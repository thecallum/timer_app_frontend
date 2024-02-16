import { useIsOpenRoute } from '@/auth/useIsOpenRoute'
import { Header } from '@/components/layout/header'
import { Nav } from '@/components/layout/nav'
import { TimerControls } from '@/features/timer'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

interface Props {
  children: JSX.Element
}

export const Layout = (props: Props) => {
  const { children } = props

  const isOpenRoute = useIsOpenRoute()
  const [showNavbar, setShowNavbar] = useState(false)

  const toggleNavbar = () => {
    setShowNavbar((x) => !x)
  }

  const closeNavbar = () => {
    setShowNavbar(false)
  }

  return (
    <>
      <Header toggleNavbar={toggleNavbar} />

      <div className="flex flex-row h-[calc(100vh-4rem)] grow-0 lg:h-[100vh]">
        <Nav closeNavbar={closeNavbar} showNavbar={showNavbar} />

        <div className="flex-grow w-[calc(100%-10rem)]">
          {!isOpenRoute && <TimerControls />}

          <div className="h-[calc(100%-3.5rem)]">{children}</div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
