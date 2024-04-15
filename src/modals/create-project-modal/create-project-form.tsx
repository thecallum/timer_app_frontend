import { ErrorMessage, TextInput } from '@/components/form'
import { ButtonPrimary, ButtonSecondary } from '@/components/form/buttons'
import { TextInputWithLabel } from '@/components/form/text-input-with-label'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'
import { ModalControls, ModalLayout } from '@/modals/components'
import { ProjectApiRequestObject } from '@/requests/types'
import { ProjectColors } from '@/types/colors'
import { ProjectColor, defaultProjectColor } from '@/types/projects'
import { useState } from 'react'
import { SketchPicker, CirclePicker, CirclePickerProps } from 'react-color'

interface Props {
  modalColor: ProjectColor
  close: () => void
}

export const CreateProjectForm = (props: Props) => {
  const { modalColor, close } = props

  const { onCreateProject, isLoading, requestError } =
    useCreateProjectModalContext()

  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [selectedColor, setSelectedColor] = useState<ProjectColor>(
    () => modalColor ?? defaultProjectColor,
  )

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (description === null || description.trim() === '') {
      errors['description'] = 'Description cannot be empty'
    } else if (description.length > 30) {
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
      projectColor: selectedColor,
    }

    await onCreateProject(request)
  }

  // const projectColor =

  const handleSelectColor = (color: string) => {
    // find color in project colors
    const selectedColor = Object.entries(ProjectColors).filter(
      ([, value]) => value.dark === color,
    )[0][1]

    setSelectedColor(selectedColor)
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <ModalLayout title="Create project">
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

          {errors?.description && (
            <ErrorMessage message={errors?.description} />
          )}

          <div>
            <div className="text-slate-500 text-xs mb-2">Project color</div>

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

          {requestError !== null && <ErrorMessage message={requestError} />}
        </>
      </ModalLayout>

      <ModalControls>
        <>
          <ButtonPrimary
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Create project
          </ButtonPrimary>
          <ButtonSecondary onClick={close} disabled={isLoading}>
            Close
          </ButtonSecondary>
        </>
      </ModalControls>
    </form>
  )
}
