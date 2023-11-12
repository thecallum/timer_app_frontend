import { useState, useEffect, createContext, useContext } from "react";

interface IPopoverContext {
  popoverIsOpen: boolean;
  setPopoverAsOpen: () => void;
  setPopoverAsClosed: () => void;
}

const PopoverContext = createContext<IPopoverContext | null>(null);

interface Props {
  children: JSX.Element;
}

export const PopoverContextProvider = (props: Props) => {
  const { children } = props;

  // for tracking if an existing popover is open across multiple components
  const [openPopovers, setOpenPopovers] = useState<number>(0);

  useEffect(() => {
    console.log({ openPopovers})
  }, [openPopovers])

  const setPopoverAsOpen = () => {
    setOpenPopovers(x => x + 1)
  }

  const setPopoverAsClosed = () => {
    setOpenPopovers(x => x - 1)
  }

  const value = {
    popoverIsOpen: openPopovers >= 1,
    setPopoverAsOpen,
    setPopoverAsClosed,
  };

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverContext must be used within a PopoverContextProvider"
    );
  }
  return context;
};
