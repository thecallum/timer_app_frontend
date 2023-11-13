import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { usePopoverContext } from "../context";
import { Placement, Offsets } from "@popperjs/core";

interface Props {
  popoverComponent: (props: { close: () => void }) => JSX.Element;
  requireNoOtherPopovers?: boolean;
  placement?: Placement | undefined;
  offset?: Offsets | undefined;
  children: (props: {
    ref: React.Dispatch<React.SetStateAction<Element>>;
    onClick: () => void;
    showPopover: boolean;
  }) => JSX.Element;
}

export const PopoverWrapper = (props: Props) => {
  const {
    popoverComponent,
    children,
    placement = "top-start",
    offset = [10, -10],
    requireNoOtherPopovers = false,
  } = props;

  // const popoverContext = usePopoverContext();

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
    // if (
    //   requireNoOtherPopovers && popoverContext?.popoverIsOpen) {
    //   console.info(
    //     "This popover cannot be opened when another popover is open"
    //   );

    //   return;
    // }

    setTimeout(() => {
      setShowPopover(true);
      // popoverContext?.setPopoverAsOpen();
    });
  };

  const handleClose = () => {
    setShowPopover(() => false);
    // popoverContext?.setPopoverAsClosed();
  };

  return (
    <>
      {children({
        ref: setReferenceElement,
        onClick: handleOpen,
        showPopover,
      })}

      {showPopover && (
        <>
          {/* overlay */}
          {requireNoOtherPopovers && (
            <div className="bg-gray-50 opacity-30 absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] z-50"></div>
          )}

          <div
            className="z-50 absolute "
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {popoverComponent({
              close: () => {
                handleClose();
              },
            })}
          </div>
        </>
      )}
    </>
  );
};
