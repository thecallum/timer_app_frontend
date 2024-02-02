import { ErrorMessage, TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { ModalControls, ModalLayout } from '@/modals/components'
import { ProjectApiRequestObject } from '@/requests/types'
import { ProjectColor, defaultProjectColor } from '@/types/projects'
import { useState } from 'react'

interface Props {
  modalColor: ProjectColor
  onSubmit: (request: ProjectApiRequestObject) => Promise<void>
  close: () => void
}

export const CreateModalForm = (props: Props) => {
  const { modalColor, onSubmit, close } = props

  const [description, setDescription] = useState('')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validate()
    setErrors(errors)

    if (Object.keys(errors).length >= 1) {
      return
    }

    const request: ProjectApiRequestObject = {
      description: description,
      projectColor: modalColor,
    }

    await onSubmit(request)
  }

  const projectColor = modalColor ?? defaultProjectColor

  return (
    <form onSubmit={handleSubmit}>
      <ModalLayout title="Create project">
        <>
          <div className="flex justify-start items-center mt-4 mb-2">
            <div
              className="w-6 h-6 rounded-full mr-4 flex-shrink-0"
              style={{
                background: projectColor.dark,
              }}
            />

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
          </div>
          {errors?.description && (
            <ErrorMessage message={errors?.description} />
          )}
        </>
      </ModalLayout>

      <ModalControls>
        <>
          <ButtonPrimary type="submit">Create project</ButtonPrimary>
          <ButtonSecondary onClick={close}>Close</ButtonSecondary>
        </>
      </ModalControls>
    </form>
  )
}
