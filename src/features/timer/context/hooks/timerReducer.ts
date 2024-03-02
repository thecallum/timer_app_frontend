import { getTodaysDate } from '@/helpers/getTodaysDate'
import { TimerState } from '../types'

type TimerAction =
  | { type: 'START'; startedAt?: string }
  | { type: 'STOP'; initialState: TimerState }
  | { type: 'SET_PROJECT'; projectId: number | null }
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'TICK' }

const getElapsedSeconds = (timestamp: Date) => {
  const now = getTodaysDate().toDate()
  const differenceInMilliseconds = now.getTime() - timestamp.getTime()
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)

  return differenceInSeconds
}

export const timerReducer = (
  state: TimerState,
  action: TimerAction,
): TimerState => {
  switch (action.type) {
    case 'START': {
      const initialTime =
        action.startedAt !== undefined
          ? getElapsedSeconds(new Date(action.startedAt))
          : 0

      return {
        ...state,
        isRunning: true,
        startedAt:
          action.startedAt === null
            ? getTodaysDate().toDate()
            : new Date(action.startedAt as string),
        time: initialTime,
      }
    }
    case 'STOP': {
      return { ...action.initialState }
    }
    case 'SET_PROJECT': {
      return { ...state, projectId: action.projectId }
    }
    case 'SET_DESCRIPTION': {
      return { ...state, description: action.description }
    }
    case 'TICK': {
      return { ...state, time: state.time + 1 }
    }
    default: {
      return state
    }
  }
}
