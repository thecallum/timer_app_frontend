import { useProjectsContext } from '@/contexts/projectsContext'
import { CalendarEvent as CalendarEventType } from '../types/types'
import { CalendarEventView } from './calendar-event-view'
import { PopoverWrapper } from './popover-wrapper'
import { EditEventPopover } from './popovers/edit-event-popover'
import { getProjectColor } from '@/helpers/getProjectColor'

interface Props {
  event: CalendarEventType
  containerRef: HTMLDivElement | null
}

const HEIGHT_ONE_MINUTE = (64 / 60) * 2

export const CalendarEvent = (props: Props) => {
  const { event, containerRef } = props
  const { projects } = useProjectsContext()

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

  const eventStyles = {
    height: `${durationInMinutes * HEIGHT_ONE_MINUTE}px`,
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
          const projectColor = getProjectColor(projectId, projects)

          return (
            <div style={eventStyles} className="absolute p-[1px]">
              <button
                className={`w-full h-full cursor-pointer rounded-sm`}
                ref={ref}
                onClick={onClick}
                style={{
                  background: projectColor.light,
                }}
              >
                <CalendarEventView
                  description={description}
                  durationInSeconds={durationInSeconds}
                  project={projectId === null ? null : projects[projectId]}
                />
              </button>
            </div>
          )
        }}
      </PopoverWrapper>
    </li>
  )
}
