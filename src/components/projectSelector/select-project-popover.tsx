import classNames from 'classnames'
import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from '@/components/popover'
import { useProjectsContext } from '@/contexts/projectsContext/hooks/useProjectsContext'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'
import { Project, defaultProject, defaultProjectColor } from '@/types/projects'

interface Props {
  currentProject: Project
  selectProjectId: (projectId: number | null) => void
}

export const SelectProjectPopover = (props: Props) => {
  const { selectProjectId, currentProject } = props

  const { projects } = useProjectsContext()
  const { openModal } = useCreateProjectModalContext()

  return (
    <PopoverContainer width="w-64" id={'projectList'}>
      <>
        <PopoverLayout title="Project">
          <ul className="">
            {[defaultProject, ...projects].map((x) => {
              const { description, id } = x

              const projectColor = x?.projectColor ?? defaultProjectColor

              return (
                <li key={id}>
                  <button
                    aria-current={id === currentProject?.id}
                    aria-label={`Select project: ${description}`}
                    type="button"
                    className={classNames(
                      'flex flex-row justify-start items-center p-2 my-1 rounded-md w-full hover:bg-slate-100',
                      {
                        'bg-slate-200': id === currentProject?.id,
                      },
                    )}
                    onClick={() => selectProjectId(id)}
                  >
                    <div
                      className="w-2 h-2 rounded-full block "
                      style={{ background: projectColor.dark }}
                    ></div>
                    <div
                      className="ml-2 text-sm leading-tight w-full overflow-hidden text-ellipsis text-left"
                      style={{ color: projectColor.dark }}
                    >
                      {description}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </PopoverLayout>

        <PopoverControls>
          <div className="flex items-center justify-center">
            <button
              aria-label="Create a new project"
              type="button"
              onClick={openModal}
              className="text-slate-600  underline underline-offset-1 text-sm"
            >
              Create a new project
            </button>
          </div>
        </PopoverControls>
      </>
    </PopoverContainer>
  )
}
