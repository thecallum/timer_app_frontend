import { useClickOutContext } from '@/contexts/clickOutContext'
import { useProjectsContext } from '@/contexts/projectsContext'
import { ProjectApiRequestObject } from '@/requests/types'
import { Color, ProjectColors } from '@/types/colors'
import { ProjectColor, defaultProjectColor } from '@/types/projects'
import { useState } from 'react'

export const useProjectModal = () => {
  const { addProject } = useProjectsContext()
  const { setModalAsOpen } = useClickOutContext()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalColor, setModalColor] =
    useState<ProjectColor>(defaultProjectColor)

  const [requestError, setRequestError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const closeModal = () => {
    setTimeout(() => setModalIsOpen(false))

    setModalAsOpen(false)
  }

  const getRandomProjectColor = (): ProjectColor => {
    const enumValues: Color[] = Object.values(Color).filter(
      (value) => typeof value === 'number',
    ) as Color[]

    const randomIndex = Math.floor(Math.random() * enumValues.length) // Generate a random index
    const randomEnumKey = enumValues[randomIndex] // Get the enum key

    return ProjectColors[randomEnumKey]
  }

  const openModal = () => {
    setModalColor(() => getRandomProjectColor())
    setModalIsOpen(true)
    setModalAsOpen(true)
  }

  const onCreateProject = async (request: ProjectApiRequestObject) => {
    setIsLoading(true)
    setRequestError(null)

    addProject(request)
      .then((status) => {
        if (!status.success) {
          setRequestError(status.errorMessage)
          return
        }

        closeModal()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    modalIsOpen,
    isLoading,
    requestError,
    closeModal,
    openModal,
    onCreateProject,
    modalColor,
  }
}
