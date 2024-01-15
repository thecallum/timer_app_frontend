import { createContext } from 'react'
import { ICalendarEventContext } from './types'

export const CalendarEventContext = createContext<
  ICalendarEventContext | undefined
>(undefined)
