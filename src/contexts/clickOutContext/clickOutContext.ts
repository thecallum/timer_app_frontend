import { createContext } from 'react'
import { IClickOutContext } from './types'

export const ClickOutContext = createContext<IClickOutContext | undefined>(
  undefined,
)
