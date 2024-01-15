import { useContext } from "react";
import { ClickOutContext } from "../clickOutContext";

export const useClickOutContext = () => {
  const context = useContext(ClickOutContext);
  if (context === undefined) {
    throw new Error(
      "useClickOutContext must be used within a ClickOutContextProvider"
    );
  }

  return context;
};
