import { TimerControls } from '@/features/timer'

const Logo = () => {
  return (
    <div className="w-40 px-2 flex-shrink-0 flex-grow-0 flex justify-center">
      <div
        className="bg-slate-600 rounded-md p-1 px-2 text-slate-300 flex justify-start items-center"
        style={{ fontFamily: 'Nova Square' }}
      >
        <span>Time</span>
        <span className="w-2 h-2 mx-2 rounded-full bg-purple-300 block"></span>
        <span>Tracker</span>
      </div>
    </div>
  )
}

interface Props {
  showTimerControls: boolean
}

export const Header = (props: Props) => {
  const { showTimerControls } = props

  return (
    <header className="h-16 bg-slate-700 flex items-center flex-col justify-center">
      <div className="flex flex-row justify-between items-center w-full pr-2">
        <Logo />

        {showTimerControls && <TimerControls />}
      </div>
    </header>
  )
}
