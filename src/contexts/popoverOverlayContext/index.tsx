import { usePubSub } from "@/hooks/usePubSub";
import { createContext, useState, useContext } from "react";

interface IPopoverOverlayContext {
  state: {
    overlayIsVisible: boolean;
  };
  actions: {
    showOverlay: () => void;
    hideOverlay: () => void;
    subscribe: (cb: () => void) => void;
    unsubscribe: (cb: () => void) => void;
  };
}

export const PopoverOverlayContext = createContext<
  IPopoverOverlayContext | undefined
>(undefined);

interface Props {
  children: JSX.Element;
}

export const PopoverOverlayContextProvider = (props: Props) => {
  const { children } = props;

  const { subscribe, unsubscribe, call } = usePubSub();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showOverlay = () => setIsVisible(true);
  const hideOverlay = () => {
    call();

    setIsVisible(false);
  };

  const value: IPopoverOverlayContext = {
    state: {
      overlayIsVisible: isVisible,
    },
    actions: {
      showOverlay,
      hideOverlay,
      subscribe,
      unsubscribe,
    },
  };

  return (
    <PopoverOverlayContext.Provider value={value}>
      {children}
    </PopoverOverlayContext.Provider>
  );
};

export const usePopoverOverlayContext = () => {
  const context = useContext(PopoverOverlayContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverOverlayContext must be used within a PopoverOverlayContextProvider"
    );
  }

  return context;
};
