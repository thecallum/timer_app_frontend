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
            className="flex flex-row justify-start items-center py-2 px-4 rounded-md shadow-sm bg-purple-950"
          >
            <div
              className="w-3 h-3 rounded-full block"
              style={{
                background: projectColor.dark,
              }}
            ></div>
            <div
              className="ml-1 text-sm leading-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-24 md:max-w-64 lg:max-w-80"
              style={{
                color: projectColor.light,
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
