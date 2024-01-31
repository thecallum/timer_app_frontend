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

const HEIGHT_ONE_MINUTE = (64 / 60) * 2

export const CalendarEvent = (props: Props) => {
  const { event, containerRef } = props
  const { projects, getProjectById } = useProjectsContext()

  const {
    description,
    projectId,
    dayOfWeek,
    durationInSeconds,
    durationInMinutes,
    startTimeInMinutes,
    left,
    width,
  } = event

  const MIN_HEIGHT = HEIGHT_ONE_MINUTE * 15

  // temp fix
  const computedHeight = Math.max(
    MIN_HEIGHT,
    durationInMinutes * HEIGHT_ONE_MINUTE,
  )

  const eventStyles = {
    height: `${computedHeight}px`,
    top: `${startTimeInMinutes * HEIGHT_ONE_MINUTE}px`,
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

            console.log({ projectId, project: getProjectById(projectId)})

          return (
            <div style={eventStyles} className="absolute p-[1px]">
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
