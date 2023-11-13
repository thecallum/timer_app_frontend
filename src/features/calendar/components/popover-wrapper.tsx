import { Placement, Offsets, reference } from "@popperjs/core";
import { usePopover } from "../hooks/usePopover";

interface Props {
  popoverComponent: (props: { close: () => void }) => JSX.Element;
  useOverlay?: boolean;
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
    useOverlay = false,
  } = props;

  const { showPopover, handleClose, referenceProps, elementProps } = usePopover(
    placement,
    offset
  );

  return (
    <>
      {children(referenceProps)}

      {showPopover && (
        <>
          {/* overlay */}
          {useOverlay && (
            <div className="bg-gray-50 opacity-30 absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] z-50"></div>
          )}

          <div className="z-50 absolute " {...elementProps}>
            {popoverComponent({
              close: handleClose,
            })}
          </div>
        </>
      )}
    </>
  );
};
