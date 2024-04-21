import { ErrorMessage } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { TextInputWithLabel } from '@/components/form/text-input-with-label'
import { useProjectsContext } from '@/contexts/projectsContext'
import { ModalContainer, ModalControls, ModalLayout } from '@/modals/components'
import { ProjectColors } from '@/types/colors'
import { defaultProjectColor, Project, ProjectColor } from '@/types/projects'
import { useState } from 'react'
import { CirclePicker } from 'react-color'

interface Props {
  isOpen: boolean
  project: Project | null
  close: () => void
}

export const EditProjectModal = (props: Props) => {
  const { isOpen, project, close } = props

  const { updateProject, deleteProject } = useProjectsContext()

  const [description, setDescription] = useState(project?.description ?? '')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)

  const [selectedColor, setSelectedColor] = useState<ProjectColor>(
    () => project?.projectColor ?? defaultProjectColor,
  )

  const onEditProject = async (project: Project) => {
    setIsLoading(true)
    setRequestError(null)

    updateProject(project)
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

  const onDeleteProject = async () => {
    setIsLoading(true)
    setRequestError(null)

    deleteProject(project as Project)
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

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (description === null || description.trim() === '') {
      errors['description'] = 'Description cannot be empty'
    } else if (description.length > 30) {
      errors['description'] = 'Description cannot exceed 30 characters'
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validate()
    setErrors(errors)

    if (Object.keys(errors).length >= 1) {
      return
    }

    onEditProject({
      ...(project as Project),
      description,
      projectColor: selectedColor,
    })
  }

  const handleSelectColor = (color: string) => {
    // find color in project colors
    const selectedColor = Object.entries(ProjectColors).filter(
      ([, value]) => value.dark === color,
    )[0][1]

    setSelectedColor(selectedColor)
  }

  return (
    <ModalContainer isOpen={isOpen} close={close} contentLabel="Edit project">
      <form onSubmit={handleSubmit}>
        {!!project && (
          <>
            <ModalLayout
              title="Edit Project"
              onDelete={onDeleteProject}
              deleteLabel="Delete project"
            >
              <>
                <TextInputWithLabel
                  label="Project name"
                  autoFocus
                  value={description}
                  setValue={setDescription}
                  id="description"
                  name="description"
                  ariaLabel="Project description"
                  placeholder="Planning"
                  error={errors?.description}
                />

                <div>
                  <div className="text-slate-500 text-xs mb-2">
                    Project color
                  </div>

                  <CirclePicker
                    circleSpacing={10}
                    circleSize={20}
                    width="100%"
                    colors={Object.entries(ProjectColors).map(
                      ([, value]) => value.dark,
                    )}
                    onChangeComplete={(a) => handleSelectColor(a.hex)}
                    color={selectedColor.dark}
                  />
                </div>

                {errors?.description && (
                  <ErrorMessage message={errors?.description} />
                )}

                {requestError !== null && (
                  <ErrorMessage message={requestError} />
                )}
              </>
            </ModalLayout>

            <ModalControls>
              <>
                <ButtonPrimary
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Edit project
                </ButtonPrimary>
                <ButtonSecondary onClick={close} disabled={isLoading}>
                  Close
                </ButtonSecondary>
              </>
            </ModalControls>
          </>
        )}
      </form>
    </ModalContainer>
  )
}
