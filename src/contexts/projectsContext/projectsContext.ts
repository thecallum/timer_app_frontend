import { createContext } from 'react'
import { ProjectsContext as ContextType } from './types'

export const ProjectsContext = createContext<ContextType | undefined>(undefined)
