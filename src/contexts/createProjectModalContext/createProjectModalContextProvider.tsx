import { CreateProjectModalContext } from './createProjectModalContext'
import { useProjectModal } from './hooks/useProjectModal'

interface Props {
  children: JSX.Element
}

export const CreateProjectModalContextProvider = (props: Props) => {
  const { children } = props

  return (
    <CreateProjectModalContext.Provider value={useProjectModal()}>
      {children}
    </CreateProjectModalContext.Provider>
  )
}
