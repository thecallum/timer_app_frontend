import { useTimerContext } from '@/features/timer/context/hooks/useTimerContext'
import { CalendarEventView } from '@/features/calendar/components/calendar-event-view'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { defaultProjectColor } from '@/types/projects'
import { useProjectsContext } from '@/contexts/projectsContext'
import { HEIGHT_ONE_MINUTE } from '@/constants/calendar-constants'
import { getDayOfWeek, getMinuteValue } from '@/helpers/timeHelpers'

export const CurrentEventHover = () => {
  const { showingCurrentWeek } = useCalendarEventsContext()
  const { time, isRunning, startedAt, description, projectId } =
    useTimerContext()

  const { getProjectById } = useProjectsContext()

  const project = getProjectById(projectId)

  const startedAtInMinutes = getMinuteValue(startedAt ?? new Date())

  const timeInMinutes = time / 60

  const dayOfWeek = getDayOfWeek(startedAt ?? new Date())

  const projectColor = project?.projectColor ?? defaultProjectColor

  if (!isRunning || !showingCurrentWeek) return null

  return (
    <div
      className={`absolute w-[calc(100%/7)] p-[2px]`}
      style={{
        left: `calc(100%/7 * ${dayOfWeek - 1} )`,
        top: `${startedAtInMinutes * HEIGHT_ONE_MINUTE}px`,
        height: `${Math.max(timeInMinutes, 15) * HEIGHT_ONE_MINUTE}px`,
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
