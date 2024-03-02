import { ProjectSelector } from '@/components/projectSelector'
import { formatDuration } from '@/helpers/formatter'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { useTimerContext } from '../context/hooks/useTimerContext'
import { CalendarEventApiRequestObject } from '@/requests/types'
import classNames from 'classnames'
import { getTodaysDate } from '@/helpers/getTodaysDate'
import { inconsolata } from '@/components/layout/fonts'

export const TimerControls = () => {
  const { addEvent } = useCalendarEventsContext()

  const {
    startTimer,
    stopTimer,
    setProject,
    setDescription,
    time,
    isRunning,
    projectId,
    description,
  } = useTimerContext()

  const handleStartTimer = () => {
    startTimer()
  }

  const handleStopTimer = () => {
    stopTimer()

    const now = getTodaysDate()

    const request: CalendarEventApiRequestObject = {
      description: description,
      startTime: now.add(time * -1, 'second'),
      endTime: now,
      projectId: projectId,
    }

    addEvent(request).then((status) => {
      if (!status.success) return

      close()
    })
  }

  return (
    <div className="bg-purple-500 flex h-14 w-full px-2 shadow-md flex-col items-center justify-center">
      <div className="max-w-[1540px] items-center flex-row justify-end flex w-full ">
        <div className="flex-grow  mr-2 ">
          <input
            type="text"
            name="description"
            id="description"
            aria-label="Event description"
            value={description}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            className="text-purple-100 placeholder-purple-200  w-full outline-none bg-transparent  focus:border-slate-400 mr-2 px-2 h-9"
            placeholder="What are you working on?"
          />
        </div>

        <div className="mr-2 shrink-0">
          <button
            aria-label={
              isRunning ? 'Save current recording' : 'Start recording an event'
            }
            onClick={isRunning ? handleStopTimer : handleStartTimer}
            className={
              'w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-purple-700 '
            }
          >
            <span
              className={classNames(
                ' shadow-sm rounded-[2px]',
                isRunning
                  ? `w-4 h-4 bg-purple-200 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]`
                  : `w-5 h-5 bg-purple-300 [clip-path:polygon(20%_10%,100%_50%,20%_90%)]`,
              )}
            />
          </button>
        </div>

        <div
          className={classNames('mr-4  text-xl shrink-0 ', {
            'text-purple-300': !isRunning,
            'text-purple-100': isRunning,
          })}
        >
          <span 
          className={classNames([
            inconsolata.className,
            "text-2xl"
          ])}
          >
            {formatDuration(time)}
          </span>
        </div>

        <div className="shrink-0">
          <ProjectSelector
            containerRef={null}
            projectId={projectId}
            setProjectId={setProject}
          />
        </div>
      </div>
    </div>
  )
}
