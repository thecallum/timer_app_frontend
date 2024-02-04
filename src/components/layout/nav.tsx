import classNames from 'classnames'
import Link from 'next/link'
import { Logo } from './logo'

interface Props {
  showNavbar: boolean
  closeNavbar: () => void
}

export const Nav = (props: Props) => {
  const { showNavbar, closeNavbar } = props

  return (
    <nav
      className={classNames(
        `bg-slate-700 w-full lg:w-40  flex-shrink-0 flex flex-col text-slate-200 shadow-2xl absolute top-0 h-full z-[100] 
        lg:static lg:h-full lg:block overflow-hidden`,
        {
          hidden: !showNavbar,
        },
      )}
    >
      <div className="hidden lg:block">
        <Logo />
      </div>

      <div className="flex justify-end h-16 px-2 items-center lg:hidden">
        <button
          className={`
      w-9 h-9 rounded-full  flex items-center  justify-center shrink-0 cursor-pointer
       focus:bg-slate-600 hover:bg-slate-600 
      `}
          onClick={closeNavbar}
        >
          <div className="flex flex-col items-center justify-center w-[24px] relative">
            <div className="w-full h-[2px] bg-slate-200 rounded-sm absolute rotate-45" />
            <div className="w-full h-[2px] bg-slate-200 rounded-sm absolute -rotate-45" />
          </div>
        </button>
      </div>

      <div className="flex-col h-full justify-center items-start flex   box-boder  px-10 text-center shrink-1 lg:text-left lg:justify-between lg:items-center lg:h-[calc(100%-4rem)] lg:pb-2 lg:mt-0 lg:px-4">
        <ul className="text-4xl  font-extralight lg:text-lg [&>li]:mb-4 w-full lg:[&>li]:mb-0  ">
          <li className="hover:underline">
            <Link href="/calendar" onClick={closeNavbar}>Calendar</Link>
          </li>
          <li className="hover:underline">
            <Link href="/projects" onClick={closeNavbar}>Projects</Link>
          </li>
        </ul>

        <ul className="text-4xl font-extralight lg:text-lg [&>li]:mb-4 w-full lg:[&>li]:mb-0  ">
          <li className="line-through text-slate-400">Account</li>
          <li className="line-through text-slate-400">Sign out</li>
        </ul>
      </div>
    </nav>
  )
}
