import { createContext } from 'react'
import { TimerContext as TimerContextType } from './types'

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined,
)
