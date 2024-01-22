import { ModalContainer } from '@/modals/components'
import { useEffect, useState } from 'react'
import { CreateModalForm } from './create-modal-form'
import {
  IProject,
  Color,
  IProjectColor,
  ProjectColors,
} from '@/contexts/projectsContext/types'

interface Props {
  isOpen: boolean
  close: () => void
  onCreate: (project: IProject) => void
  projects: IProject[]
}

export const CreateProjectModal = (props: Props) => {
  const { isOpen, close, onCreate } = props

  const getRandomProjectColor = (): IProjectColor => {
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

  const onSubmit = (project: IProject) => {
    onCreate(project)
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
