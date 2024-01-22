import { createContext } from 'react'
import { CalendarEventContext as ContextType } from './types'

export const CalendarEventContext = createContext<ContextType | undefined>(
  undefined,
)
