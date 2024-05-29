import {
  CalendarEventDisplayPosition as DisplayType,
  CalendarEvent as CalendarEventType,
} from '@/types/calendarEvents'
import { PopoverComponentWrapper } from './PopoverComponentWrapper'
import { EditEventPopover } from './popovers/edit-event-popover'
import { CalendarEventView } from './calendar-event-view'
import { useProjectsContext } from '@/contexts/projectsContext'
import { usePopover } from '../hooks/usePopover'
import { defaultProjectColor } from '@/types/projects'
import dateFormat from 'dateformat'

interface Props {
  event: CalendarEventType
  eventDisplayPosition: DisplayType
  containerRef: HTMLDivElement | null
  gridSizeMultiplier: number
  columnCount: number
}

export const CalendarEvent = (props: Props) => {
  const {
    event,
    eventDisplayPosition,
    containerRef,
    gridSizeMultiplier,
    columnCount,
  } = props

  const {
    handleOpen,
    handleClose,
    setReferenceElement,
    setPopperElement,
    showPopover,
    popperStyles,
    popperAttributes,
  } = usePopover(containerRef)

  const { description, projectId, durationInSeconds, startTime } = event

  const { getProjectById } = useProjectsContext()

  const project = getProjectById(projectId)
  const projectColor = project?.projectColor ?? defaultProjectColor

  const { height, top, left, width, column } = eventDisplayPosition

  const eventStyles = {
    height: `${(height / 2) * gridSizeMultiplier}px`,
    top: `${(top / 2) * gridSizeMultiplier}px`,
    left: `calc((100% / ${columnCount} * ${column}) + (100% / ${columnCount} * ${left}))`,
    width: `calc((100%/${columnCount})*${width})`,
  }

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
        aria-label={`Calendar event: ${description} on ${dateFormat(startTime, 'mmmm dd')} at ${dateFormat(startTime, 'h:MM TT')}, ${project?.description ? `assigned to project ${project?.description}` : `not assigned to any project`}.`}
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
