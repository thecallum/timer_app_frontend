import { ModalContainer } from '@/modals/components'
import { useEffect, useState } from 'react'
import { CreateProjectForm } from './create-project-form'
import { ProjectColor } from '@/types/projects'
import { Color, ProjectColors } from '@/types/colors'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'

export const CreateProjectModal = () => {
  const { modalIsOpen, closeModal } =
    useCreateProjectModalContext()


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
  }, [modalIsOpen])

  return (
    <div className="z-20">

    <ModalContainer
      isOpen={modalIsOpen}
      close={closeModal}
      contentLabel="Create a project"
      >
      <CreateProjectForm modalColor={modalColor} close={closeModal} />
    </ModalContainer>
      </div>
  )
}
