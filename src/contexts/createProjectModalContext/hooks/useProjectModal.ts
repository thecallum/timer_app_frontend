import { useClickOutContext } from '@/contexts/clickOutContext'
import { useProjectsContext } from '@/contexts/projectsContext'
import { ProjectApiRequestObject } from '@/requests/types'
import { useState } from 'react'

export const useProjectModal = () => {
  const { addProject } = useProjectsContext()
  const { setModalAsOpen } = useClickOutContext()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const closeModal = () => {
    setTimeout(() => setModalIsOpen(false))
    setModalAsOpen(false)
  }

  const openModal = () => {
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
  }
}
