import classNames from 'classnames'
import dayjs from 'dayjs'
import { calculateDuration } from '../helpers/duration'
import { formatDuration } from '@/helpers/formatter'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { getTodaysDate } from '@/helpers/getTodaysDate'

export const CalendarDates = () => {
  const { daysOfWeek, events } = useCalendarEventsContext()

  const weekDaysArray = daysOfWeek.map((x) => {
    const eventsOnThisDay = events.filter((e) =>
      e.startTime.startOf('day').isSame(x.startOf('day')),
    )

    return {
      day: x.format('DD'),
      name: x.format('ddd'),
      time: formatDuration(calculateDuration(eventsOnThisDay)),
      current: x.isSame(getTodaysDate(), 'day'),
    }
  })

  return (
    <div className="ml-6 mb-2 h-12 lg:ml-16">
      <ul className="flex justify-between">
        {weekDaysArray.map(({ day, name, time, current }) => (
          <li className="flex-grow" key={name}>
            <div className="flex flex-col items-center lg:flex-row justify-center">
              <div
                className={classNames(
                  ' text-2xl font-light w-9 h-9 rounded-full flex items-center justify-center lg:mr-3',
                  {
                    'bg-purple-100': current,
                    'text-slate-600': !current,
                    'text-purple-500': current,
                  },
                )}
              >
                <span className="text-center text-lg lg:text-2xl">{day}</span>
              </div>
              <div className="flex flex-col">
                <div className="text-slate-600 text-xs mb-1">{name}</div>
                <div className="text-slate-500 text-xs hidden lg:block">
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
