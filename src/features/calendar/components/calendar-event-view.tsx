import {
  IProject,
  defaultProject,
  defaultProjectColor,
} from '@/contexts/projectsContext/types'
import { formatDuration } from '@/helpers/formatter'

interface Props {
  description: string
  project: IProject | null
  durationInSeconds: number
}

export const CalendarEventView = (props: Props) => {
  const { description, project, durationInSeconds } = props

  const projectColor = project?.projectColor ?? defaultProjectColor

  return (
    <div className="w-full h-full p-2 flex flex-col justify-between overflow-hidden">
      <span className="text-start">
        <div
          className="font-semibold text-s"
          style={{
            color: projectColor.darkest,
          }}
        >
          {description || '(no description)'}
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            color: projectColor.dark,
          }}
        >
          {project?.description ?? defaultProject.description}
        </div>
      </span>
      <div
        className="text-s whitespace-nowrap text-left"
        style={{
          color: projectColor.darkest,
        }}
      >
        {formatDuration(durationInSeconds)}
      </div>
    </div>
  )
}
