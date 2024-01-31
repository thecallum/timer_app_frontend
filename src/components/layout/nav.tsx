import classNames from 'classnames'
import Link from 'next/link'
import { Logo } from './logo'

interface Props {
  showNavbar: boolean
  toggleNavbar: () => void
}

export const Nav = (props: Props) => {
  const { showNavbar, toggleNavbar } = props

  return (
    <>
      {/* overlay */}
      <button
        onClick={toggleNavbar}
        className={classNames(
          'bg-slate-900 opacity-50 z-[90] absolute top-0 left-0 w-full h-full lg:hidden',
          {
            hidden: !showNavbar,
          },
        )}
      />

      <nav
        className={classNames(
          'bg-slate-700  w-40 p-2 flex-shrink-0 text-white shadow-2xl absolute top-0 h-full z-[100] lg:static lg:h-auto lg:block',
          {
            hidden: !showNavbar,
          },
        )}
      >
        <Logo />

        <div>
          <button onClick={toggleNavbar}>close</button>
        </div>

        <div className="flex-col justify-between items-start  flex">
          <div className="w-full">
            <h2 className="text-slate-400 text-xs mb-1">Track</h2>
            <hr className="w-full border-slate-400 mb-2" />

            <ul>
              <li>
                <Link href="/calendar">Calendar</Link>
              </li>
              <li className="line-through">Analytics</li>
            </ul>

            <h2 className="text-slate-400 text-xs mt-4 mb-1">Manage</h2>
            <hr className="w-full border-slate-400 mb-2" />
            <ul>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-slate-400 text-xs mb-1">Profile</h2>
            <hr className="w-full border-slate-400 mb-2" />

            <ul>
              <li className="line-through">Account</li>
              <li className="line-through">Sign out</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
