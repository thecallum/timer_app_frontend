import { useProjectsContext } from '@/contexts/projectsContext'
import { CalendarEventView } from './calendar-event-view'
import { PopoverWrapper } from './popover-wrapper'
import { EditEventPopover } from './popovers/edit-event-popover'
import { CalendarEvent as CalendarEventType } from '@/types/calendarEvents'
import { defaultProjectColor } from '@/types/projects'

interface Props {
  event: CalendarEventType
  containerRef: HTMLDivElement | null
}

export const CalendarEvent = (props: Props) => {
  const { event, containerRef } = props
  const { getProjectById } = useProjectsContext()

  const {
    description,
    projectId,
    dayOfWeek,
    durationInSeconds,
    height,
    top,
    left,
    width,
  } = event

  const eventStyles = {
    height: `${height}px`,
    top: `${top}px`,
    left: `calc((100% / 7 * ${dayOfWeek - 1}) + (100% / 7 * ${left}))`,
    width: `calc((100%/7)*${width})`,
  }

  return (
    <li className="relative">
      <PopoverWrapper
        containerRef={containerRef}
        popoverComponent={({ close }) => (
          <EditEventPopover
            containerRef={containerRef}
            event={event}
            close={close}
          />
        )}
      >
        {({ ref, onClick }) => {
          const project = getProjectById(projectId)
          const projectColor = project?.projectColor ?? defaultProjectColor

          return (
            <div
              style={eventStyles}
              className="absolute p-[1px] overflow-hidden"
            >
              <button
                className={`w-full h-full cursor-pointer rounded-sm`}
                // @ts-expect-error work around for react-popper library issue
                ref={ref}
                onClick={onClick}
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
          )
        }}
      </PopoverWrapper>
    </li>
  )
}
