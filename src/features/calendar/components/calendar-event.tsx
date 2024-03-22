import { useProjectsContext } from '@/contexts/projectsContext'
import { CalendarEventView } from './calendar-event-view'
import { EditEventPopover } from './popovers/edit-event-popover'
import { CalendarEvent as CalendarEventType } from '@/types/calendarEvents'
import { defaultProjectColor } from '@/types/projects'
import dateFormat from 'dateformat'
import { usePopover } from '../hooks/usePopover'
import { PopoverComponentWrapper } from './PopoverComponentWrapper'

interface Props {
  event: CalendarEventType
  containerRef: HTMLDivElement | null
}

export const CalendarEvent = (props: Props) => {
  const { event, containerRef } = props
  const { getProjectById } = useProjectsContext()

  const {
    handleOpen,
    handleClose,
    setReferenceElement,
    setPopperElement,
    showPopover,
    popperStyles,
    popperAttributes,
  } = usePopover(containerRef)

  const {
    description,
    projectId,
    dayOfWeek,
    durationInSeconds,
    height,
    top,
    left,
    width,
    startTime,
  } = event

  const eventStyles = {
    height: `${height}px`,
    top: `${top}px`,
    left: `calc((100% / 7 * ${dayOfWeek - 1}) + (100% / 7 * ${left}))`,
    width: `calc((100%/7)*${width})`,
  }

  const project = getProjectById(projectId)
  const projectColor = project?.projectColor ?? defaultProjectColor

  return (
    <li className="relative">
      <PopoverComponentWrapper
        showPopover={showPopover}
        setRef={setPopperElement}
        popperStyles={popperStyles}
        popperAttributes={popperAttributes}
      >
        <EditEventPopover
          containerRef={containerRef}
          event={event}
          close={handleClose}
        />
      </PopoverComponentWrapper>

      <div
        style={eventStyles}
        className="absolute p-[1px] overflow-hidden"
        role="article"
        aria-label={`Calendar event: ${description} on ${dateFormat(startTime, 'MMMM D')} at ${dateFormat(startTime, 'h:mm A')}, ${project?.description ? `assigned to project ${project?.description}` : `not assigned to any project`}.`}
      >
        <button
          className={`w-full h-full cursor-pointer rounded-sm`}
          ref={setReferenceElement}
          onClick={handleOpen}
          style={{
            background: projectColor.light,
          }}
        >
          <CalendarEventView
            description={description}
            durationInSeconds={durationInSeconds}
            project={project}
          />
        </button>
      </div>
    </li>
  )
}
