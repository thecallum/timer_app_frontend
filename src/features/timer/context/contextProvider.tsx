import { useTimer } from './hooks/useTimer'
import { TimerContext } from './timerContext'

interface Props {
  children: JSX.Element
}

export const TimerContextProvider = (props: Props) => {
  const { children } = props

  return (
    <TimerContext.Provider value={useTimer()}>{children}</TimerContext.Provider>
  )
}
