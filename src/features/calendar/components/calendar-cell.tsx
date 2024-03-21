import classNames from 'classnames'
import { PopoverWrapper } from './popover-wrapper'
import { AddEventPopover } from './popovers/add-event-popover'
import { useClickOutContext } from '@/contexts/clickOutContext'
import { memo, useMemo } from 'react'
import dateFormat from 'dateformat'

interface Props {
  day: Date
  containerRef: HTMLDivElement | null
}

export const CalendarCell = memo(function CalendarCell(props: Props) {
  const { day, containerRef } = props
  const { clickoutSubscriberCount } = useClickOutContext()

  // Dont open popover if other popovers still visible
  const disableClick = clickoutSubscriberCount > 0

  const cellTimes = useMemo(
    () =>
      [...Array(4)].map((_, index) => {
        const date = new Date(day)

        date.setMinutes(date.getMinutes() + 15 * index)
        return date
      }),
    [day],
  )

  return (
    <div className="border-slate-200 h-32 border-b flex flex-col">
      {cellTimes.map((cellTime, index) => {
        return (
          <PopoverWrapper
            containerRef={containerRef}
            popoverComponent={({ close }) => (
              <AddEventPopover
                containerRef={containerRef}
                close={close}
                time={cellTime}
              />
            )}
            key={index}
          >
            {({ ref, onClick, showPopover }) => (
              <button
                aria-label={`Create an event on ${dateFormat(cellTime, 'MMMM D')} at ${dateFormat(cellTime, 'h:mm A')}.`}
                className={classNames(`flex-grow cursor-pointer rounded-sm`, {
                  'bg-slate-200': showPopover,
                  'hover:bg-slate-50': !disableClick,
                })}
                // @ts-expect-error work around for react-popper library issue
                ref={ref}
                onClick={() => {
                  if (disableClick) return
                  onClick()
                }}
              ></button>
            )}
          </PopoverWrapper>
        )
      })}
    </div>
  )
})
