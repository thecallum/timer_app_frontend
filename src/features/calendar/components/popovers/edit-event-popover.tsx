import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from '@/components/popover'
import { ProjectSelector } from '../../../../components/projectSelector'
import { useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { ErrorMessage } from '@/components/form/error-message'
import { TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { formatDuration } from '@/helpers/formatter'
import { useProjectsContext } from '@/contexts/projectsContext'
import { CalendarEvent } from '@/types/calendarEvents'
import { Project } from '@/types/projects'

interface Props {
  close: () => void
  event: CalendarEvent
  containerRef: HTMLDivElement | null
}

export const EditEventPopover = (props: Props) => {
  const { close, event, containerRef } = props
  const {
    description: currentDescription,
    projectId,
    startTime: start,
    endTime: end,
  } = event

  const { projects } = useProjectsContext()

  const { updateEvent, deleteEvent } = useCalendarEventsContext()
  const [description, setDescription] = useState(currentDescription)
  const [project, setProject] = useState<Project | null>(
    projectId === null ? null : projects[projectId],
  )

  const [startDate, setStartDate] = useState<string>(
    start.format('YYYY-MM-DDTHH:mm:ss'),
  )
  const [endTime, setEndTime] = useState<string>(end.format('HH:mm:ss'))
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const getEndTimeAsDate = () => {
    const [hour, minute, second] = endTime.split(':').map(Number)
    return dayjs(startDate).hour(hour).minute(minute).second(second)
  }

  const timeDifferenceInSeconds = getEndTimeAsDate().diff(
    dayjs(startDate),
    'second',
  )

  const onDeleteEvent = () => {
    deleteEvent(event)
    close()
  }

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (!getEndTimeAsDate().isAfter(dayjs(startDate))) {
      errors['end'] = 'End time must be after start'
    }

    if (description === null || description.trim() === '') {
      errors['description'] = 'Description cannot be empty'
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validate()
    setErrors(errors)

    if (Object.keys(errors).length >= 1) {
      return
    }

    event.startTime = dayjs(startDate)
    event.endTime = getEndTimeAsDate()
    event.description = description
    event.projectId = project?.id ?? null

    await updateEvent(event)
    close()
  }

  return (
    <PopoverContainer>
      <form onSubmit={handleSubmit}>
        <PopoverLayout title="Edit Event" onDelete={onDeleteEvent}>
          <>
            <div className="mb-2">
              <TextInput
                autoFocus
                value={description}
                setValue={setDescription}
                id="description"
                name="description"
                ariaLabel="Event description"
                placeholder="(no description)"
                error={errors?.description}
              />
            </div>

            {errors?.description && (
              <ErrorMessage message={errors?.description} />
            )}

            <div className="inline-block">
              <ProjectSelector
                containerRef={containerRef}
                project={project}
                setProject={setProject}
              />
            </div>

            <div className="flex mb-2">
              <div className="mr-4">
                <label
                  htmlFor="eventStartTime"
                  className="text-slate-500 text-xs"
                >
                  Start
                </label>
                <input
                  type="datetime-local"
                  name=""
                  id="eventStartTime"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStartDate(e.target.value)
                  }
                  value={startDate}
                  className="block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="eventEndTime"
                  className="text-slate-500 text-xs"
                >
                  End
                </label>
                <input
                  step={1}
                  type="time"
                  name="eventEndTime"
                  value={endTime}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEndTime(e.target.value)
                  }
                  className={classNames(
                    'block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm',
                    {
                      'border-red-600': errors?.end,
                    },
                  )}
                />
              </div>
            </div>
            {errors?.end && <ErrorMessage message={errors?.end} />}

            <div>
              <label htmlFor="" className="text-slate-500 text-xs mb-1">
                Duration
              </label>

              <div>
                <div className="inline-block bg-slate-100 p-2 text-xs text-slate-800 rounded">
                  {formatDuration(timeDifferenceInSeconds)}
                </div>
              </div>
            </div>
          </>
        </PopoverLayout>

        <PopoverControls>
          <>
            <ButtonPrimary type="submit">Save</ButtonPrimary>
            <ButtonSecondary onClick={close}>Close</ButtonSecondary>
          </>
        </PopoverControls>
      </form>
    </PopoverContainer>
  )
}
