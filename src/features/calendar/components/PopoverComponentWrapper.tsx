import { CSSProperties, Dispatch, SetStateAction } from 'react'

interface Props {
  showPopover: boolean
  children: JSX.Element

  popperStyles: CSSProperties
  popperAttributes?: {
    [key: string]: string
  }

  setRef: Dispatch<SetStateAction<HTMLElement | null>>
}

export const PopoverComponentWrapper = (props: Props) => {
  const { showPopover, children, popperStyles, setRef, popperAttributes } =
    props

  return (
    <>
      {showPopover && (
        <div
          className="absolute z-20"
          ref={setRef}
          style={popperStyles}
          {...popperAttributes}
        >
          {children}
        </div>
      )}
    </>
  )
}
