import { useClickOutContext } from '@/contexts/clickOutContext'
import { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { getPopoverOptions } from './popoverOptions'

export const usePopover = (containerRef: HTMLDivElement | null) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  )
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    getPopoverOptions(containerRef),
  )

  const handleOpen = () => {
    setTimeout(() => setShowPopover(true))
  }

  const handleClose = () => {
    setShowPopover(() => false)
  }

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

  const [showPopover, setShowPopover] = useState(false)
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

  return {
    handleOpen,
    handleClose,

    setReferenceElement,
    setPopperElement,

    showPopover,
    popperStyles: styles.popper,
    popperAttributes: attributes.popper,
  }
}
