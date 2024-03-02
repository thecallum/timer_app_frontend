import dayjs from 'dayjs'
import { ProjectSelector } from '../../../../components/projectSelector'
import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from '@/components/popover'
import { useState } from 'react'
import { ErrorMessage } from '@/components/form/error-message'
import classNames from 'classnames'
import { TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { useCalendarEventsContext } from '@/contexts/calendarEventContext'
import { formatDuration } from '@/helpers/formatter'
import { CalendarEventApiRequestObject } from '@/requests/types'

interface Props {
  close: () => void
  time: dayjs.Dayjs
  containerRef: HTMLDivElement | null
}

export const AddEventPopover = (props: Props) => {
  const { close, time, containerRef } = props
  const { addEvent } = useCalendarEventsContext()
  const [projectId, setProjectId] = useState<number | null>(null)
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)

  const [startDate, setStartDate] = useState<string>(
    time.format('YYYY-MM-DDTHH:mm:ss'),
  )
  const [endTime, setEndTime] = useState<string>(
    time.add(15, 'minute').format('HH:mm:ss'),
  )

  const getEndTimeAsDate = () => {
    const [hour, minute, second] = endTime.split(':').map(Number)
    return dayjs(startDate).hour(hour).minute(minute).second(second)
  }

  const timeDifferenceInSeconds = getEndTimeAsDate().diff(
    dayjs(startDate),
    'second',
  )

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (!getEndTimeAsDate().isAfter(dayjs(startDate))) {
      errors['end'] = 'End time must be after start'
    }

    if (description.length > 60) {
      errors['description'] = 'Description must be less than 60 characters'
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

    const request: CalendarEventApiRequestObject = {
      description,
      startTime: dayjs(startDate),
      endTime: getEndTimeAsDate(),
      projectId: projectId,
    }

    setIsLoading(true)
    setRequestError(null)

    addEvent(request)
      .then((status) => {
        if (!status.success) {
          setRequestError(status.errorMessage)
          return
        }

        close()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <PopoverContainer id="addEventPopover">
      <form onSubmit={handleSubmit}>
        <PopoverLayout title="Add Event">
          <>
            <div className="mb-2">
              <TextInput
                autoFocus
                value={description}
                setValue={setDescription}
                id="description"
                name="description"
                ariaLabel="Event description"
                error={errors?.description}
              />
            </div>

            {errors?.description && (
              <ErrorMessage message={errors?.description} />
            )}

            <div className="inline-block">
              <ProjectSelector
                containerRef={containerRef}
                setProjectId={setProjectId}
                projectId={projectId}
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
                  name="eventStartTime"
                  aria-label="Event start time"
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
                  type="time"
                  step={1}
                  name="eventEndTime"
                  id="eventEndTime"
                  aria-label="Event end time"
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

            {requestError !== null && <ErrorMessage message={requestError} />}
          </>
        </PopoverLayout>

        <PopoverControls>
          <>
            <ButtonPrimary
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Save
            </ButtonPrimary>
            <ButtonSecondary onClick={close} disabled={isLoading}>
              Close
            </ButtonSecondary>
          </>
        </PopoverControls>
      </form>
    </PopoverContainer>
  )
}
