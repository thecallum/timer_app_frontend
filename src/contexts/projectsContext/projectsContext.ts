import { createContext } from 'react'
import { IProjectsContext } from './types'

export const ProjectsContext = createContext<IProjectsContext | undefined>(
  undefined,
)
