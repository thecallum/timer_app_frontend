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
    <div>
      <Header toggleNavbar={toggleNavbar} />

      <Nav closeNavbar={closeNavbar} showNavbar={showNavbar} />

      <div className="flex">
        <div className="flex-grow w-auto lg:ml-40">
          {!isOpenRoute && <TimerControls />}

          <div className="h-auto mt-[180px] lg:mt-[124px]">{children}</div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
