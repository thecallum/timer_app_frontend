import { createContext } from 'react'
import { CalendarEventContext } from './types'

export const CalendarEventContext = createContext<
  CalendarEventContext | undefined
>(undefined)
