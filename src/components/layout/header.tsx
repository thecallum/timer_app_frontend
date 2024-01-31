import { TimerControls } from '@/features/timer'
import { Logo } from './logo'

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
