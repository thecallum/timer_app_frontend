import { Placement, Offsets } from "@popperjs/core";
import { usePopover } from "../hooks/usePopover";

interface Props {
  popoverComponent: (props: { close: () => void }) => JSX.Element;
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
  } = props;

  const { showPopover, handleClose, referenceProps, elementProps } = usePopover(
    placement,
    offset
  );

  return (
    <>
      {children({
        ref: referenceProps.ref,
        onClick: referenceProps.onClick,
        showPopover: referenceProps.showPopover,
      })}

      {showPopover && (
        <>
          {/* overlay */}
          <div
            onClick={handleClose}
            className="bg-transparent fixed inset-0 z-20"
          />

          <div
            className=" absolute z-20"
            ref={elementProps.ref}
            style={elementProps.styles}
            {...elementProps.otherAttributes}
          >
            {popoverComponent({
              close: handleClose,
            })}
          </div>
        </>
      )}
    </>
  );
};
