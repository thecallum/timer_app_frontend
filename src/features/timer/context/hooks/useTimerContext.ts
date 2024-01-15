import { useContext } from 'react'
import { TimerContext } from '../timerContext'

export const useTimerContext = () => {
  const context = useContext(TimerContext)
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider')
  }

  return context
}
