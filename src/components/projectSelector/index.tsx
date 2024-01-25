import { defaultProject, defaultProjectColor } from '@/types/projects'
import { PopoverWrapper } from '../../features/calendar/components/popover-wrapper'
import { SelectProjectPopover } from './select-project-popover'
import { useProjectsContext } from '@/contexts/projectsContext'

interface Props {
  projectId: number | null
  containerRef: HTMLDivElement | null
  setProjectId: (projectId: number | null) => void
}

export const ProjectSelector = (props: Props) => {
  const { projectId, setProjectId, containerRef } = props

  const { getProjectById } = useProjectsContext()

  const project = getProjectById(projectId)

  return (
    <PopoverWrapper
      containerRef={containerRef}
      popoverComponent={({ close }) => (
        <SelectProjectPopover
          currentProject={project ?? defaultProject}
          selectProjectId={(x) => {
            setProjectId(x)

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
            // @ts-expect-error work around for react-popper library issue
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
