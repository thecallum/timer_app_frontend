import { Offsets } from '@popperjs/core'
import { usePopover } from '../hooks/usePopover'

interface Props {
  popoverComponent: (props: { close: () => void }) => JSX.Element
  containerRef: HTMLDivElement | null
  offset?: Offsets | undefined
  children: (props: {
    ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
    onClick: () => void
    showPopover: boolean
    isOpen: boolean
  }) => JSX.Element
}

export const PopoverWrapper = (props: Props) => {
  const { popoverComponent, children, containerRef } = props

  const { showPopover, handleClose, referenceProps, elementProps } =
    usePopover(containerRef)

  return (
    <>
      {children({
        ref: referenceProps.ref,
        onClick: referenceProps.onClick,
        showPopover: referenceProps.showPopover,
        isOpen: showPopover,
      })}

      {showPopover && (
        <div
          className="absolute z-20"
          ref={elementProps.ref}
          style={elementProps.styles}
          {...elementProps.otherAttributes}
        >
          {popoverComponent({
            close: handleClose,
          })}
        </div>
      )}
    </>
  )
}
