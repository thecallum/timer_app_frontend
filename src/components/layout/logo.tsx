import classNames from 'classnames'
import { orbitron } from './fonts'

export const Logo = () => {
  return (
    <div className="justify-center items-center flex w-full h-14">
      <div
        className={classNames([
          orbitron.className,
          'bg-slate-300 rounded-md py-1 px-2 h-8 text-slate-500 shadow-xl',
        ])}
      >
        Time Tracker
      </div>
    </div>
  )
}
