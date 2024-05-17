import { useTimerContext } from '@/features/timer/context/hooks/useTimerContext'
import { CalendarEventView } from '@/features/calendar/components/calendar-event-view'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { defaultProjectColor } from '@/types/projects'
import { useProjectsContext } from '@/contexts/projectsContext'
import { HEIGHT_ONE_MINUTE } from '@/constants/calendar-constants'
import { getDayOfWeek, getMinuteValue } from '@/helpers/timeHelpers'

interface Props {
  gridSizeMultiplier: number
}

export const CurrentEventHover = (props: Props) => {
  const { gridSizeMultiplier } = props

  const { calendarViewOffset, daysOfWeek } = useCalendarEventsContext()
  const { time, isRunning, startedAt, description, projectId } =
    useTimerContext()

  const { getProjectById } = useProjectsContext()

  const project = getProjectById(projectId)

  const startedAtInMinutes = getMinuteValue(startedAt ?? new Date())

  const timeInMinutes = time / 60

  const dayOfWeek = getDayOfWeek(startedAt ?? new Date())

  const projectColor = project?.projectColor ?? defaultProjectColor

  if (!isRunning) return null

  // only show if on current page
  if (calendarViewOffset !== 0) return null

  return (
    <div
      className={`absolute w-[calc(100%/${daysOfWeek.length})] p-[2px]`}
      style={{
        left: `calc(100%/${daysOfWeek.length} * ${(daysOfWeek.length === 1 ? 1 : dayOfWeek) - 1} )`,
        top: `${((startedAtInMinutes * HEIGHT_ONE_MINUTE) / 2) * gridSizeMultiplier}px`,
        height: `${((Math.max(timeInMinutes, 15) * HEIGHT_ONE_MINUTE) / 2) * gridSizeMultiplier}px`,
      }}
      role="status"
      aria-live="polite"
      aria-label={`Recording in progress for event ${description ?? 'with no description'}, ${project?.description ? `assigned to project ${project?.description}` : `not assigned to any project`}.`}
    >
      <div
        className="w-full h-full rounded-sm border border-dashed shadow-lg"
        style={{
          background: `repeating-linear-gradient(-45deg, transparent 0px, transparent 0.5em, rgba(201, 128, 107, 0.08) 0.5em, rgba(201, 128, 107, 0.08) 0.6em) ${projectColor.lightest}`,
          borderColor: projectColor.dark,
        }}
      >
        <CalendarEventView
          description={description}
          durationInSeconds={time}
          project={project}
        />
      </div>
    </div>
  )
}
