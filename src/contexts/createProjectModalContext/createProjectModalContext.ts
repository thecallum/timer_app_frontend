import { createContext } from 'react'
import { CreateProjectModalContext as ContextType } from './types'

export const CreateProjectModalContext = createContext<ContextType | undefined>(
  undefined,
)
