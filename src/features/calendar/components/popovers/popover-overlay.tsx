import { usePopoverOverlayContext } from "@/contexts/popoverOverlayContext";

export const PopoverOverlay = () => {
  const { actions, state } = usePopoverOverlayContext();
  const { overlayIsVisible } = state;
  const { hideOverlay } = actions;

  if (!overlayIsVisible) return null;

  return (
    <div
      className="w-full h-full z-10 absolute"
      onClick={hideOverlay}
    />
  );
};
