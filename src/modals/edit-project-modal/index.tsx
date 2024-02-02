import { ErrorMessage, TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { ModalContainer, ModalControls, ModalLayout } from '@/modals/components'
import { Project } from '@/types/projects'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  project: Project | null
  onSubmit: (project: Project) => void
  close: () => void
  deleteProject: (project: Project) => void
}

export const EditProjectModal = (props: Props) => {
  const { isOpen, project, onSubmit, close, deleteProject } = props

  const [description, setDescription] = useState(project?.description ?? '')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (description === null || description.trim() === '') {
      errors['description'] = 'Description cannot be empty'
    }

    if (description.length > 30) {
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

    onSubmit({
      ...(project as Project),
      description,
    })
  }

  return (
    <ModalContainer isOpen={isOpen} close={close} contentLabel="Edit project">
      <form onSubmit={handleSubmit}>
        {!!project && (
          <>
            <ModalLayout
              title="Edit Project"
              onDelete={() => deleteProject(project)}
            >
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
              </>
            </ModalLayout>

            <ModalControls>
              <>
                <ButtonPrimary type="submit">Edit project</ButtonPrimary>
                <ButtonSecondary onClick={close}>Close</ButtonSecondary>
              </>
            </ModalControls>
          </>
        )}
      </form>
    </ModalContainer>
  )
}
