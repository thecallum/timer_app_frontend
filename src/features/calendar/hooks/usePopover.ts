import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { Placement, Offsets, Options } from "@popperjs/core";

export const usePopover = (
  containerRef: HTMLDivElement | null
  // placement?: Placement | undefined,
  // offset?: Offsets | undefined
) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const options: Options = {
    // placement: "top",
    placement: "right-start",

    // mainAxis: false,
    strategy: "fixed",
    modifiers: [
      // {
      //   name: "keepTogether",
      //   enabled: false,
      // }
      {
        name: "offset",
        options: {
          // offset: [30, -20],
          offset: [20, -60],
        },
      },

      {
        name: "preventOverflow",
        enabled: true,
        options: {
          // mainAxis: true,
          altAxis: true,
          tether: false,
          escapeWithReference: false,
          // boundariesElement: containerRef,
          boundariesElement: "viewport",
          rootBoundary: containerRef,
        },
      },
    ],
  };

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,

    options
  );

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
