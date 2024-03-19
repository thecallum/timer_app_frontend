import { useEffect, useReducer, useRef } from 'react'
import useLocalStorage from '../../../../components/hooks/useLocalStorage'
import { ITimerSnapshot, TimerState } from '../types'
import { timerReducer } from './timerReducer'
import { getTodaysDate } from '@/helpers/getTodaysDate'

const LOCAL_STORAGE_KEY = 'TIMER_STATE'

const initialState: TimerState = {
  isRunning: false,
  time: 0,
  startedAt: null,
  projectId: null,
  description: '',
}

let didInit = false

export const useTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const {
    getLocalStorageValue,
    updateLocalStorageValue,
    clearLocalStorageValue,
  } = useLocalStorage<ITimerSnapshot>(LOCAL_STORAGE_KEY)

  useEffect(() => {
    if (!didInit) {
      didInit = true

      console.log('init timer')

      const snapshot = getLocalStorageValue()
      if (!snapshot) return

      dispatch({
        type: 'REHYDRATE',
        description: snapshot.description,
        projectId: snapshot.projectId,
        startedAt: snapshot.startedAt,
      })
    }
  }, [getLocalStorageValue])

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => clearInterval(intervalRef.current ?? undefined)
  }, [state.isRunning])

  const startTimer = () => {
    const today = getTodaysDate()

    dispatch({
      type: 'START',
      startedAt: today.toString(),
    })

    updateLocalStorageValue({
      ...state,
      startedAt: today.toISOString(),
    })
  }

  const stopTimer = () => {
    dispatch({
      type: 'STOP',
      initialState,
    })

    clearLocalStorageValue()
  }

  const setProject = (projectId: number | null) => {
    dispatch({
      type: 'SET_PROJECT',
      projectId,
    })

    updateLocalStorageValue({
      ...state,
      startedAt: state.startedAt?.toISOString() ?? '',
      projectId,
    })
  }

  const setDescription = (description: string) => {
    dispatch({
      type: 'SET_DESCRIPTION',
      description,
    })

    updateLocalStorageValue({
      ...state,
      startedAt: state.startedAt?.toISOString() ?? '',
      description,
    })
  }

  return {
    ...state,
    startTimer,
    stopTimer,
    setProject,
    setDescription,
  }
}
