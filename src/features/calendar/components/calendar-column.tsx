import { memo, useState } from 'react'
import { usePopover } from '../hooks/usePopover'
import { AddEventPopover } from './popovers/add-event-popover'
import { PopoverComponentWrapper } from './PopoverComponentWrapper'
import { useClickOutContext } from '@/contexts/clickOutContext'
import { CalendarCellButton } from './CalendarCellButton'
import dateFormat from 'dateformat'

interface Props {
  day: Date
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
}

export const CalendarColumn = memo(function CalendarColumn(props: Props) {
  const { day, containerRef, gridSizeMultiplier } = props

  const {
    handleOpen,
    handleClose,
    setReferenceElement,
    setPopperElement,
    showPopover,
    popperStyles,
    popperAttributes,
  } = usePopover(containerRef)

  const { clickoutSubscriberCount } = useClickOutContext()

  const [currentSelectedButton, setCurrentSelectedButton] = useState<
    string | null
  >(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Dont open popover if other popovers still visible
  const disableClick = clickoutSubscriberCount > 0

  const openPopover = (referenceElement: HTMLElement) => {
    if (disableClick) return

    setReferenceElement(referenceElement)
    handleOpen()
  }

  // eg - March 8
  const dayString = dateFormat(day, 'mmmm d')

  // 0 - 23
  const calendarHours = [...Array(24)].map((_, index) => index * 1)

  return (
    <>
      <PopoverComponentWrapper
        showPopover={showPopover}
        setRef={setPopperElement}
        popperStyles={popperStyles}
        popperAttributes={popperAttributes}
      >
        <AddEventPopover
          containerRef={containerRef}
          close={handleClose}
          time={selectedDate}
        />
      </PopoverComponentWrapper>

      <div className="border-r border-slate-200 flex-grow flex-shrink-0 relative h-full">
        {calendarHours.map((hour, cellIndex) => {
          const buttonLabels = [...Array(4)].map((_, index) => {
            const isPMTime = hour > 12

            const hourString = isPMTime
              ? (hour - 12).toString()
              : hour.toString()
            const minuteString = (index * 15).toString().padStart(2, '0')

            return `Create an event on ${dayString} at ${hourString}:${minuteString} ${isPMTime ? 'pm' : 'am'}.`
          })

          return (
            <div
              className="border-slate-200 border-b flex flex-col"
              style={{ height: `${64 * gridSizeMultiplier}px` }}
              key={cellIndex}
            >
              {buttonLabels.map((label, buttonIndex) => {
                return (
                  <CalendarCellButton
                    key={buttonIndex}
                    label={label}
                    isActive={
                      showPopover &&
                      currentSelectedButton === `${cellIndex}-${buttonIndex}`
                    }
                    isDisabled={!disableClick}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setCurrentSelectedButton(`${cellIndex}-${buttonIndex}`)

                      const selectedDate = new Date(day)
                      selectedDate.setHours(hour)
                      selectedDate.setMinutes(buttonIndex * 15)

                      setSelectedDate(selectedDate)

                      openPopover(e.currentTarget)
                    }}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
})
