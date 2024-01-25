import { useTimer } from './hooks/useTimer'

export interface ITimerSnapshot {
  startedAt: string
  projectId: number | null
  description: string
}

export interface TimerState {
  isRunning: boolean
  time: number
  startedAt: Date | null
  projectId: number | null
  description: string
}

export type TimerContext = ReturnType<typeof useTimer>
