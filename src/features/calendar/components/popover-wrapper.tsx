import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";

interface Props {
  event: CalendarEventType;
  popoverComponent: JSX.Element;
  children: (props: {
    ref: React.Dispatch<React.SetStateAction<Element>>;
    styles: {
      height: string;
      top: string;
      left: string;
    };
    onClick: () => void;
    formatTime: (seconds: number) => string;
  }) => JSX.Element;
}

const ONE_HOUR_IN_SECONDS = 3600;

export const PopoverWrapper = (props: Props) => {
  const { event, popoverComponent, children } = props;
  const { duration, startTime, column } = event;

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

  //   divide by 15

  const durationByFifteen = Math.ceil(duration / 60 / 15);
  const topByFifteen = Math.ceil((startTime + ONE_HOUR_IN_SECONDS) / 60 / 15);

  const elementHeight = durationByFifteen * 16; // 15 minutes is 16px
  const elementTop = topByFifteen * 16;

  const formatTime = (seconds: number) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const eventStyles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
    left: `calc((100%/7)*${column})`,
  };

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
        styles: eventStyles,
        onClick: () => {
          setTimeout(() => {
            setShowModal(true);
          });
        },
        formatTime,
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
