import { IProject } from '@/contexts/projectsContext/types'

export interface ITimerSnapshot {
  startedAt: string
  project: IProject | null
  description: string
}

export interface TimerState {
  isRunning: boolean
  time: number
  startedAt: Date | null
  project: IProject | null
  description: string
}

export interface ITimerContext {
  isRunning: boolean
  time: number
  startedAt: Date | null
  project: IProject | null
  description: string
  startTimer: () => void
  stopTimer: () => void
  setProject: (project: IProject | null) => void
  setDescription: (description: string) => void
}
