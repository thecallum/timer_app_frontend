import { useContext } from 'react'
import { ProjectsContext } from '../projectsContext'

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useContext must be used within a ProjectsContextProvider')
  }

  return context
}
