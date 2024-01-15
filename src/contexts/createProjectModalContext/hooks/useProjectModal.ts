import { useClickOutContext } from '@/contexts/clickOutContext'
import { useProjectsContext } from '@/contexts/projectsContext'
import { IProject } from '@/contexts/projectsContext/types'
import { useEffect, useState } from 'react'

export const useProjectModal = () => {
  const { addProject } = useProjectsContext()
  const { setModalAsOpen } = useClickOutContext()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setModalAsOpen(modalIsOpen)
  }, [modalIsOpen])

  const closeModal = () => {
    setTimeout(() => setModalIsOpen(false))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const onCreateProject = (newProject: IProject) => {
    addProject(newProject)
    closeModal()
  }

  return {
    modalIsOpen,
    closeModal,
    openModal,
    onCreateProject,
  }
}
