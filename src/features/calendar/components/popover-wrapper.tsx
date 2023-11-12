import { useEffect, useState } from "react";
import { usePopper } from "react-popper";

interface Props {
  popoverComponent: JSX.Element;
  children: (props: {
    ref: React.Dispatch<React.SetStateAction<Element>>;
    onClick: () => void;
  }) => JSX.Element;
}

export const PopoverWrapper = (props: Props) => {
  const { popoverComponent, children } = props;

  const [referenceElement, setReferenceElement] = useState<Element>();
  const [popperElement, setPopperElement] = useState<Element>();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [10, -10],
        },
      },
    ],
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showModal, popperElement]);

  const handleClick = (event: MouseEvent) => {
    // ignore, modal closed
    if (!showModal) return;

    if (popperElement && !popperElement.contains(event.target)) {
      // close modal
      console.info("closing modal");
      setShowModal(() => false);
    }
  };

  return (
    <>
      {children({
        ref: setReferenceElement,
        onClick: () => {
          setTimeout(() => {
            setShowModal(true);
          });
        },
      })}

      {showModal && (
        <div
          className="z-50 absolute "
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {popoverComponent}
        </div>
      )}
    </>
  );
};
