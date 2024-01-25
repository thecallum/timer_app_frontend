import { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { getPopoverOptions } from './popoverOptions'
import { useClickOutContext } from '@/contexts/clickOutContext'

export const usePopover = (containerRef: HTMLDivElement | null) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    getPopoverOptions(containerRef),
  )

  const [showPopover, setShowPopover] = useState(false)
  const subscriberId = useRef<string | null>(null)

  const { subscribe, unsubscribe } = useClickOutContext()

  const callback = () => {
    handleClose()
  }

  const setupSubscription = () => {
    if (subscriberId.current !== null) return
    if (popperElement === null) return

    subscriberId.current = subscribe(popperElement, callback)
  }

  const closeSubscription = () => {
    if (subscriberId.current === null) return

    unsubscribe(subscriberId.current)
    subscriberId.current = null
  }

  useEffect(() => {
    if (!showPopover || popperElement === null) {
      closeSubscription()
      return
    }

    setupSubscription()

    return () => {
      closeSubscription()
    }
  }, [showPopover, popperElement])

  const handleOpen = () => {
    setTimeout(() => setShowPopover(true))
  }

  const handleClose = () => {
    setShowPopover(() => false)
  }

  const referenceProps = {
    ref: setReferenceElement,
    onClick: handleOpen,
    showPopover,
  }

  const elementProps = {
    ref: setPopperElement,
    styles: styles.popper,
    otherAttributes: attributes.popper,
  }

  return {
    referenceProps,
    elementProps,
    showPopover,
    handleClose,
  }
}
