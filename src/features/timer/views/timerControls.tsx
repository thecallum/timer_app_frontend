import { ProjectSelector } from '@/components/projectSelector'
import { formatDuration } from '@/helpers/formatter'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { useTimerContext } from '../context/hooks/useTimerContext'
import { CalendarEventApiRequestObject } from '@/requests/types'
import classNames from 'classnames'
import { getTodaysDate } from '@/helpers/getTodaysDate'
import { robotoMono } from '@/components/layout/fonts'

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
      startTime: new Date(now.getTime() + time * -1000),
      endTime: now,
      projectId: projectId,
    }

    addEvent(request).then((status) => {
      if (!status.success) return

      close()
    })
  }

  return (
    <div className="bg-purple-500 flex w-full  lg:w-[calc(100%-10rem)] z-10 shadow-md flex-col items-center justify-center fixed mt-14 lg:mt-0">
      <div className=" items-center justify-end flex w-full  flex-col-reverse">
        <div className="w-full bg-purple-500 ">
          <div className="max-w-[1540px] w-full mx-auto">
            <input
              type="text"
              name="description"
              id="description"
              aria-label="Event description"
              value={description}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              className="text-purple-100 placeholder-purple-200  w-full outline-none bg-transparent  focus:border-slate-400 px-2 h-9 "
              placeholder="What are you working on?"
            />
          </div>
        </div>

        <div className="bg-purple-400 w-full shadow-md">
          <div className="max-w-[1540px] w-full mx-auto flex items-center justify-between flex-row py-2 px-2 ">
            <div className="flex justify-start items-center">
              <div className="shrink-0 mr-2">
                <button
                  aria-label={
                    isRunning
                      ? 'Save current recording'
                      : 'Start recording an event'
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
                  className={classNames([robotoMono.className, 'text-2xl'])}
                >
                  {formatDuration(time)}
                </span>
              </div>
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
      </div>
    </div>
  )
}
