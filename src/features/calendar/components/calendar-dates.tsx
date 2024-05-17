import classNames from 'classnames'
import { formatDuration } from '@/helpers/formatter'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { getTodaysDate } from '@/helpers/getTodaysDate'
import dateFormat from 'dateformat'
import { calculateEventDurationForDayOfWeek } from '@/helpers/timeHelpers'

export const CalendarDates = () => {
  const { daysOfWeek, events } = useCalendarEventsContext()

  const isToday = (date: Date) => {
    const today = getTodaysDate()

    if (date.getDate() !== today.getDate()) return false
    if (date.getMonth() !== today.getMonth()) return false
    if (date.getFullYear() !== today.getFullYear()) return false

    return true
  }

  const weekDaysArray = daysOfWeek.map((x) => {
    const duration = calculateEventDurationForDayOfWeek(x, events)

    return {
      date: x,
      day: dateFormat(x, 'dd'),
      name: dateFormat(x, 'ddd'),
      time: formatDuration(duration),
      current: isToday(x),
    }
  })

  return (
    <div className="ml-6 mb-2 h-12 lg:ml-16 mr-[10px]">
      <ul
        className={`grid `}
        style={{
          gridTemplateColumns: `repeat(${weekDaysArray.length}, minmax(0, 1fr))`,
        }}
        aria-label="Days of week"
      >
        {weekDaysArray.map(({ day, name, time, current, date }) => (
          <li className="" key={name}>
            <div className="flex flex-col items-center  lg:grid lg:grid-cols-2 lg:gap-2">
              <div
                className={classNames(
                  ' text-2xl font-light w-9 h-9 rounded-full flex items-center lg:justify-self-end justify-center ',
                  {
                    'bg-purple-100': current,
                    'text-slate-600': !current,
                    'text-purple-500': current,
                  },
                )}
              >
                <span
                  className="text-center text-lg lg:text-2xl "
                  aria-label="Day of month"
                >
                  {day}
                </span>
              </div>
              <div className="flex flex-col">
                <div
                  className="text-slate-600 text-xs mb-1"
                  aria-label="Day of week"
                >
                  {name}
                </div>
                <div
                  className="text-slate-500 text-xs hidden xl:block"
                  aria-label={`Total event duration for ${dateFormat(date, 'dddd')}`}
                >
                  {time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
