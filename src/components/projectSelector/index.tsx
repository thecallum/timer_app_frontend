import { PopoverWrapper } from '../../features/calendar/components/popover-wrapper'
import { SelectProjectPopover } from './select-project-popover'
import {
  IProject,
  defaultProject,
  defaultProjectColor,
} from '@/contexts/projectsContext/types'

interface Props {
  project: IProject | null
  containerRef: HTMLDivElement | null
  setProject: (project: IProject | null) => void
}

export const ProjectSelector = (props: Props) => {
  const { project, setProject, containerRef } = props

  return (
    <PopoverWrapper
      containerRef={containerRef}
      popoverComponent={({ close }) => (
        <SelectProjectPopover
          currentProject={project ?? defaultProject}
          selectProject={(x) => {
            setProject(x)

            setTimeout(close)
          }}
        />
      )}
    >
      {({ ref, onClick }) => {
        const projectColor = project?.projectColor ?? defaultProjectColor

        return (
          <button
            type="button"
            onClick={onClick}
            ref={ref}
            className="flex flex-row justify-start items-center  p-1 px-2 rounded-md shadow-sm"
            style={{
              background: projectColor.light,
            }}
          >
            <div
              className="w-2 h-2 rounded-full block "
              style={{
                background: projectColor.dark,
              }}
            ></div>
            <div
              className="ml-2 text-xs leading-tight"
              style={{
                color: projectColor.dark,
              }}
            >
              {project?.description ?? defaultProject.description}
            </div>
          </button>
        )
      }}
    </PopoverWrapper>
  )
}
