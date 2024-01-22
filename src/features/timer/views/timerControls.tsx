import { ProjectSelector } from '@/components/projectSelector'
import { formatDuration } from '@/helpers/formatter'
import { CalendarEvent } from '@/features/calendar/types/types'
import { useRef } from 'react'
import dayjs from 'dayjs'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { useTimerContext } from '../context/hooks/useTimerContext'

export const TimerControls = () => {
  const { addEvent } = useCalendarEventsContext()

  const {
    startTimer,
    stopTimer,
    setProject,
    setDescription,
    time,
    isRunning,
    project,
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

    const request = {
      description,
      startTime: dayjs().add(time * -1, 'second'),
      endTime: dayjs(),
      // project ?? undefined,
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
    <div className="flex flex-row items-center justify-end w-full ml-2">
      <div className="flex-grow max-w-sm mr-2">
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
          className="text-white w-full outline-none border border-transparent focus:border-slate-400   bg-slate-600 rounded-md mr-2 px-2 h-9"
          placeholder="(no description)"
        />
      </div>

      <div className="mr-2">
        <ProjectSelector
          containerRef={null}
          project={project}
          setProject={setProject}
        />
      </div>

      <div className="mr-4 text-slate-200 text-xl">
        <span className="font-mono">{formatDuration(time)}</span>
      </div>

      {isRunning ? (
        <button
          onClick={handleStopTimer}
          className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shadow-sm"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-rose-900"
            >
              <path
                fill="currentColor"
                d="M6 16V8q0-.825.588-1.413T8 6h8q.825 0 1.413.588T18 8v8q0 .825-.588 1.413T16 18H8q-.825 0-1.413-.588T6 16Z"
              />
            </svg>
          </span>
        </button>
      ) : (
        <button
          onClick={handleStartTimer}
          className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center shadow-sm "
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-emerald-900"
            >
              <path
                fill="currentColor"
                d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475q0 .25-.113.475t-.337.375l-8.15 5.175q-.125.075-.263.113T9 18.175q-.4 0-.7-.288t-.3-.712Z"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}