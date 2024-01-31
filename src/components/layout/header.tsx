import { TimerControls } from '@/features/timer'

interface Props {
  showTimerControls: boolean
  toggleNavbar: () => void
}

export const Header = (props: Props) => {
  const { showTimerControls, toggleNavbar } = props

  return (
    <header className="flex flex-col ">
      <div className=" bg-slate-700 px-2 py-5 shadow-lg flex justify-between lg:hidden">
        <div
          className="w-32 bg-slate-600 rounded-md p-1 px-2 text-slate-300 flex justify-start items-center"
          style={{ fontFamily: 'Nova Square' }}
        >
          <span>Time</span>
          <span className="w-2 h-2 mx-2 rounded-full bg-purple-300 block"></span>
          <span>Tracker</span>
        </div>

        <button
          onClick={toggleNavbar}
          className="bg-slate-200 rounded-full w-8 h-8  flex items-center justify-center shrink-0 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-between w-[16px] h-[12px] ">
            <div className="w-full h-[2px] bg-purple-500 rounded-sm"></div>
            <div className="w-full h-[2px] bg-purple-500 rounded-sm"></div>
            <div className="w-full h-[2px] bg-purple-500 rounded-sm"></div>
          </div>
        </button>
      </div>
    </header>
  )
}
