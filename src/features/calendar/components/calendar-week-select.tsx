import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import dateFormat from 'dateformat'

export const CalendarWeekSelect = () => {
  const { daysOfWeek, next, previous, reset } = useCalendarEventsContext()

  const startOfWeek = dateFormat(daysOfWeek[0], 'dd mmm')
  const endOfWeek = dateFormat(daysOfWeek[daysOfWeek.length - 1], 'dd mmm')

  return (
    <div
      className="w-full sm:w-auto shrink-0"
      aria-label="Calendar week selector"
    >
      <div
        className="bg-white rounded border-slate-300 border h-14 px-6 shadow-sm text-slate-800 flex justify-center items-center"
        aria-label="Page controls"
      >
        <button onClick={previous} aria-label="Show previous week">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
            />
          </svg>
        </button>

        <span className="mx-3">
          {startOfWeek === endOfWeek
            ? `${startOfWeek}`
            : `${startOfWeek} - ${endOfWeek}`}
        </span>
        <button onClick={next} aria-label="Show next week">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6l4.6-4.6Z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between">
        <button
          onClick={previous}
          className="underline cursor-pointer text-sm text-slate-600"
        >
          Previous
        </button>
        <span>
          <button
            onClick={reset}
            aria-label="Show current week"
            className="mr-6 underline cursor-pointer text-sm text-slate-600"
          >
            Today
          </button>
          <button
            onClick={next}
            className="underline cursor-pointer text-sm text-slate-600"
          >
            Next
          </button>
        </span>
      </div>
    </div>
  )
}
