import { defaultProject, defaultProjectColor } from '@/types/projects'
import { SelectProjectPopover } from './select-project-popover'
import { useProjectsContext } from '@/contexts/projectsContext'
import { PopoverComponentWrapper } from '@/features/calendar/components/PopoverComponentWrapper'
import { usePopover } from '@/features/calendar/hooks/usePopover'

interface Props {
  projectId: number | null
  containerRef: HTMLDivElement | null
  setProjectId: (projectId: number | null) => void
}

export const ProjectSelector = (props: Props) => {
  const { projectId, setProjectId, containerRef } = props

  const { getProjectById } = useProjectsContext()

  const project = getProjectById(projectId)

  const {
    handleOpen,
    setReferenceElement,
    setPopperElement,
    showPopover,
    popperStyles,
    popperAttributes,
  } = usePopover(containerRef)

  const projectColor = project?.projectColor ?? defaultProjectColor

  return (
    <>
      <PopoverComponentWrapper
        showPopover={showPopover}
        setRef={setPopperElement}
        popperStyles={popperStyles}
        popperAttributes={popperAttributes}
      >
        <SelectProjectPopover
          currentProject={project ?? defaultProject}
          selectProjectId={(x) => {
            setProjectId(x)

            setTimeout(close)
          }}
        />
      </PopoverComponentWrapper>

      <button
        type="button"
        onClick={handleOpen}
        ref={setReferenceElement}
        className="flex flex-row justify-start items-center py-2 px-4 rounded-md shadow-sm bg-purple-950"
        aria-haspopup={true}
        aria-expanded={showPopover}
        aria-controls="projectList"
        aria-label={`Select a project - Currently selected: ${project?.description ?? 'no project'}`}
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
    </>
  )
}
