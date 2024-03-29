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

export const useTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const {
    getLocalStorageValue,
    updateLocalStorageValue,
    clearLocalStorageValue,
  } = useLocalStorage<ITimerSnapshot>(LOCAL_STORAGE_KEY)

  useEffect(() => {
    // Load from local storage on initial load
    const snapshot = getLocalStorageValue()
    if (!snapshot) return

    dispatch({ type: 'SET_DESCRIPTION', description: snapshot.description })
    dispatch({
      type: 'SET_PROJECT',
      projectId: snapshot.projectId,
    })
    dispatch({ type: 'START', startedAt: snapshot.startedAt })
  }, [])

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.isRunning])

  useEffect(() => {
    if (!state.isRunning) {
      clearLocalStorageValue()
      return
    }

    updateLocalStorageValue({
      startedAt: state.startedAt?.toISOString() ?? '',
      description: state.description,
      projectId: state.projectId,
    })
  }, [state])

  const startTimer = () =>
    dispatch({
      type: 'START',
      startedAt: getTodaysDate().toString(),
    })

  const stopTimer = () =>
    dispatch({
      type: 'STOP',
      initialState,
    })

  const setProject = (projectId: number | null) =>
    dispatch({
      type: 'SET_PROJECT',
      projectId,
    })

  const setDescription = (description: string) =>
    dispatch({
      type: 'SET_DESCRIPTION',
      description,
    })

  return {
    ...state,
    startTimer,
    stopTimer,
    setProject,
    setDescription,
  }
}
