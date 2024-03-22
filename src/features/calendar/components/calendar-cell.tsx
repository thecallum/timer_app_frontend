import classNames from 'classnames'
import { AddEventPopover } from './popovers/add-event-popover'
import { useClickOutContext } from '@/contexts/clickOutContext'
import { Fragment, memo, useMemo, useState } from 'react'
import dateFormat from 'dateformat'
import { PopoverComponentWrapper } from './PopoverComponentWrapper'
import { usePopover } from '../hooks/usePopover'

interface Props {
  day: Date
  containerRef: HTMLDivElement | null
}

export const CalendarCell = memo(function CalendarCell(props: Props) {
  const { day, containerRef } = props
  const { clickoutSubscriberCount } = useClickOutContext()

  // Dont open popover if other popovers still visible
  const disableClick = clickoutSubscriberCount > 0

  const [currentElement, setCurrentElement] = useState(0)

  const {
    handleOpen,
    handleClose,
    setReferenceElement,
    setPopperElement,
    showPopover,
    popperStyles,
    popperAttributes,
  } = usePopover(containerRef)

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
      <PopoverComponentWrapper
        showPopover={showPopover}
        setRef={setPopperElement}
        popperStyles={popperStyles}
        popperAttributes={popperAttributes}
      >
        <AddEventPopover
          containerRef={containerRef}
          close={handleClose}
          time={new Date()}
        />
      </PopoverComponentWrapper>

      <Fragment>
        {cellTimes.map((cellTime, index) => {
          return (
            <button
              key={index}
              aria-label={`Create an event on ${dateFormat(cellTime, 'MMMM D')} at ${dateFormat(cellTime, 'h:mm A')}.`}
              className={classNames(`flex-grow cursor-pointer rounded-sm`, {
                'bg-slate-200': showPopover && currentElement === index, // showPopover,
                'hover:bg-slate-50': !disableClick,
              })}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                if (disableClick) return

                setReferenceElement(e.currentTarget)
                setCurrentElement(index)

                handleOpen()
              }}
            ></button>
          )
        })}
      </Fragment>
    </div>
  )
})
