import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { Placement, Offsets } from "@popperjs/core";

export const usePopover = (
  placement?: Placement | undefined,
  offset?: Offsets | undefined
) => {
  const [referenceElement, setReferenceElement] = useState<Element>();
  const [popperElement, setPopperElement] = useState<Element>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
    ],
  });

  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showPopover, popperElement]);

  const handleClick = (event: MouseEvent) => {
    // ignore, modal closed
    if (!showPopover) return;

    if (popperElement && !popperElement.contains(event.target)) {
      // close modal
      console.info("closing modal");
      handleClose();
    }
  };

  const handleOpen = () => {
    setTimeout(() => {
      setShowPopover(true);
    });
  };

  const handleClose = () => {
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
