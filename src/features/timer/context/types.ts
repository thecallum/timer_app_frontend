import { Project } from '@/contexts/projectsContext/types'

export interface ITimerSnapshot {
  startedAt: string
  projectId: number | null
  description: string
}

export interface TimerState {
  isRunning: boolean
  time: number
  startedAt: Date | null
  project: Project | null
  description: string
}

export interface ITimerContext {
  isRunning: boolean
  time: number
  startedAt: Date | null
  project: Project | null
  description: string
  startTimer: () => void
  stopTimer: () => void
  setProject: (project: Project | null) => void
  setDescription: (description: string) => void
}
