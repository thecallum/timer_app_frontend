import classNames from 'classnames'
import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from '@/components/popover'
import { useProjectsContext } from '@/contexts/projectsContext/hooks/useProjectsContext'
import {
  Project,
  defaultProject,
  defaultProjectColor,
} from '@/contexts/projectsContext/types'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'

interface Props {
  currentProject: Project
  selectProject: (project: Project) => void
}

export const SelectProjectPopover = (props: Props) => {
  const { selectProject, currentProject } = props

  const { projects } = useProjectsContext()
  const { openModal } = useCreateProjectModalContext()

  return (
    <PopoverContainer width="w-48">
      <>
        <PopoverLayout title="Project">
          <ul className="">
            {[
              defaultProject,
              ...Object.keys(projects).map((x) => projects[x]),
            ].map((x) => {
              const { description: name, id } = x

              const projectColor = x?.projectColor ?? defaultProjectColor

              return (
                <li key={id}>
                  <button
                    type="button"
                    className={classNames(
                      'flex flex-row justify-start items-center p-2 my-1 rounded-md w-full hover:bg-slate-100',
                      {
                        'bg-slate-200': id === currentProject?.id,
                      },
                    )}
                    onClick={() => selectProject(x)}
                  >
                    <div
                      className="w-2 h-2 rounded-full block "
                      style={{ background: projectColor.dark }}
                    ></div>
                    <div
                      className="ml-2 text-sm leading-tight"
                      style={{ color: projectColor.dark }}
                    >
                      {name}
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
