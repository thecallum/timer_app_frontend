import { ModalContainer } from '@/modals/components'
import { useEffect, useState } from 'react'
import { CreateModalForm } from './create-modal-form'
import { Color, Project, ProjectColor, ProjectColors } from '@/types/projects'
import { ProjectApiRequestObject } from '@/contexts/projectsContext/types'

interface Props {
  isOpen: boolean
  close: () => void
  onCreate: (request: ProjectApiRequestObject) => Promise<void>
  projects: Project[]
}

export const CreateProjectModal = (props: Props) => {
  const { isOpen, close, onCreate } = props

  const getRandomProjectColor = (): ProjectColor => {
    const enumValues: Color[] = Object.values(Color).filter(
      (value) => typeof value === 'number',
    ) as Color[]

    const randomIndex = Math.floor(Math.random() * enumValues.length) // Generate a random index

    const randomEnumKey = enumValues[randomIndex] // Get the enum key

    return ProjectColors[randomEnumKey]
  }

  const [modalColor, setModalColor] = useState(getRandomProjectColor())

  useEffect(() => {
    setModalColor(getRandomProjectColor())
  }, [isOpen])

  const onSubmit = async (request: ProjectApiRequestObject) => {
    await onCreate(request)
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      close={close}
      contentLabel="Create a project"
    >
      <CreateModalForm
        modalColor={modalColor}
        onSubmit={onSubmit}
        close={close}
      />
    </ModalContainer>
  )
}
