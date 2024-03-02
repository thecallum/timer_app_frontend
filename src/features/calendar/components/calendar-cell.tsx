import classNames from 'classnames'
import { PopoverWrapper } from './popover-wrapper'
import { AddEventPopover } from './popovers/add-event-popover'
import dayjs from 'dayjs'
import { useClickOutContext } from '@/contexts/clickOutContext'

interface Props {
  day: dayjs.Dayjs
  containerRef: HTMLDivElement | null
}

export const CalendarCell = (props: Props) => {
  const { day, containerRef } = props
  const { clickoutSubscriberCount } = useClickOutContext()

  // Dont open popover if other popovers still visible
  const disableClick = clickoutSubscriberCount > 0

  return (
    <div className="border-slate-200 h-32 border-b flex flex-col">
      {[...Array(4)].map((_, index) => {
        const cellTime = day.add(15 * index, 'minute')

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
                aria-label={`Create an event on ${cellTime.format('MMMM D')} at ${cellTime.format('h:mm A')}.`}
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
}
