import classNames from 'classnames'
import Link from 'next/link'

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
          'bg-slate-600 w-40 p-2 flex-shrink-0 text-white shadow-md absolute top-0 h-full z-[100] lg:static lg:h-auto lg:block',
          {
            hidden: !showNavbar,
          },
        )}
      >
        <div
          className="w-32 bg-slate-600 rounded-md p-1 px-2 text-slate-300 justify-start items-center mb-8 hidden lg:flex"
          style={{ fontFamily: 'Nova Square' }}
        >
          <span>Time</span>
          <span className="w-2 h-2 mx-2 rounded-full bg-purple-300 block"></span>
          <span>Tracker</span>
        </div>

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
