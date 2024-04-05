import { ModalContainer } from '@/modals/components'
import { CreateProjectForm } from './create-project-form'
import { useCreateProjectModalContext } from '@/contexts/createProjectModalContext'

export const CreateProjectModal = () => {
  const { modalIsOpen, closeModal, modalColor } = useCreateProjectModalContext()

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
