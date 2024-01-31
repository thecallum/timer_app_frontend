import { ProjectSelector } from '@/components/projectSelector'
import { formatDuration } from '@/helpers/formatter'
import { useRef } from 'react'
import dayjs from 'dayjs'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { useTimerContext } from '../context/hooks/useTimerContext'
import { CalendarEventApiRequestObject } from '@/requests/types'
import classNames from 'classnames'

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

  const input = useRef<HTMLInputElement>(null)

  const handleStartTimer = () => {
    if (description === null || description.trim() === '') {
      input.current?.focus()
      return
    }

    startTimer()
  }

  const handleStopTimer = () => {
    stopTimer()

    const request: CalendarEventApiRequestObject = {
      description,
      startTime: dayjs().add(time * -1, 'second'),
      endTime: dayjs(),
      projectId: projectId,
    }

    addEvent(request).then(() => {
      reset()
    })
  }

  const reset = () => {
    setDescription('')
    setProject(null)
  }

  return (
    <div className="bg-purple-500 flex h-14  w-full px-2 shadow-md  flex-col items-center justify-center">
      <div className="max-w-[1540px] items-center flex-row justify-end flex w-full ">
        <div className="flex-grow  mr-2 ">
          <input
            ref={input}
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
            onClick={isRunning ? handleStopTimer : handleStartTimer}
            className={classNames(
              'w-10 h-10 rounded-full  flex items-center justify-center shadow-md bg-purple-700 ',
            )}
          >
            {isRunning ? (
              <span className="w-4 h-4 bg-purple-200 shadow-sm rounded-[2px]"></span>
            ) : (
              <span
                className="bg-purple-200 w-6 h-6 shadow-sm "
                style={{
                  clipPath: 'polygon(20% 10%, 100% 50%, 20% 90%)',
                }}
              ></span>
            )}
          </button>
        </div>

        <div
          className={classNames('mr-4  text-xl shrink-0 ', {
            'text-purple-300': !isRunning,
            'text-purple-100': isRunning,
          })}
        >
          <span className="font-mono">{formatDuration(time)}</span>
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
