import { ErrorMessage, TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { useProjectsContext } from '@/contexts/projectsContext'
import { ModalContainer, ModalControls, ModalLayout } from '@/modals/components'
import { Project } from '@/types/projects'
import { useState } from 'react'

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

  const onEditProject = async (project: Project) => {
    setIsLoading(true)
    setRequestError(null)

    updateProject(project)
      .then((status) => {
        if (!status.success) {
          setRequestError(status.errorMessage)
          return
        }
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
    })
  }

  return (
    <ModalContainer isOpen={isOpen} close={close} contentLabel="Edit project">
      <form onSubmit={handleSubmit}>
        {!!project && (
          <>
            <ModalLayout title="Edit Project" onDelete={onDeleteProject}>
              <>
                <TextInput
                  autoFocus
                  value={description}
                  setValue={setDescription}
                  id="description"
                  name="description"
                  ariaLabel="Project description"
                  placeholder="Planning"
                  error={errors?.description}
                />
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
