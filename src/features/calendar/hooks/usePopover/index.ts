import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { usePopoverOverlayContext } from "@/contexts/popoverOverlayContext";
import { getPopoverOptions } from "./popoverOptions";


export const usePopover = (
  containerRef: HTMLDivElement | null,
  primaryPopover: boolean // closing me closes the overlay
) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    getPopoverOptions(containerRef)
  );

  const { actions } = usePopoverOverlayContext();
  const { hideOverlay, showOverlay, subscribe, unsubscribe } = actions;

  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (showPopover) {
      subscribe(handleCallback);
    } else {
      unsubscribe(handleCallback);
    }

    return () => {
      unsubscribe(handleCallback);
    };
  }, [showPopover]);

  const handleCallback = () => {
    if (primaryPopover) {
      // if not a primary popover
      // dont close overlay
      handleClose();
    }
  };

  const handleOpen = () => {
    showOverlay();

    setTimeout(() => {
      setShowPopover(true);
    });
  };

  const handleClose = () => {
    if (primaryPopover) {
      // close overlat
      hideOverlay();
    }

    setShowPopover(() => false);
  };

  const referenceProps = {
    ref: setReferenceElement,
    onClick: handleOpen,
    showPopover,
  };

  const elementProps = {
    ref: setPopperElement,
    styles: styles.popper,
    otherAttributes: attributes.popper,
  };

  return {
    referenceProps,
    elementProps,
    showPopover,
    handleClose,
  };
};
