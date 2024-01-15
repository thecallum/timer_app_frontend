import { ClickOutContext } from './clickOutContext'
import { useClickout } from './hooks/useClickout'

interface Props {
  children: JSX.Element
}

export const ClickOutContextProvider = (props: Props) => {
  const { children } = props

  return (
    <ClickOutContext.Provider value={useClickout()}>
      {children}
    </ClickOutContext.Provider>
  )
}
